const supertest = require('supertest')
const app = require('~/app/app')

describe('/ping Tests', () => {
    it('Should return a 200 on a GET request to /api/ping', async () => {
        const res = await supertest(app).get(`/api/ping`)
        expect(res.status).toBe(200)
    })
    it('Should return a 200 on a GET request to API base', async () => {
        const res = await supertest(app).get(`/api/`)
        expect(res.status).toBe(200)
    })
})
