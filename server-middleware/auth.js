export default function (req, res, next) {
  // req is the Node.js http request object

  // THIS CODE IS NOT USED

  if (req.user) next();
  else {
    res.writeHead(301, { Location: '/api/sign-in' })
    res.end()
  }
  // res is the Node.js http response object

  // next is a function to call to invoke the next middleware
  // Don't forget to call next at the end if your middleware is not an endpoint!
  //next()
}
