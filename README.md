# grunt-jsvalidate

This is a [Grunt](http://gruntjs.com) task to validate JavaScript source.
It uses [Esprima](http://esprima.org) to look for possible syntax
errors.

## Features

Grunt has a built-in task to lint JavaScript source. This validator task
complements the linter by offering the following features:

* It is **extremely fast**. Validating [three.js](https://github.com/mrdoob/three.js)
(800 KB source) takes less than a second on a modern machine.
* It looks only for **syntax errors**, it does not care about coding style
at all.
* It handles **generated files** as the result
of minification or compilation (CoffeeScript, Dart, TypeScript, etc).
* It would try to be **tolerant** and not give up immediately on the first
error, especially for strict mode violations.

Note: The last feature is still a work-in-process, see Esprima
[issue 130](http://code.google.com/p/esprima/issues/detail?id=130).

## How to Use It

First, install the [package](https://npmjs.org/package/grunt-jsvalidate):

    npm install grunt-jsvalidate

Modify your `Gruntfile.js` file to have the following line somewhere:

```javascript
grunt.loadNpmTasks('grunt-jsvalidate');
```

If it has been installed correctly, running `grunt --help` should
include `jsvalidate` in the list of available tasks.

Set the files to be validated, as part of Grunt configuration via the
new `jsvalidate` key. As an example, `initConfig` in your `Gruntfile.js`
might look like the following fragment:

```javascript
grunt.initConfig({
  jsvalidate: {
    options:{
      globals: {},
      esprimaOptions: {},
      verbose: false
    },
    targetName:{
      files:{
        src:['<%=jshint.all%>']
      }
    }
  },
  nodeunit: {
    files: ['test/**/*.js']
  }
}
```

You can specify the files to be validated using the usual file pattern.
In the above examples, it will validate every `*.js` files in the main
directory, the `lib` directory, and the `test` directory.

Whenever you want the validation task to run, just invoke it using:

```shell
grunt jsvalidate
```

It is recommended to include the validation task in your default:

```javascript
grunt.registerTask('default', ['jsvalidate', 'jshint', 'nodeunit', 'concat', 'uglify']);
```

## License

Copyright (C) 2012 [Ariya Hidayat](http://ariya.ofilabs.com/about).

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright
    notice, this list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

