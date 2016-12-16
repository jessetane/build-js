#!/usr/bin/env node

module.exports = Builder

var fs = require('fs')
var browserify = require('browserify')
var watchify = require('watchify')

var SRC = process.env.JS_SRC || 'index.js'
var DEST = process.env.JS_DEST || 'public/build.js'
var EXTENSIONS = (process.env.JS_EXTENSIONS || 'html').split(',')

try {
  var pkg = require(process.cwd() + '/package.json')
  var pkgTransforms = pkg.browserify.transform
  var babelifyOpts = pkgTransforms
    .filter(t => t[0] === 'babelify')[0][1]
} catch (err) {
  babelifyOpts = {}
}

function Builder (opts) {
  opts = opts || {}
  this.src = opts.src || SRC
  this.dest = opts.dest || DEST
  this.extensions = opts.extensions || EXTENSIONS
  this.b = browserify({
    entries: [ this.src ],
    cache: {},
    packageCache: {}
  })
  this.b.transform('babelify', {
    presets: [
      'babel-preset-es2015',
      'babel-preset-stage-2'
    ].concat(
      babelifyOpts.presets || []
    ),
    plugins: [
      'babel-plugin-transform-strict-mode',
      'babel-plugin-transform-object-assign',
      require('./babel-transform-runtime')
    ].concat(
      babelifyOpts.plugins || []
    )
  })
  this.b.transform('txtify2', { extensions: this.extensions })
  this.b.transform('brfs')
  this.b.transform('envify')
  this.b.transform('browserify-versionify')
}

Builder.prototype.build = function (cb) {
  var file = fs.createWriteStream(this.dest)
  file.on('finish', cbwrap)
  file.on('error', cbwrap)

  var b = this.b.bundle()
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
  this.watcher = this.build.bind(this, cb)
  this.b.on('update', this.watcher)
  this.b.plugin(watchify)
  this.build(cb)
}

Builder.prototype.unwatch = function () {
  this.b.removeListener('udpate', this.watcher)
  this.b.close()
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
