const middleware = {}

middleware['redirectMessages'] = require('../middleware/redirectMessages.js')
middleware['redirectMessages'] = middleware['redirectMessages'].default || middleware['redirectMessages']

middleware['storeUser'] = require('../middleware/storeUser.js')
middleware['storeUser'] = middleware['storeUser'].default || middleware['storeUser']

export default middleware
