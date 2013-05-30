#Gruntfile范例

下面我们通过使用5个grunt插件来讨论一个gruntfile示例:

+ [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)
+ [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)
+ [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)
+ [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)
+ [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)

在页面的底部有一个完整的Gruntfile, 但是如果你继续阅读, 我们将一步步来讨论它.

第一部分是"wrapper"函数, 它用于封装你的Grunt配置.

    module.exports = function(grunt){
        //在这里配置你的grunt任务
    }
    
在这里面我们可以初始化我们的配置对象:

    grunt.initConfig({
    });
    
接下来我们可以在里面使用`pkg`属性从`package.json`文件中读取我们的项目设置. 这允许我们引用我们的`package.json`文件中的属性值, 很快我们可以看到:

    pkg: grunt.file.readJSON('package.json');
    
到目前位置我们可以看到如下信息:

    module.exports = function(grunt){
        grunt.initConfig({
            pkg: grunt.file.readJSON('package.json');
        });
    }
    
现在我们可以给我们的每个任务定义配置. 每个任务的配置对象都作为一个属性存在于整个配置对象中, 它们的命名与任务相同. 因此"concat"任务在我们配置对象的"concat"键下面. 下面是我的"concat"任务的配置对象.I

    concat: {
        options: {
            //定义一个字符串插入没个文件之间用于连接输出
            separator: ';'
        },
        dist: {
            //用于连接的文件
            src: ['src/**/*.js'],
            //返回的js文件位置
            dest: 'dist/<%= pkg.name %>.js'
        }
    }
    
注意我是如何引用JSON文件中的`name`属性的. 我们使用`pkg.name`访问刚才定义在`pkg`属性中加载的`package.json`文件的结果, 它被解析为一个JavaScript对象. Grunt有一个简单的模板引擎用于输出配置对象中的属性值. 在这里我告诉concat任务来连接所有存在于`src/`中以`.js`结尾的文件.

现在, 让我们来配置uglify插件, 用于压缩我们的JavaScript文件:

    uglify: {
        options: {
            //标语插入到输出文件的顶部
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
            files: {
                'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
            }
        }
    }
    
这告诉uglify在`dist/`中创建一个包含压缩JavaScript文件结果的文件. 这里我使用了`<%= concat.dist.dest>`, 因此uglify将会压缩concat任务中生成的文件.

QUnit插件实际上很容易设置. 你只需要给它提供用于测试运行的文件位置, 这里是在QUnit中运行HTML文件的例子:

    qunit: {
        files: ['test/**/*.html']
    }
    
JSHint插件的配置也很简单:

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
    
JSHint只需要一个文件数组, 然后是一个选项配置对象.  这里是[JSHint官方文档](http://www.jshint.com/docs/). 如果你对JSHint的默认配置很满意, 那么在Gruntfile中就不需要重定义它们.

最后我们还有一个watch插件:

    watch: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'qunit']
    }
    
这样你可以在命令行运行`grunt watch`. 当它检测到任何指定的文件有改变时(这里,我只是使用了用于JSHint检查的文件), 它将运行指定的任务, 按照它们出现的顺序.

最后, 我们要加载所需要的Grunt插件. 它们应该已经全部通过npm安装好了.

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    
最终我么需要设置一些任务, 最重要的是默认任务:

    //在命令行可以通过`grunt test`运行
    grunt.registerTask('test', ['jshint', 'qunit']);
    
    //可以在命令行中通过'grunt'来运行默认任务
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
    
下面是最终完成的`Gruntfile.js`.
    
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