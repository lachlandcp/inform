module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Initialize configuration
    grunt.initConfig({
        coffeelint: {
          app: ['src/**/*.coffee']
        },
        coffee: {
          production: {
            options: {
              bare: true,
              join: true
            },
            src: [
              'src/core/inform.coffee',
              'src/core/**/*.coffee',
              'src/cooperate/**/*.coffee'
            ],
            dest: 'build/inform.js'
          },
          development: {
            options: {
              separator: ';'
            },
            src: [
              'src/core/inform.coffee',
              'src/core/**/*.coffee',
              'src/cooperate/**/*.coffee',
              'src/test/**/*.coffee'
            ],
            dest: 'build/inform.develop.js'
          }
        },
        uglify: {
          production: {
            options: {
                mangle: false,
                banner: '/* inform by @sliceofcode, licensed under MIT license, (c) 2016 sliceofcode | http://github.com/sliceofcode/inform */\n'
            },
            src: 'build/inform.js',
            dest: 'build/inform.min.js'
          },
          development: {
            options: {
              mangle: true,
              banner: '/* inform (dev) by @sliceofcode, licensed under MIT license, (c) 2016 sliceofcode */\n'
            },
            src: 'build/inform.develop.js',
            dest: 'build/inform.develop.min.js'
          }
        }
    });

    // Register tasks
    grunt.registerTask('default', [
      'coffeelint',
      'coffee:production',
      'uglify:production'
    ]);

    grunt.registerTask('develop', [
      'coffeelint',
      'coffee:development',
      'uglify:development'
    ]);
};
