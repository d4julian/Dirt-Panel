var bodyParser = require('body-parser');
var fs = require('fs');

require('dotenv').config();

var express = require('express')();
var port = process.env.PORT || 5000;

if(process.env.ENVIRONMENT) {
  var privateKey = fs.readFileSync('./privkey.pem', 'utf8');
  var certificate = fs.readFileSync('./fullchain.pem', 'utf8')

  var credentials = {
    key: privateKey,
    cert: certificate
  };

  var server = require('https').createServer(credentials, express);
} else var server = require('http').createServer(express);

/* Redirect http traffic to https */
require('http').createServer((request, response) => {
  response.writeHead(301, `https://${requst.headers.host}${request.url}`)
  response.end();
});

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  }
}

express.use(require('helmet')());
express.use(require('cors')());

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));

server.listen(port, () => console.log(`Listening on port ${port}`));

express.use('/', require('./routes/index'));
express.use('/auth', require('./routes/auth'));
express.use('/nodes', require('./routes/nodes'));
express.use('/servers', require('./routes/servers'));
express.use('/users', require('./routes/users'));
express.use('/ftpBlacklist', require('./routes/ftpBlacklist'));
//express.use('/sanctions', require('./routes/sanctions'));

require('./socket/socket').websocketServer(server);

module.exports = express;
