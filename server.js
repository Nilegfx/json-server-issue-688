const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// json-server uses res.send() to send responses,
// let's  override it here, so instead of sending
// the body as it is, we transfer it to a Buffer
// first, and then send it.
let originalSend = server.response.send;

server.response.send = function (body) {
  originalSend.call(this, new Buffer(body));
};

// your middleware
server.use((req, res, next) => {
  res.header('Content-Type', 'application/vnd.api+json');
  next()
});

//default json-server middlewares
server.use(middlewares);

// json-server's magic ;)
server.use(router);

server.listen(3000, () => {
  console.log('http://localhost:3000');
})
