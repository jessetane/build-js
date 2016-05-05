var path = require('path')
var HELPER_BLACKLIST = ['interopRequireWildcard', 'interopRequireDefault']
var RUNTIME_MODULE_NAME = process.cwd() === __dirname
  ? path.join(__dirname, '_')
  : 'build-js/_'

module.exports = function () {
  return {
    pre: function (file) {
      file.set('helperGenerator', function (name) {
        if (HELPER_BLACKLIST.indexOf(name) < 0) {
          return file.addImport(RUNTIME_MODULE_NAME + '/' + name, 'default', name)
        }
      })
    }
  }
}
