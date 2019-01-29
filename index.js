/* eslint-disable global-require */
const { environment } = require('app/common/environment/environment.service');
const logger = require('app/common/log/logger.service.js');
const chokidar = require('chokidar');
const chokidarConf = require('./chokidar.json');

const { Nuxt, Builder } = require('nuxt');

const knex = require('knex');

const databaseConfiguration = require('configuration/database/database-configuration.service');
const memoryMigrations = require('app/database/memory-migrations/memory-migrations.service');
const persistence = knex(databaseConfiguration.persistence);
const memory = knex(databaseConfiguration.memory);
const database = {
  persistence,
  memory
};
let Server;

let timer = null;
let server;
let databaseService;

let nuxt;
let nuxtOptions;


function emptyMemory() {
  Object.keys(require.cache).forEach(function (key) {
    if(key.indexOf('node_modules') === -1) {
      const mod = require.cache[key];

      if(mod.parent) {
        for (let i = 0; i < mod.parent.children.length; i++) {
          if (mod.parent.children[i] === mod) {
            mod.parent.children.splice(i, 1);
            break;
          }
        }
      }

      delete require.cache[key];
    }
  });
  require.main.children.forEach(function (child, index) {
    if(child.id.indexOf('slavicoin-ICO/app/Server.js') > -1) {
      require.main.children.splice(index, 1);
    }
  });
}

async function buildFrontEnd() {
  logger.info('Building front end');

  nuxtOptions = require('./app/view/nuxt.config.js');

  nuxt = new Nuxt(nuxtOptions);

  await new Builder(nuxt).build();
}
async function startServer(stoppingError, firstRun, buildNuxt) {
  if(stoppingError) {
    logger.error('Error stopping server. Exiting with error');
    logger.log({ level: 'error', message: stoppingError });

    process.exit(-1);
  }
  logger.info('Server stopped. Restarting');

  Server = null;
  databaseService = null;

  emptyMemory();

  Server = require('app/Server');
  server = new Server();
  if(firstRun) {
    logger.info('First time starting');

    logger.info('Setting up memory database');
    for(let i = 0; i < memoryMigrations.migrations.length; i += 1) {
      await memoryMigrations.migrations[i](memory);
    }
  }

  logger.info('Injecting the database connections');
  databaseService = require('app/database/database.service');
  databaseService.inject(database);

  try {
    timer = null;
    if(buildNuxt) {
      await buildFrontEnd();
    }
    await server.initializeServer(nuxt);
    server.startServer();
  } catch(error) {
    logger.error('Server runtime error!');
    logger.log({ level: 'error', message: error.message });
  }
}
async function stopServer(buildNuxt) {
  if(server) {
    server.stopServer((error) => {
      logger.info('Server stopped. Restarting');
      startServer(error, false, buildNuxt);
    });
  }
}
function restartServer(buildNuxt) {
  logger.info('Project updated');
  if(timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(stopServer, 100, buildNuxt);
}

(function start() {

  if(environment === 'development') {
    chokidar.watch('app', chokidarConf).on('ready', function() { this.on('all', () => restartServer()); });
    chokidar.watch('app/view/nuxt.config.js' ).on('ready', function() { this.on('all', () => restartServer(true) ); });

    process.on('unhandledRejection', function (reason) {
      logger.error('Server Failed');
      logger.error('Unhandled Rejection at: ', reason.stack || reason);
    });

    startServer(false, true, true);
  }

})();