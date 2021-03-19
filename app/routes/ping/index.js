const express = require('express')

const router = express.Router()

const pingHandler = require('~/app/controllers/ping')

router.get('/', pingHandler)

module.exports = router
