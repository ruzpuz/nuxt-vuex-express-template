/* eslint-disable global-require */
const environment = require('app/common/environment/environment.service').environment;
const logger = require('app/common/log/logger.service.js');
const chokidar = require('chokidar');
const chokidarConf = require('./chokidar.json');

const { Nuxt, Builder } = require('nuxt');
const options = require('./nuxt.config.js');

const nuxt = new Nuxt(options);

const databaseConfiguration = require('configuration/database/database-configuration.service');
const memoryMigrations = require('app/database/memory-migrations/memory-migrations.service');
const knex = require('knex');
const persistence = knex(databaseConfiguration.persistence);
const memory = knex(databaseConfiguration.memory);
const database = {
  persistence,
  memory
};

let Server;

let firstRun = true;
let timer = null;
let server;
let watcher;
let databaseService;

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

async function serverStopped(stoppingError) {
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

  logger.info('Injecting the database connections');
  databaseService = require('app/database/database.service');
  databaseService.inject(database);

  try {
    timer = null;
    await server.initializeServer(nuxt);
    server.startServer();
  } catch(error) {
    logger.error('Server runtime error!');
    logger.log({ level: 'error', message: error });
  }
}
async function updateServer() {

  if(server) {
    server.stopServer(serverStopped);
  } else if(firstRun) {
    firstRun = false;

    logger.info('First time starting');

    logger.info('Setting up memory database');
    for(let i = 0; i < memoryMigrations.migrations.length; i += 1) {
      await memoryMigrations.migrations[i](memory);
    }

    logger.info('Injecting the database connections');

    databaseService = require('app/database/database.service');
    databaseService.inject(database);

    Server = require('app/Server');
    server = new Server();

    try {
      await server.initializeServer(nuxt);
      server.startServer();
    } catch(error) {
      logger.error('Server runtime error!');
      logger.log({ level: 'error', message: error });
    }
  }
}

async function start() {

  if(environment === 'development') {
    watcher = chokidar.watch('app',
      chokidarConf
    ).on('ready', function () {
      watcher.on('all', function () {
        logger.info('Project updated');
        if(timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(updateServer, 100);
      });
    });

    logger.info('Building front end');

    try {
      await new Builder(nuxt).build();
    } catch(error) {
      logger.error('Error building front end');
      logger.log({ level: 'error', message: error });

      process.exit(-1);
    }

    process.on('unhandledRejection', function (reason) {
      logger.error('Server Failed');
      logger.error('Unhandled Rejection at: ', reason.stack || reason);
    });
    updateServer();

  }

}

start();