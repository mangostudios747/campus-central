const middleware = {}

middleware['storeUser'] = require('../middleware/storeUser.js')
middleware['storeUser'] = middleware['storeUser'].default || middleware['storeUser']

export default middleware
