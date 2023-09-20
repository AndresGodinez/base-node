const pino = require('pino-http');

const app = require('./app');
app.use(pino);
const logger = require('pino')();

app.listen(3000, () => {
  console.clear();
  logger.info('hello world');
  console.log('Server running on port 3000');
  console.warn('yeii');

});
