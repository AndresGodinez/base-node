const request = require('supertest');
const app = require("../app");
const {StatusCodes} = require("http-status-codes")
const sequelize = require("../Configs/Connection/MariaDB")
describe('this is not a test', () => {
    it('should ', () => {
        expect(true).toBeTruthy();
    });
});
module.exports = {
    request,
    app,
    StatusCodes,
    sequelize
}
