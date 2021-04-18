const oauth = require('./oauth')
const { userDatadb } = require('../database');
const sgyDomain = 'https://pausd.schoology.com';
const apiBase = 'https://api.schoology.com/v1';
const usersCache = {};
const updatesCache = {};

function getNextDayOfWeek(date, dayOfWeek = 5) {
  // Code to check that date and dayOfWeek are valid left as an exercise ;)

  const resultDate = new Date(date.getTime())

  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)

  return resultDate
}

function getMonday(d) {
  d = new Date(d)
  var day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

function dateToString(date) {
  return (([a, b, c]) => ([a, b, c - 1].join('-')))(date.toISOString().split('T')[0].split('-'))
}

function flattenArray(arr) {
  const result = []
  for (let sub of arr) {
    result.push(...sub)
  }
  return result
}

function toJson([data]) {
  return JSON.parse(data)
}

// node-oauth only follows 301 and 302 HTTP statuses, but Schoology redirects
// /users/me with a 303 status >_<
function follow303(err) {
  if (err.statusCode === 303) {
    const [, request] = err.out
    //console.log(request.headers.location)
    return oauth.get(request.headers.location, ...err.args.slice(1))
  } else {
    return Promise.reject(err)
  }
}

/*export async function getFrom(path, creds){
    return await (oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, creds.token, creds.tokenSecret)
        .catch(follow303)
        .then(toJson))
}*/
async function getFrom(path, creds, method = 'get', body = null) {
  if (method === 'get') {
    return await (oauth[method](`${apiBase}${!path.startsWith('/') ? '/' : ''}${path}`, creds.token, creds.tokenSecret)
      .catch(follow303)
      .then(toJson))
      .catch(console.error)
  } else {
    return await (oauth[method](`${apiBase}${!path.startsWith('/') ? '/' : ''}${path}`,
      creds.token, creds.tokenSecret, body, 'application/json')
      .then(toJson))
      .catch(console.error)
  }

  //.catch(k=>console.log(k.out[1].headers))
}

export async function getProfile(creds) {
  const value = await getFrom('users/me', creds)
  usersCache[value.uid] = value
  return value
}

export async function getProfileFor(creds, uid) {
  if (usersCache[uid]) return usersCache[uid]
  const returnValue = await getFrom('users/' + uid, creds)
  usersCache[uid] = returnValue
  return returnValue
}

export async function fetchSections(user) {
  const apiResult = await getFrom(`/users/${user.profile.uid}/sections`, user.credentials)
  return apiResult.section.sort((section1, section2) => {
    return (+section1.section_title.split(' ')[0] || Infinity) - (+section2.section_title.split(' ')[0] || Infinity)
  }) // an array of sections loll
}

export async function reloadSections(user) {
  // get the sections
  const sections = await fetchSections(user)
  // put them in the database
  userDatadb.set(`${user.profile.uid}.sections`, sections).write()
  return sections
}

export async function getSections(user) {
  // we only need the uid hmm
  let sections = userDatadb.get(`${user.profile.uid}.sections`).value()
  if (!sections) {
    // we hath not loaded the sections! ever!
    sections = await reloadSections(user)
  }
  return sections
}

export async function fetchAssignmentsForSection(sectionId, creds) {
  // get the assignments from a specific course!
  return (await getFrom(`/sections/${sectionId}/assignments`, creds)).assignment
}

export async function reloadAssignmentsForSection(user, sectionId) {
  const asg = await fetchAssignmentsForSection(sectionId, user.credentials)
  // put them in the database

  /*for (let index in asg) {
    userDatadb.set(`${user.profile.uid}.assignments.${sectionId}.${index}`, asg[index]).write();
  }*/

  return asg
}

export async function getAssignmentsForSection(user, sectionId) {
  // we only need the uid hmm
  let data = null//userDatadb.get(`${user.profile.uid}.assignments.${sectionId}`).value();
  if (!data) {
    // we hath not loaded the data! ever!
    data = await reloadAssignmentsForSection(user, sectionId)
  }
  return data
}

export async function getPendingAssignmentsForSection(user, sectionId) {
  // we only need the uid hmm
  let data = await getAssignmentsForSection(user, sectionId)
  return data.filter(assignment => {
    return !!(assignment.available && !assignment.completed)
  })
}

export async function fetchMessagesInbox(user) {
  const messages = (await getFrom('/messages/inbox', user.credentials)).message
  //console.log(messages);
  for (let index in messages) {
    const { author_id } = messages[index]
    console.log(messages[index].id)
    //messages[index]['recipient'] = await getProfileFor(user.credentials, recipient_ids);
    messages[index]['author'] = await getProfileFor(user.credentials, author_id)
  }
  return messages
}

export async function fetchMessagesSent(user, page = 1) {
  const {
    message: messages,
    unreadCount
  } = (await getFrom(`/messages/sent?start=${20 * (page - 1)}&limit=${page * 20}`, user.credentials))
  //console.log(messages);
  for (let index in messages) {
    const { recipient_ids } = messages[index]
    //console.log(messages[index].id)
    const rids = recipient_ids.split(',')
    messages[index]['recipients'] = []
    for (const rid of rids) {
      messages[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return messages
}

export async function fetchInboxMessage(user, messageId) {
  const { message } = await getFrom(`/messages/inbox/${messageId}`, user.credentials)
  for (let index in message) {
    const { recipient_ids, author_id } = message[index]
    message[index]['author'] = await getProfileFor(user.credentials, author_id)
    message[index]['recipients'] = []
    const rids = recipient_ids.split(',')
    for (const rid of rids) {
      message[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return message
}

export async function fetchSentMessage(user, messageId) {
  const { message } = await getFrom(`/messages/sent/${messageId}`, user.credentials)
  for (let index in message) {
    const { recipient_ids, author_id } = message[index]
    message[index]['author'] = await getProfileFor(user.credentials, author_id)
    message[index]['recipients'] = []
    const rids = recipient_ids.split(',')
    for (const rid of rids) {
      message[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return message
}

export async function replyToMessage(user, messageId, datums) {
  // datums should have {recipient_ids, subject, message}
  return await getFrom(`/messages/${messageId}`, user.credentials, 'post',
    JSON.stringify(datums))
  // the client should now reload the messages.
}

export async function newMessage(user, datums) {
  return await getFrom(`/messages`, user.credentials, 'post',
    JSON.stringify(datums))
}

export async function getSectionFolder(user, sectionid, folderid = 0) {
  return await getFrom(`/courses/${sectionid}/folder/${folderid}/`, user.credentials)
    .then(e => e['folder-item'] ? e['folder-item'].map(k => ({
      ...k,
      name: k.title,
      children: k.type === 'folder' ? [] : undefined
    })) : [])
}

export async function getSection(user, sectionid) {
  return await getFrom(`/sections/${sectionid}/`, user.credentials)
}

export async function fetchWeekUserEvents(user) {
  const base = new Date
  const today = dateToString(base)
  const friday = dateToString(getNextDayOfWeek(base))
  return (await getFrom(`/users/${user.profile.uid}/events?start_date=${today}&end_date=${friday}`,
    user.credentials))
    .event
    .map(event => {
      if (!event.has_end) {
        event.end = event.start
      }
      event.color = { event: 'grey', assignment: 'primary', discussion: 'accent' }[event.type]
      console.log(event.type)
      event.timed = !event.all_day
      event.name = event.title
      event.links = undefined
      return event
    })
}

export async function fetchAllSectionEventsForWeek(user) {
  const base = new Date
  const monday = dateToString(getMonday(base))
  const friday = dateToString(getNextDayOfWeek(base))
  // a list of section ids
  const sections = (await getSections(user))
    .map(a => a.id)
    .map(a => `/v1/sections/${a}/events?start_date=${monday}&end_date=${friday}`)
  //console.log(sections)
  return flattenArray((await getFrom(`/multiget`, user.credentials, 'post', JSON.stringify({
    request: sections
  })))
    .response
    .map(a => a.body.event))
    .map(event => {
      if (!event.has_end) {
        event.end = event.start
      }
      event.color = { event: 'grey', assignment: 'primary', discussion: 'yellow', external_tool: 'accent' }[event.type]
      console.log(event.type)
      event.timed = !event.all_day
      event.name = event.title
      event.links = undefined
      return event
    })

}

export async function fetchLinkDetails(user, sectionid, documentid) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.links.link[0])
}

export async function fetchExternalToolDetails(user, sectionid, documentid) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.external_tools.external_tool[0])
}

export async function fetchFileDetails(user, sectionid, documentid) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.files.file[0])
}

export async function getUpdate(user, updateid){
  return await getFrom(`/users/${user.profile.uid}/updates/${updateid}?with_attachments=true`, user.credentials)

}

export async function fetchRecentUpdates(user){
  const updates =  await getFrom(`/recent?limit=200&with_attachments=true`, user.credentials)
    .then(e => e.update)
  for (let update of updates){
    update.author = await getProfileFor(user.credentials, update.uid)
    //Object.assign(update, await getUpdate(user, update.id))
  }
  return updates
}

export async function fetchCourseUpdates(user, courseid){
  const updates =  await getFrom(`/sections/${courseid}/updates?limit=200&with_attachments=true`, user.credentials)
    .then(e => e.update)
  for (let update of updates){
    update.author = await getProfileFor(user.credentials, update.uid)
    //Object.assign(update, await getUpdate(user, update.id))
  }
  return updates
}

