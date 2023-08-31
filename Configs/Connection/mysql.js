const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('xpensive', 'root', 'root', {
    host: 'localhost',
    dialect: 'mariadb',
    port: 3307
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
