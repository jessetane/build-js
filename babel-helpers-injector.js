module.exports = babelHelpersInjector

var path = require('path')
var thru = require('through2')

var getPathToHelpersFrom = null
if (process.cwd() === __dirname) {
  // used for testing
  getPathToHelpersFrom = function (file) {
    return path.relative(path.dirname(file), __dirname) + '/babel-helpers.js'
  }
} else {
  getPathToHelpersFrom = function (file) {
    return 'build-js/babel-helpers'
  }
}

function babelHelpersInjector (file) {
  if (/build-js\/babel-helpers\.js$/.test(file)) {
    return thru()
  }
  var pathToBabelHelpers = getPathToHelpersFrom(file)
  var needsHelpers = false
  var buffer = null
  return thru(function (src, enc, next) {
    src = src.toString()
    if (/babelHelpers/.test(src)) {
      needsHelpers = true
    }
    if (buffer) {
      buffer += src
    } else {
      buffer = src
    }
    next()
  }, function (cb) {
    if (needsHelpers) {
      if (/^'use strict';/.test(buffer)) {
        buffer = buffer.slice(0, 13) + '\n\nvar babelHelpers = require(\'' + pathToBabelHelpers + '\');' + buffer.slice(13)
      } else {
        buffer = 'var babelHelpers = require(\'' + pathToBabelHelpers + '\');\n' + buffer
      }
    }
    this.push(buffer)
    cb()
  })
}
