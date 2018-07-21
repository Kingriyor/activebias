/**
 * Created by Femibams on 21/07/2018
 * objective: building to scale
 */

// Load on dev environment
const dotenv = require('dotenv');

dotenv.config();

const config = require('./config/config');
const indexRoute = require('./routes/index');
const restify = require('restify');
const { plugins } = require('restify');
const corsMiddleware = require('restify-cors-middleware');
// service locator via dependency injection
const servicelocator = require('./config/di');


const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ['*']
});
const server = restify.createServer({
  name: config.appName,
  versions: ['1.0.0']
});
// set request handling and parsing
server.use(plugins.acceptParser(server.acceptable));
server.use(plugins.queryParser());
server.use(plugins.bodyParser());
server.pre(cors.preflight);
server.use(cors.actual);

// setup Routing and Error Event Handling
indexRoute.setup(server, servicelocator);


server.listen(config.server.port, () => console.log('%s listening at %s', server.name, server.url));
module.exports = server;
