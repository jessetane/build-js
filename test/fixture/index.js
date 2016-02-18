var a = require('./modules/a')
console.log(a + 1)

var klass = require('./modules/es6').default
var instance = new klass()
instance.foo()
