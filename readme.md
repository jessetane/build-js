# build-js
Personal flavor of js build script

## Why
Not crazy about the build frameworks

## How
[watchify](https://github.com/substack/watchify) + [babelify](https://github.com/babel/babelify) + [envify](https://github.com/hughsk/envify) + [browserify-versionify](https://github.com/webpro/versionify) + [txtify2](https://github.com/jessetane/txtify2) + [brfs](https://github.com/substack/brfs)

## Example
As a standalone executable:
```bash
$ build-js
```

Watch:
```bash
$ build-js --watch
```

Use env vars to change the default entry point / destination / extensions:
```bash
$ JS_SRC=index.js JS_DEST=public/build.js JS_EXTENSIONS='html,txt' build-js
```

As a JavaScript library:
```javascript
var Builder = require('build-js')

// env vars are respected, but you can override them:
var b = new Builder({
  src: 'index.js',
  dest: 'public/build.js',
  extensions: [ 'html', 'txt' ]
})

b['build' || 'watch'](function (err) {
  if (err) console.error(err.message)
  else console.log('js built successfully')
})
```

## Install
```bash
$ npm install jessetane/build-js#1.0.0
```

## Test
```bash
$ npm run test
```

## License
WTFPL
