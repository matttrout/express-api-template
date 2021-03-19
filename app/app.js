const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const xss = require('xss-clean')
const httpStatus = require('http-status')

// Base API path
const API_BASE = '/api/'

// Base Routes
const routes = require('~/app/routes')
// API Error
const AppError = require('~/app/utils/AppError')
// Error handlers
const { errorConverter, errorHandler } = require('~/app/middleware/error')
// Morgan
const morgan = require('~/app/middleware/morgan')

/* Create and configure Express application */
const app = express()
// Set the port
app.set('port', process.env.PORT || 4000)
// Set security HTTP headers
app.use(helmet())
// Parse JSON request body
app.use(express.json())
// Use GZIP compression
app.use(compression())
// Parse URL encoded request body
app.use(express.urlencoded({ extended: false }))
// Sanitize request data
app.use(xss())
// Enable CORS
app.use(cors())
app.options('*', cors())

if (process.env.NODE_ENV !== 'test') {
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)
}

/* Set up router/routes */
app.use(API_BASE, routes)

/* Send back a 404 for any unknown API request */
const fallback = (req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, httpStatus.NOT_FOUND_MESSAGE))
}
app.use(fallback)

/* convert error to AppError, if needed */
app.use(errorConverter)

/* Handle errors */
app.use(errorHandler)

module.exports = app
