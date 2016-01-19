module.exports = function(grunt) {
    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Initialize configuration
    grunt.initConfig({
        concat: {
            options: {
                separator: ';/*N*/'
            },
            dist: {
                // Specifices ordering
                // Core always goes first
                src: ['src/core/inform.js', 'src/core/**/*.js', 'src/cooperate/**/*.js'//,
                    // 'src/test/**/*.js'
                ],
                dest: 'build/inform.js'
            }
        },

        uglify: {
            options: {
                mangle: false,
                banner: '/* inform by @sliceofcode, licensed under MIT license, (c) 2015 sliceofcode | http://github.com/sliceofcode/inform */\n'
            },
            dist: {
                src: 'build/inform.js',
                dest: 'build/inform.min.js'
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', ['concat', 'uglify']);
};
