const httpStatus = require('http-status')
const logger = require('~/app/middleware/logger')
const AppError = require('~/app/utils/AppError')

const errorConverter = (err, req, res, next) => {
    let error = err
    if (!(error instanceof AppError)) {
        const statusCode = error.statusCode ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR
        const message = error.message || httpStatus[statusCode]
        error = new AppError(statusCode, message, false, err.stack)
    }
    next(error)
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err
    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
    }

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    }

    if (process.env.NODE_ENV === 'development') {
        logger.error(err)
    }

    res.status(statusCode).send(response)
}

module.exports = {
    errorConverter,
    errorHandler,
}
