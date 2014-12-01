'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        nodeunit : {
            all : ['tests/*.js']
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'app.js',
                'tests/**/*.js',
                'lib/**/*.js'
            ],
            options: {
                node: true,
                camelcase: true,
                curly: true,
                eqeqeq: true,
                bitwise: true,
                forin: true,
                immed: true,
                indent: 4,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                nonew: true,
                plusplus: false,
                quotmark: 'single',
                undef: true,
                unused: true,
                strict: true,
                trailing: true,
                // maxparams: 3,
                maxdepth: 3
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', [
        'jshint',
        'nodeunit'
    ]);
};
