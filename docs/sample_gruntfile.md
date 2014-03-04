# Gruntfile示例

下面我们通过一个用了5个Grunt插件的`gruntfile`示例来讨论一下Gruntfile。

+ [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
+ [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
+ [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
+ [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
+ [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

你可以在这个页面的底部查看完整的`Gruntfile`文件，但是如果你保持从上至下按序阅读， 我们将一步一步的来讨论它。

首先是用于封装你的Grunt配置的`wrapper`函数(包装函数)部分：

	module.exports = function(grunt){
		//在这里配置你的grunt任务
	}
	
在这个函数里面我们以初始化我们的配置(任务配置)对象：

	grunt.initConfig({
	});

接下来我们可以从`package.json`文件中读取我们的项目配置并存储到`pkg`属性中。这就允许我们引用存储在`package.json`文件中的属性值(通过读取`package.json`中配置并存储在一个名为pkg的属性中，这样我们就可以在定义在`grunt.initConfig`中的配置对象中使用快捷方式`pkg`来引用`package.json`文件中的项目配置属性)，正如我们很快就可以看到：

	pkg: grunt.file.readJSON('package.json')
	
到目前为止我们就可以看到如下配置：

	module.exports = function(grunt){
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json')
		});
	}
	
现在我们就可以为我们的每个任务来定义相应的配置(逐个定义我们为项目定义的任务配置)，然后每个任务的配置对象作为Grunt配置对象(即grunt.initConfig({})所接受的配置对象)的属性，并且这个属性名称与任务名相同。因此`concat`任务就是我们的配置对象中的`concat`键(属性)。下面便是我的`concat`任务的配置对象。

	concat: {
		options: {
			//定义一个用于插入合并输出文件之间的字符
			separator: ';'
		},
		dist: {
			//用于连接的文件
			src: ['src/**/*.js'],
			//返回的JS文件位置
			dest: 'dist/<%= pkg.name %>.js'
		}
	}

注意我是如何引用JSON文件(也就是我们在配置对象顶部引入的配置文件)中的`name`属性的。这里我使用`pkg.name`来访问我们刚才引入并存储在`pkg`属性中的`package.json`文件信息，它会被解析为一个JavaScript对象。Grunt自带的有一个简单的模板引擎用于输出配置对象(这里是指`package.json`中的配置对象)属性值，这里我让`concat`任务将所有存在于`src/`目录下以`.js`结尾的文件合并起来，然后存储在`dist`目录中，并以项目名来命名。

接下来，让我们来看看uglify插件配置，它用于压缩我们的JavaScript文件：

	uglify: {
		options: {
			//生成一个banner注释并插入到输出文件的顶部
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
		},
		dist: {
			files: {
				'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
			}
		}
	}

这里我们让`uglify`在`dist/`目录中创建了一个包含压缩结果的JavaScript文件。注意这里我使用了`<%= concat.dist.dest>`，因此uglify会压缩concat任务中生成的文件。

QUnit插件的设置非常简单。你只需要给它提供用于测试运行的文件的位置，注意这里的QUnit是运行在HTML文件上的。

	qunit: {
		files: ['test/**/*.html']
	}
	
JSHint插件的配置也很简单：

	jshint: {
		//定义用于检测的文件
		files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
		//配置JSHint (参考文档:http://www.jshint.com/docs)
		options: {
			//你可以在这里重写jshint的默认配置选项
			globals: {
				jQuery: true,
				console: true,
				module: true
			}
		}
	}

JSHint只需要一个文件数组(也就是你需要检测的文件数组)， 然后是一个`options`对象(这个对象用于重写JSHint提供的默认检测规则)。你可以到[JSHint官方文档](http://www.jshint.com/docs/)站点中查看完整的文档。如果你乐于使用JSHint提供的默认配置，那么在Gruntfile中就不需要重新定义它们了.

最后我们还有一个watch插件:

	watch: {
		files: ['<%= jshint.files %>'],
		tasks: ['jshint', 'qunit']
	}

你可以在命令行使用`grunt watch`来运行这个任务。当它检测到任何你所指定的文件(在这里我使用了JSHint任务中需要检测的相同的文件)发生变化时，它就会按照你所指定的顺序执行指定的任务(在这里我指定了jshint和qunit任务)。

最后, 我们还要加载所需要的Grunt插件。 它们应该已经全部通过npm安装好了。

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
那么最后我们还要建立一些任务，最重要的是`default`任务：

> 最终在这里指定的任务都可以通过在命令行中以grunt.taskName(最后建立/注册的任务名)的方式来运行指定的任务即可，默认的情况我们最好定义一个默认执行的任务(也就是在命令行直接运行`grunt`就会执行的任务)。

	//下面这个在命令行可以通过`grunt test`来运行执行jshint和qunit任务
	grunt.registerTask('test', ['jshint', 'qunit']);
	
	//下面这个可以在命令行中通过'grunt'来运行默认指定的4个任务
	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	
下面便是最终完成的`Gruntfile.js`。
	
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
					//这里是覆盖JSHint默认配置的选项
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
