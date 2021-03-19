require('module-alias/register')
const server = require('~/app/server')
const logger = require('~/app/middleware/logger')

/* Gracefully handle exit */
const handleExit = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed')
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
}

/* Gracefully handle unexpected errors */
const unexpectedErrorHandler = (error) => {
    logger.error(error)
    handleExit()
}

/* Handle uncaught exceptions and unhandled rejections gracefully by logging */
process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

/* On the terminal signal, log and then kill the server */
process.on('SIGTERM', () => {
    logger.info('SIGTERM received')
    if (server) {
        server.close()
    }
})
