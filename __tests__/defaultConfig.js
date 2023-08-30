const request = require('supertest');
const app = require("../app");
const {StatusCodes} = require("http-status-codes")
describe('this is not a test', () => {
    it('should ', () => {
        expect(true).toBeTruthy();
    });
});
module.exports = {
    request,
    app,
    StatusCodes
}
