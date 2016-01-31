module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Initialize configuration
    grunt.initConfig({
        eslint: {
          options: {
            rules: {
              indent: [2, 2]
            }
          },
          target: [
            'src/core/inform.js',
            'src/core/**/*.js',
            'src/cooperate/**/*.js'
          ]
        },
        concat: {
          production: {
            options: {
              separator: ';'
            },
            src: [
              'src/core/inform.js',
              'src/core/**/*.js',
              'src/cooperate/**/*.js'
            ],
            dest: 'build/inform.js'
          },
          development: {
            options: {
              separator: ';'
            },
            src: [
              'src/core/inform.js',
              'src/core/**/*.js',
              'src/cooperate/**/*.js',
              'src/test/**/*.js'
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
    grunt.registerTask('default', ['eslint', 'concat:production', 'uglify:production']);
    grunt.registerTask('develop', ['eslint', 'concat:development',
      'uglify:development']);
};
