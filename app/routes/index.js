const express = require('express')
const ping = require('~/app/routes/ping')

const router = express.Router()

/* Health Check */
router.get('/', ping)
router.use('/ping', ping)

module.exports = router
