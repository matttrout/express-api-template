const pkg = require('~/package.json')

/**
 * pingHandler
 * Returns a JSON object with some package info, used in health checks
 */
const pingHandler = (req, res) => {
    res.json({
        name: pkg.name,
        description: pkg.description || '',
        version: pkg.version,
        date: new Date().toUTCString(),
    })
}

module.exports = pingHandler
