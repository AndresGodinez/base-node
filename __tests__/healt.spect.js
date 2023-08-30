const {request, app, StatusCodes} = require("./defaultConfig")

describe('Check Health', () => {
    it('should have response ok', async () => {
        const response = await request(app).get('/');
        expect(response.header['content-type']).toBe('application/json; charset=utf-8');
        expect(response.status).toEqual(StatusCodes.OK)
    });
});
