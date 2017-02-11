module.exports = function(grunt) {
	"use strict";
	var log = function (err, stdout, stderr, cb) {
		if(stdout) {
			grunt.log.writeln(stdout);
		}
		if(stderr) {
			grunt.log.error(stderr);
		}
		cb();
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),

		sass: {
			global: {
				options: {
					style: "compressed"
				},
				files: {
					"css/global-unprefixed.css":"scss/global.scss"
				}
			}
		},

		autoprefixer: {
			global: {
				src: "css/global-unprefixed.css",
				dest: "css/global.css"
			}
		},

		shell: {
			jekyllServe: {
				command: "jekyll serve --baseurl="
			},
			jekyllBuild: {
				command: "jekyll build --config _config-dev.yml"
			}
		},

		watch: {

			site: {
				files: ["index.html", "about.html", "_layouts/*.html", "_posts/*.html", "_projects/*.md", "_includes/*.html", "css/**/*.*", "js/**/*.*"],
				tasks: ["shell:jekyllBuild"]
			},
			css: {
				files: ["scss/*.scss"],
				tasks: ["sass","autoprefixer","shell:jekyllBuild"]
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						"_site/**/*.*"
					]
				},
				options: {
					watchTask: true,
					server: "./_site"
				}
			}
		}
	});

	require("load-grunt-tasks")(grunt);
	//grunt.loadNpmTasks("grunt-contrib-watch");
	//grunt.loadNpmTasks("grunt-shell");
	//grunt.loadNpmTasks("grunt-browser-sync");
	grunt.registerTask("build", ["shell:jekyllBuild"]);
	grunt.registerTask("default", ["sass", "autoprefixer", "build", "browserSync", "watch"]);

	
	//grunt.registerTask("serve", ["shell:jekyllServe"]);
	//grunt.registerTask("default", ["sass","autoprefixer", "shell:jekyllBuild", "watch"]);
}