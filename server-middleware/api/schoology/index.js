const oauth = require('./oauth');
const {userDatadb} = require("../database");
const sgyDomain = 'https://pausd.schoology.com';
const apiBase = 'https://api.schoology.com/v1';

// todo: getUserByID(uid) = fetchForUser(uid, 'users/me')

function tobigjson(data){
  let out="[";
  for(var indx=0;indx<data.length-1;indx++){
    out+=JSON.stringify(data[indx],null,4)+",";
  }
  out+=JSON.stringify(data[data.length-1],null,4)+"]";
  return out
}

function toJson ([data]) {
    return JSON.parse(data)
}
// node-oauth only follows 301 and 302 HTTP statuses, but Schoology redirects
// /users/me with a 303 status >_<
function follow303 (err) {
    if (err.statusCode === 303) {
        const [, request] = err.out
        //console.log(request.headers.location)
        return oauth.get(request.headers.location, ...err.args.slice(1))
    } else {
        return Promise.reject(err)
    }
}

async function getFrom(path, creds){
    return await (oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, creds.token, creds.tokenSecret)
        .catch(follow303)
        .then(toJson))
}

async function getProfile(creds){
    return await getFrom('users/me', creds)
}

async function getProfileFor(creds, uid){
  return await getFrom('users/'+uid, creds)
}

async function fetchSections(user){
  const apiResult = await getFrom(`/users/${user.profile.uid}/sections`, user.credentials)
  return apiResult.section.sort((section1, section2) => {
    return (+section1.section_title.split(' ')[0]||Infinity) - (+section2.section_title.split(' ')[0]||Infinity)
  }); // an array of sections loll
}

async function reloadSections(user){
  // get the sections
  const sections = await fetchSections(user);
  // put them in the database
  userDatadb.set(`${user.profile.uid}.sections`, sections).write();
  return sections;
}

async function getSections(user){
  // we only need the uid hmm
  let sections = userDatadb.get(`${user.profile.uid}.sections`).value();
  if (!sections){
    // we hath not loaded the sections! ever!
    sections = await reloadSections(user);
  }
  return sections
}

async function fetchAssignmentsForSection(sectionId, creds) {
  // get the assignments from a specific course!
  return (await getFrom(`/sections/${sectionId}/assignments`, creds)).assignment
}

async function reloadAssignmentsForSection(user, sectionId){
  const asg = await fetchAssignmentsForSection(sectionId, user.credentials);
  // put them in the database

  /*for (let index in asg) {
    userDatadb.set(`${user.profile.uid}.assignments.${sectionId}.${index}`, asg[index]).write();
  }*/

  return asg;
}

async function getAssignmentsForSection(user, sectionId){
  // we only need the uid hmm
  let data = null;//userDatadb.get(`${user.profile.uid}.assignments.${sectionId}`).value();
  if (!data){
    // we hath not loaded the data! ever!
    data = await reloadAssignmentsForSection(user, sectionId);
  }
  return data
}

async function getPendingAssignmentsForSection(user, sectionId){
  // we only need the uid hmm
  let data = await getAssignmentsForSection(user, sectionId);
  return data.filter(assignment => {
    return !!(assignment.available && !assignment.completed)
  })
}

async function fetchMessagesInbox(user){
  const messages = (await getFrom('/messages/inbox', user.credentials)).message;
  //console.log(messages);
  for (let index in messages){
    const {recipient_ids, author_id} = messages[index];
    console.log(messages[index].id)
    messages[index]['recipient'] = await getProfileFor(user.credentials, recipient_ids);
    messages[index]['author'] = await getProfileFor(user.credentials, author_id);
  }
  return messages
}

module.exports = {
  // these should only be get or reload functions
  getFrom,
  getProfile,
  reloadSections,
  getSections,
  reloadAssignmentsForSection,
  getAssignmentsForSection,
  getPendingAssignmentsForSection,
  fetchMessagesInbox,
  getProfileFor


}


