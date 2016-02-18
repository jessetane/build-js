(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var a = require('./modules/a');
console.log(a + 1);

var klass = require('./modules/es6').default;
var instance = new klass();
instance.foo();

},{"./modules/a":3,"./modules/es6":4}],2:[function(require,module,exports){
module.exports = "<div></div>";
},{}],3:[function(require,module,exports){
'use strict';

module.exports = 41;

var template = require('./index.html');

},{"./index.html":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MyClass = function () {
  function MyClass() {
    _classCallCheck(this, MyClass);

    console.log('initialize fresh instance!');
  }

  _createClass(MyClass, [{
    key: 'foo',
    value: function foo() {
      console.log('i am an instance of ' + this.constructor.name);
    }
  }]);

  return MyClass;
}();

exports.default = MyClass;

},{}]},{},[1]);
