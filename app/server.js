const app = require('~/app/app')
const logger = require('~/app/middleware/logger')

const server = app.listen(process.env.PORT || 4000, () => {
    logger.info(`Listening to port ${server.address().port}`)
})

module.exports = server
