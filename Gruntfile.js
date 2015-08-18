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
        clean: {
            dist: [
                'library/dist/css',
                'library/dist/js'
            ],
            emberx: [
                'library/honeyguide/stacks/js/app/build'
            ],
            ember: [
                'library/honeyguide/stacks/js/qApp'
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
                    grunt.task.run(['concurrent:wait_for_it']);
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
        concurrent: {
            boot_it: {
                tasks: ['clean:ember'],
                options: {
                    limit: 5,
                    logConcurrentOutput: true
                }
            },
            wait_for_it: {
                tasks: ['uglify:ember'],
                options: {
                    limit: 5,
                    logConcurrentOutput: true
                }
            },
            squeeze_the_babe: {
                tasks: ['processhtml:ember'],
                options: {
                    limit: 5,
                    logConcurrentOutput: true
                }
            },
            run_forrest_run: {
                tasks: ['exec:run_ember', 'connect:ember'],
                options: {
                    limit: 5,
                    logConcurrentOutput: true
                }
            }
        },
        watch: {
            ember: {
                files: './library/honeyguide/stacks/js/qApp/assets/app.min.js',
                tasks: 'concurrent:squeeze_the_babe',
                options: {
                    spawn: false,
                    debounceDelay: 5000,
                    event: ['added']
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
    grunt.loadNpmTasks('grunt-concurrent');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'less',
        'uglify',
        'grunticon',
        'version'
    ]);

    grunt.registerTask('ember', [
        'clean:ember',
        'bgShell:build_ember', // the remaining tasks will be called trough watch:ember
        'uglify:ember',
        'processhtml:ember'
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
