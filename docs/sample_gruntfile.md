#Gruntfile范例

下面我们通过一个gruntfile范例使用五个grunt插件

+  [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
+  [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
+  [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
+  [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
+  [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

完整的Gruntfile在页面的底部，但是如果你继续阅读我们可以来一步一步的实现它。

第一部分是'wrapper'函数，这部分将封装你的Grunt配置

	module.exports = function(grunt){
	};
	
在其内部我们可以初始化我们的配置对象

	grunt.initConfig({
	});
	
接下来我们可以从`package.json`文件中读取项目设置并存储到`pkg`属性中。这允许我们去引用`package.json`文件中的属性值，我们很快就可以看到它。

	pkg: grunt.file.eadJSON('package.json');
	
到目前位置这是我们所看到的:

	module.exports = function(grunt){
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json');
		});
	};
	
现在我们可以给每个任务定义配置。每个任务的配置对下个都作为一个属性存在与任务的配置对下个中，并与任务同名。因此"concat"任务在我们的配置对象的"concat"键下。下面是我的'concat'任务的配置对象.I。

	concat: {
		options: {
			// 定义文件之间的连接字符串
			separator: ';'
		},
		dist: {
			//关联文件
			src: ['src/**/*.js'],
			//返回的JS文件位置
			dest: 'dist/<%= pkg.name %>.js'
		}
	}

注意我是如何引用JSON文件中`name`属性的。我们使用`pkg.name`访问我们之前定义的`pkg`属性中载入的`package.json`返回结果，然后解析一个JavaScript对象。Grunt有一个简单的模板引擎用于输出配置对象中的属性值。这里我使用concat任务来连接`src/`中所有存在并以`.js`结尾的文件。

现在我们配置uglify插件，然后压缩我们的JavaScript:

	uglify: {
		options: {
			//输出标题并插入顶部
			banner: '/* <%= pkg.name %> <%= grunt.template.today('dd-mm-yyyy') %> */\n'
		},
		dist: {
			files: {
				'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		}
	}
	
这描述了uglify在`dist/`中创建了一个文件包含压缩的JavaScript文件返回结果。这里我使用了`<%= concat.dist.dest %>`，因此uglify将压缩concat任务生成的文件。

QUnit插件实际上很容易设置。你只需要给它提供测试运行文件位置，这里时在QUnit中运行HTML文件的例子。

	qunit: {
		files: ['test/**/*.html']
	}
JSHint插件的配置也很简单:

	jshint: {
		//定义lint文件
		files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
		//配置JSHint
		options: {
			//这里是你希望覆盖JSHint默认值的选项
			globals: {
				jQuery: true,
				console:true,
				module: true
			}
		}
	}
	
JSHint简单的使用一个文件数组，然后时一个选项对象。这是[JSHint的所有文档](http://www.jshint.com/docs/)。如果你高兴使用JSHint默认配置，那么无需在Gruntfile中重新定义它们。

最后我们还有一个watch插件:

	watch: {
		files: ['<%= jshint.files %>'],
		tasks: ['jshint', 'qunit']
	}

这可以在命令行中使用`grunt watch`运行。当他发现任何指定的文件有改变时(在这里我只是告诉JSHint检测相同的文件)，运行这个任务时它将按指定的顺序出现。

最后我们可以可以加载我们需要的Grunt插件。这些应该已经通过npm安装过勒。

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
最后配置一些任务。最重要的默认任务:

	//这可以在命令行中通过输入'grunt test'运行
	grunt.registerTask('test', ['jshint', 'qunit']);
	
	//默认的任务可以通过'grunt'运行在命令行中
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	
这里是最后完成的`Gruntfile.js`:

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