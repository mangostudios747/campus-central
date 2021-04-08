const oauth = require('./oauth');
const {userDatadb} = require("../database");
const sgyDomain = 'https://pausd.schoology.com';
const apiBase = 'https://api.schoology.com/v1';

// todo: getUserByID(uid) = fetchForUser(uid, 'users/me')

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
    return await oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, creds.token, creds.tokenSecret)
        .catch(follow303)
        .then(toJson)
}

async function getProfile(creds){
    return await getFrom('users/me', creds)
}

async function fetchAssignments(sectionId, creds) {
  // get the assignments from a specific course!
  return await getFrom(`/sections/${sectionId}/assignments`, creds)
}

async function fetchSections(user){
  const apiResult = await getFrom(`/users/${user.profile.uid}/sections`, user.credentials)
  return apiResult.section.sort((section1, section2) => {
    return section1.section_title.split(' ')[0] - section2.section_title.split(' ')[0]
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

module.exports = {
  getFrom,
  getProfile,
  fetchSections,
  getSections

}


