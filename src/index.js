const devdocs = require('./devdocs')

module.exports = () => name => devdocs.search(name)
