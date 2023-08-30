const {request, app, StatusCodes} = require("./defaultConfig")

describe('Check Example Route', () => {
    it('should have response welcome', async () => {
        const response = await request(app).get('/example');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.status).toEqual(StatusCodes.OK)
    });
});
