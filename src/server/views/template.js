// Return template with stylesheet link in production
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./template.prod');
} else {
  module.exports = require('./template.dev');
}