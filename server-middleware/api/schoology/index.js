const oauth = require('./oauth');
const sgyDomain = 'https://pausd.schoology.com'
const apiBase = 'https://api.schoology.com/v1'

// todo: getUserByID(uid) = fetchForUser(uid, 'users/me')
// todo: fetchForUser(uid, path)

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

async function getFrom(path, key, secret){
    return await oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, key, secret)
        .catch(follow303)
        .then(toJson)
}

module.exports.getProfile = async function (token, secret){
    return await getFrom('users/me', token, secret)
}
