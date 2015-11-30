#!/usr/bin/env node

module.exports = Builder

var browserify = require('browserify')
var watchify = require('watchify')
var fs = require('fs')

var SRC = process.env.JS_SRC || 'index.js'
var DEST = process.env.JS_DEST || 'share/build.js'
var EXTENSIONS = (process.env.JS_EXTENSIONS || 'html').split(',')

function Builder (opts) {
  opts = opts || {}
  this.src = opts.src || SRC
  this.dest = opts.dest || DEST
  this.extensions = opts.extensions || EXTENSIONS

  this.b = browserify(this.src)
  this.b.transform(require('txtify2'), { extensions: this.extensions })
  this.b.transform(require('envify'))
  this.b.transform(require('browserify-versionify'))
  this.b.transform(require('brfs'))
}

Builder.prototype.build = function (cb) {
  var file = fs.createWriteStream(this.dest)
  file.on('finish', cbwrap)
  file.on('error', cbwrap)

  var b = this.w ? this.w.bundle() : this.b.bundle()
  b
    .on('error', cbwrap)
    .pipe(file)

  function cbwrap (err) {
    if (err) {
      err.message = 'error building js: ' + (err.annotated ? err.annotated.slice(1) : err.message)
    }
    cb(err)
  }
}

Builder.prototype.watch = function (cb) {
  this.w = watchify(this.b)
  this.w.on('update', this.build.bind(this, cb))
  this.build(cb)
}

Builder.prototype.unwatch = function () {
  this.w.close()
  delete this.w
}

if (!module.parent) {
  var builder = new Builder()

  if (process.argv[2] === '--watch' || process.argv[2] === '-w') {
    builder.watch(function (err) {
      if (err) console.error(err.message)
      else console.log('js built successfully')
    })
  } else {
    builder.build(function (err) {
      if (err) throw err
      else console.log('js built successfully')
    })
  }
}
