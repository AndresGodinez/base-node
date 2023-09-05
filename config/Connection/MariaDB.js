const {Sequelize} = require('sequelize');
const {development} = require('../config');

const sequelize = new Sequelize(development.database, development.username,
    development.password, {
      host: development.host,
      dialect: development.dialect,
      port: development.port,
    });
//
// async function check() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
//
//
// check().then(r => {
//     console.log('hello');
//
// }).catch(e => {
//     console.log({e});
// })

module.exports = sequelize;
