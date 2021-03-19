const supertest = require('supertest')
const app = require('~/app/app')

describe('App Tests', () => {
    it('Should return a 404 on bad route', async () => {
        const res = await supertest(app).get(`/api/bad/route`)
        expect(res.status).toBe(404)
    })
})
