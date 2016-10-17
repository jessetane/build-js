var fs = require('fs')
var path = require('path')
var buildExternalHelpers = require('babel-core/lib/tools/build-external-helpers')

var helpers = buildExternalHelpers(null, 'var')
  .split('\n')
  .slice(1, -1)
  .join('\n')
  .split(/babelHelpers\./g)

var directory = path.join(__dirname, '_')
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory)
}

helpers.forEach(function (helper) {
  if (!helper) return
  var name = helper.match(/(^[^ ]*) = /)[1]
  var body = 'module.exports = ' + helper.split(/^[^ ]* = /)[1]
  fs.writeFileSync(path.join(directory, name + '.js'), body)
})
