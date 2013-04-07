#Sample Gruntfile

下面我们通过一个gruntfile范例使用五个grunt插件

+  grunt-contrib-uglify
+  grunt-contrib-qunit
+  grunt-contrib-concat
+  grunt-contrib-jshint
+  grunt-contrib-watch

在本页的最下面时一个完整的Gruntfile，但是如果你继续阅读我们可以来依次一步一步的实现它。

第一部分是'wrapper'函数，这部分将包裹你的Grunt配置

	module.exports = function(grunt){
	};
	
在其内部我们可以初始化我们的配置对象

	grunt.initConfig({
	});
	
接下来我们可以从`package.json`文件中读取设置到`pkg`属性中。这允许我们去引用`package.json`文件中的属性值，我们来看看它。

	pkg: grunt.file.eadJSON('package.json');
	
到目前位置这是我们所看到的

	module.exports = function(grunt){
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json');
		});
	};
	
现在我们可以定义每个我们的任务配置。在配置对象中任务的配置对象被作为一个属性，与任务同名。因此'concat'任务在配置对象的'concat'键下面。下面时我的'concat'任务的配置对象.I。

	concat: {
		options: {
			// 定义一个字符串连接每个字符串
			separator: ';'
		},
		dist: {
			//文件分割
			src: ['src/**/*.js'],
			//返回的JS文件位置
			dest: 'dist/<%= pkg.name %>.js'
		}
	}

注意在JSON文件中我是如何引用`name`属性的。我们使用`pkg.name`访问我们之前定义的`pkg`属性加载`package.json`中的返回结果，然后解析为一个JavaScript对象。Grunt有一个简单的模板用于输出配置对象中的属性值。这里我使用concat任务来连接`src/`中以`.js`结尾的所有文件。

现在我们配置uglify插件，然后压缩我们的JavaScript:

	uglify: {
		options: {
			banner: '/* <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n'
		},
		dist: {
			files: {
				'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		}
	}
	
这描述了uglify在`dist/`中创建了一个文件包含压缩的JavaScript文件返回结果。这里我使用`<%= concat.dist.dest %>`因此uglify将压缩concat任务产品的文件。

QUnit插件实际上很容易设置。你只需要给它提供测试运行的文件，然后在QUnit中运行HTML文件。

	qunit: {
		files: ['test/**/*.html']
	}
JSHint插件的配置也是很简单的:

	jshint: {
		//定义lint文件
		files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
		//配置JSHint
		options: {
			//这里是更多你希望覆盖JSHint默认配置的选项
			globals: {
				jQuery: true,
				console:true,
				module: true
			}
		}
	}
	
JSHint获取一个数组文件和对象选项很简单。这是JSHint网站上的所有文档。如果你高兴使用JSHint默认配置，那么无需在Gruntfile中重新定义它们。

最后我们有了一个watch插件:

	watch: {
		files: ['<%= jshint.files %>'],
		tasks: ['jshint', 'qunit']
	}

这可以在命令行中使用`grunt watch`运行。当他发现任何指定的文件有改变，它将运行相关任务在指定的规则中。

最后我们可以可以加载我们需要的Grunt插件。然后我们可以使用npm安装这些所有的插件。

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
最后配置一些任务。一些重要的默认任务:

	//这可以在命令行中通过'grunt test'运行
	grunt.registerTask('test', ['jshint', 'qunit']);
	
	//默认的任务可以通过'grunt'运行在命令行中
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	
这里时最后完成的`Gruntfile.js`:

	module.exports = function(grunt){
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			concat: {
				options: {
					separator: ';'
				},
				dist: {
					src: ['src/**/*.js'],
					dest: 'dist/<%= pkg.name %>.js'
				}
			},
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				dist: {
					files: {
						'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
					}
				}
			},
			qunit: {
				files: ['test/**/*.html']
			},
			jshint: {
				files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
				options: {
					// 这里的选项覆盖JSHint的默认配置
					globals: {
						jQuery: true,
						console: true,
						module: true,
						document: true
					}
				}
			},
			watch: {
				files: ['<%= jshint.files %>'],
				tasks: ['jshint', 'qunit']
			}
		});
		
		grunt.loadNpmTasks('grunt-contrib-uglify');
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-qunit');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		
		grunt.registerTask('test', ['jshint', 'qunit']);
		grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	};