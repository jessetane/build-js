var fs = require('fs')
var expected = fs.readFileSync(__dirname + '/expected.js', 'utf8')
var build = fs.readFileSync(__dirname + '/build.js', 'utf8')

if (expected !== build) {
  throw new Error('build does not match expected')
}
