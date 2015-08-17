'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'library/js/scripts.js',
                'bower_components/bootstrap/js/*.js'
            ]
        },
        less: {
            dist: {
                files: {
                    'library/dist/css/styles.css': [
                        'library/less/styles.less'
                    ]
                },
                options: {
                    compress: true,
                    // LESS source map
                    // To enable, set sourceMap to true and update sourceMapRootpath based on your install
                    sourceMap: true,
                    sourceMapFilename: 'library/dist/css/styles.css.map',
                    sourceMapRootpath: '/wp-content/themes/wordpress-bootstrap/' // If you name your theme something different you may need to change this
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'library/dist/js/scripts.min.js': [
                        'library/js/*.js'
                    ]
                    // Consider adding bootstrap js files here to consolidate your browser requests
                },
                options: {
                    // JS source map: to enable, uncomment the lines below and update sourceMappingURL based on your install
                    // sourceMap: 'assets/js/scripts.min.js.map',
                    // sourceMappingURL: '/app/themes/roots/assets/js/scripts.min.js.map'
                }
            },
            emberx: {
                files: {
                    'library/honeyguide/stacks/js/app/build/app.min.js': [
                        'library/honeyguide/stacks/js/app/**/*.js',
                        'library/honeyguide/stacks/js/app/*.js'
                    ]
                },
                options: {
                    mangle: false
                }
            },
            ember: {
                files: {
                    'library/honeyguide/stacks/js/qApp/assets/app.min.js': [
                        'library/honeyguide/stacks/js/qApp/assets/ember-cli-wordpress.js',
                        'library/honeyguide/stacks/js/qApp/assets/vendor.js'
                    ]
                },
                options: {
                    mangle: false
                }
            }
        },
        grunticon: {
            myIcons: {
                files: [{
                    expand: true,
                    cwd: 'library/img',
                    src: ['*.svg', '*.png'],
                    dest: "library/img"
                }],
                options: {}
            }
        },
        version: {
            assets: {
                files: {
                    'functions.php': ['library/dist/css/styles.css', 'library/dist/js/scripts.min.js']
                }
            }
        },
        watch: {
            ember: {
                files: './library/honeyguide/stacks/js/qApp/assets/app.min.js',
                tasks: ['uglify:ember', 'processhtml:ember', 'exec:run_ember', 'connect:ember'],
                options: {
                    spawn: false,
                    event: ['added']
                }
            }
        },
        clean: {
            dist: [
                'library/dist/css',
                'library/dist/js'
            ],
            ember: [
                'library/honeyguide/stacks/js/app/build'
            ]
        },
        exec: {
            build_ember: {
                cwd: 'qApp',
                command: 'ember build --output-path=../library/honeyguide/stacks/js/qApp/'
            },
            run_ember: {
                cwd: 'qApp',
                command: 'ember serve'
            },
        },
        bgShell: {
            build_ember: {
                cmd: 'ember build --output-path=../library/honeyguide/stacks/js/qApp/', // or function(){return 'ls -la'}
                execOpts: {
                    cwd: './qApp'
                },
                stdout: true,
                stderr: true,
                bg: false,
                fail: false,
                done: function(err, stdout, stderr) {
                    grunt.task.run(['uglify:ember', 'watch:ember']);
                }
            }
        },
        connect: {
            ember: {
                options: {
                    hostname: '127.0.0.1',
                    port: 4200,
                    open: {
                        target: 'http://localhost:4200',
                        appName: 'open'
                    }
                }
            }
        },
        processhtml: {
            ember: {
                options: {
                    data: {
                        message: 'Proccessing the index.html to include minimized scripts.'
                    }
                },
                files: {
                    'library/honeyguide/stacks/js/qApp/index.html': ['library/honeyguide/stacks/js/qApp/index.html']
                }
            }
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-wp-assets');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-grunticon');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-bg-shell');


    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'less',
        'uglify',
        'grunticon',
        'version'
    ]);

    grunt.registerTask('ember', [
        'bgShell:build_ember' // the remaining tasks will be called trough watch:ember
    ]);

    grunt.registerTask('emberx', [
        'clean:ember',
        'uglify:ember',
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'less',
        'uglify',
        'grunticon',
        'version'
    ]);
};
