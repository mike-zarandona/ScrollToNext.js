module.exports = function(grunt) {

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);		// npm install load-grunt-tasks --save-dev



	// initConfig()
	grunt.initConfig({

		// make the package information available
		pkg: grunt.file.readJSON('package.json'),


		// javascript
		jshint: {
			options: {
				globals: {
					jQuery: true
				}
			},
			js: {
				src: ['src/*.js']
			}
		},

		uglify: {
			options: {
				// mangle: {
				// 	except: 'jQuery'
				// },
				preserveComments: false,
				compress: true,
				banner: '/*! <%= pkg.name %> | v<%= pkg.version %> | @mikezarandona */\n',
				footer: '\n'
			},
			js: {
				files: {
					'dist/jquery.scrolltonext.min.js': ['src/jquery.scrolltonext.js']
				}
			}
		},


		// development
		connect: {
			server: {
				options: {
					port: 80,
					hostname: '0.0.0.0'
				}
			}
		},

		watch: {
			js: {
				files: ['src/*.js'],
				tasks: ['jshint:js', 'uglify:js'],
				options: {
					livereload: true,
				}
			},
			css: {
				files: ['less/*.less'],
				tasks: ['less:style'],
				options: {
					livereload: true,
				}
			}
		}
	});


	// Tasks
	grunt.registerTask('default', [ 'connect', 'watch' ]);
};
