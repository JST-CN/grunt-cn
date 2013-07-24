module.exports = function(grunt){

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint:{
			webapp: ['app/www/js/main.js'],
			pc: ['js/chart.js','js/common.js','js/demand.js','js/dialog.js','js/formbeautify.js','js/jquery.autopagination.js',
				'js/jquery.cascadeselect.js','js/jquery.datepicker.js','js/jquery.formvalid.js','js/jquery.memberinput.js',
				'js/jquery.multiupload.js','js/jquery.tabs.js','js/pmstation.js','js/project.js','js/setting.js','js/tasktable.js','js/work.js']
		},
		uglify:{
			options:{
				banner:'/*! <%=pkg.name%> <%= grunt.template.today("yyyy-mm-dd")%> */\n'
			},
			webapp:{
				files:{
					'dist/webapp/js/main.min.js':'app/www/js/main.js'
				}
			},
			pc:{					
				files:{
					'dist/pc/js/chart.js':'js/chart.js',
					'dist/pc/js/common.js':'js/common.js',
					'dist/pc/js/demand.js':'js/demand.js',
					'dist/pc/js/dialog.js':'js/dialog.js',
					'dist/pc/js/formbeautify.js':'js/formbeautify.js',
					'dist/pc/js/ie.js':'js/ie.js',
					'dist/pc/js/jquery.autopagination.js':'js/jquery.autopagination.js',
					'dist/pc/js/jquery.cascadeselect.js':'js/jquery.cascadeselect.js',
					'dist/pc/js/jquery.datepicker.js':'js/jquery.datepicker.js',
					'dist/pc/js/jquery.formvalid.js':'js/jquery.formvalid.js',
					'dist/pc/js/jquery.memberinput.js':'js/jquery.memberinput.js',
					'dist/pc/js/jquery.multiupload.js':'js/jquery.multiupload.js',
					'dist/pc/js/jquery.tabs.js':'js/jquery.tabs.js',
					'dist/pc/js/pmstation.js':'js/pmstation.js',
					'dist/pc/js/project.js':'js/project.js',
					'dist/pc/js/setting.js':'js/setting.js',
					'dist/pc/js/tasktable.js':'js/tasktable.js',
					'dist/pc/js/work.js':'js/work.js'
				}
			}

		},
		copy:{
			webapp:{
				files:[
					{src:[/*'main.html','index.html',*/'img/*','app/*','mp3/*','TGJSBridge.bundle/*','144x144.png',
						'js/add2home.js','js/cordova-2.3.0.js','js/iscroll.js','js/jquery-based-1.9.0.min.js', 'js/jquery-audioPlay.js'
					],dest:'dist/webapp/',cwd:'app/www/',expand:true}
				]
			},
			pc:{
				files:[
					{src:['images/*','Lib/Action/**','js/arttemplate-1.4.0.min.js','js/highcharts.js','js/jquery-1.7.1.min.js','js/jquery-1.8.2.min.js','js/jquery-ui-1.8.10.custom.min.js','js/jquery.rte/**','js/jquery.ztree/**','js/moment-1.7.2.min.js'],
					dest:'dist/pc/'}

				]
			},
			pcall:{
				files:[
					{src:['.htaccess','favicon.ico','cron_cron_remind_friend_birthday.php','index.php','Common/**','Conf/**','images/**','Lib/**','media/**','PHPMailer_v5.1/**','ThinkPHP/**','tmpdata/**','Tpl/**','uploadify/**','js/arttemplate-1.4.0.min.js','js/highcharts.js','js/jquery-1.7.1.min.js','js/jquery-1.8.2.min.js','js/jquery-ui-1.8.10.custom.min.js','js/jquery.rte/**','js/jquery.ztree/**','js/moment-1.7.2.min.js'],
					dest:'dist/pc/'}
				]
			}
		},
		cssmin:{
			webapp:{
				files:{
					'dist/webapp/pwmobile.min.css':['app/www/pwmobile.css','app/www/add2home.css']
				}
			},
			pc:{
				files:{
					'dist/pc/css/adddemand.css':'css/adddemand.css',
					'dist/pc/css/meetingsys.css':'css/meetingsys.css',
					'dist/pc/css/adddemandbytapd.css':'css/adddemandbytapd.css',
					'dist/pc/css/memberinput.css':'css/memberinput.css',
					'dist/pc/css/chart.css':'css/chart.css',
					'dist/pc/css/my_managerpro.css':'css/my_managerpro.css',
					'dist/pc/css/common.css':'css/common.css',
					'dist/pc/css/pmstation.css':'css/pmstation.css',
					'dist/pc/css/create_project.css':'css/create_project.css',
					'dist/pc/css/project_details.css':'css/project_details.css',
					'dist/pc/css/demandlist.css':'css/demandlist.css',
					'dist/pc/css/public_view.css':'css/public_view.css',
					'dist/pc/css/extends.css':'css/extends.css',
					'dist/pc/css/pw_woker.css':'css/pw_woker.css',
					'dist/pc/css/global.css':'css/global.css',
					'dist/pc/css/require_track.css':'css/require_track.css',
					'dist/pc/css/jquery-ui-1.8.10.custom.css':'css/jquery-ui-1.8.10.custom.css',
					'dist/pc/css/setting.css':'css/setting.css',
					'dist/pc/css/jquery.autopagination.css':'css/jquery.autopagination.css',
					'dist/pc/css/tasktable.css':'css/tasktable.css',
					'dist/pc/css/jquery.cascadeselect.css':'css/jquery.cascadeselect.css',
					'dist/pc/css/work_friend.css':'css/work_friend.css',
					'dist/pc/css/mail_pre.css':'css/mail_pre.css',
					'dist/pc/css/work_info.css':'css/work_info.css',
					'dist/pc/css/manage.css':'css/manage.css',
					'dist/pc/css/work_manage.css':'css/work_manage.css',
					'dist/pc/css/meeting.css':'css/meeting.css'
				}
			}
		},
		csslint:{

			webapp: {
				options: {
				  // import: 2
				},
				src: ['pwmobile.css']
			},
			pc:{
				options: {

				},
				src: ['css/*.css']
			}

		},
		concat:{
			options:{

			},
			dist:{
				// src:['css/concat_a.css','css/concat_b.css'],
				// dest:'dist/css/concat.css'
			}
		},

		replace: {
		  webapp: {
			src: ['app/www/*.html'],             // source files array (supports minimatch)
			dest: 'dist/webapp/',             // destination directory or file
			replacements: [{ 
			  from: '@@timestamp',                   // string replacement
			  to: +new Date()+'' 
			}]
		  },
		  pc:{
		  	src: [
		  		'dist/pc/Tpl/default/Public/head.html',
		  		'dist/pc/Tpl/default/Chart/head.html',
		  		'dist/pc/Tpl/default/Project/head.html',
		  		'dist/pc/Tpl/default/Projectmanager/head.html',
		  		'dist/pc/Tpl/default/Tapd/head.html',
		  		'dist/pc/Tpl/default/Work/*.html',
		  		'dist/pc/css/*.css'
		  	],
		  	overwrite:true,
		  	replacements: [{ 
			  from: '@@timestamp',
			  to: +new Date()+'' 
			}]

		  }
		},

		htmlhint: {
			options: {
				'tag-pair': true,
				'attr-value-double-quotes': true,
				// 'style-disabled': true,
				'id-class-value': true,
				'doctype-html5': true,
				'img-alt-require': true,
				'id-unique': true,
				'spec-char-escape': true,
				'tag-self-close': true,
				'doctype-first': true,
				'attr-value-not-empty': true,
				'attr-lowercase': true,
				'tagname-lowercase': true

			},
			webapp: {
				src: ['app/www/*.html']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-htmlhint');

	grunt.registerTask('webapp', ['htmlhint:webapp','jshint:webapp','uglify:webapp','cssmin:webapp','copy:webapp','replace:webapp']);
	grunt.registerTask('pc', ['jshint:pc','uglify:pc','cssmin:pc','copy:pc','replace:pc']);
	grunt.registerTask('pcall', ['jshint:pc','uglify:pc','cssmin:pc','copy:pcall','replace:pc']);

};