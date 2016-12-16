var ModuleDeps = require('module-deps')
var relativePath = require('cached-path-relative')
var _isTopLevel = ModuleDeps.prototype._isTopLevel
ModuleDeps.prototype._isTopLevel = function (file) {
  var isTopLevel = _isTopLevel.call(this, file)
  if (isTopLevel) return true
  var relative = relativePath(this.basedir, file)
  var include = this.options.include
  if (include) {
    if (include.find(file => relative.indexOf(file) === 0)) {
      return true
    }
  }
  return false
}
