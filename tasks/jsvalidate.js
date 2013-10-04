/*
  grunt-jsvalidate
  https://github.com/ariya/grunt-jsvalidate

  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>

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
*/

module.exports = function (grunt) {
    'use strict';
    var esprima = require('esprima');
    var params;


    grunt.registerMultiTask('jsvalidate', 'Validate JavaScript source.', function () {
        params = this.options({
            globals: {},
            esprimaOptions: {},
            verbose: true
        });

        this.filesSrc.forEach(function (filepath) {
            grunt.verbose.write('jsvalidate ' + filepath);
            jsvalidate(grunt.file.read(filepath), params.esprimaOptions, params.globals, filepath);
        });

        if (this.errorCount === 0) {
            grunt.log.writeln(this.filesSrc.length + ' files are valid.');
        }

        if (this.errorCount > 0) {
            grunt.log.writeln('Encountered ' + this.errorCount + ' errors.');
        }

        return (this.errorCount === 0);
    });

    var jsvalidate = function (src, options, globals, extraMsg) {
        var syntax;

        if (params.verbose) {
            grunt.log.write('Validating' + (extraMsg ? ' ' + extraMsg : '') + '  ');
        }

        try {

            syntax = esprima.parse(src, {
                tolerant: true
            });
            if (syntax.errors.length === 0) {
                if (params.verbose) {
                    grunt.log.ok();
                }
            } else {

                if (!params.verbose) {
                    grunt.log.write('Validating' + (extraMsg ? ' ' + extraMsg : '') + '  ');
                }

                grunt.log.write('\n');
                syntax.errors.forEach(function (e) {
                    grunt.log.error(e.message);
                });
            }
        } catch (e) {
            if (!params.verbose) {
                grunt.log.write('Validating' + (extraMsg ? ' ' + extraMsg : '') + '  ');
            }
            grunt.log.write('\n');
            grunt.log.error(e.message);
            grunt.fail.errorcount++;
        }
    };
};