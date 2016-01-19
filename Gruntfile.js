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
                    //['src/test/**/*.js']
                ],
                dest: 'build/inform.js'
            }
        }
    });

    // Register tasks
    grunt.registerTask('default', ['concat']);
};
