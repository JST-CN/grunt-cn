#入门

Grunt和Grunt插件是通过[Node.js](http://nodejs.org/)的管理包[npm](https://npmjs.org/)安装和管理的。

这个说明是针对Grunt 0.4.x编写的，但是仍然能通过Grunt 0.3.x验证。只要注意在0.3.x中，插件名称和任务配置选项可能是可能不同于显示在"Gruntfile"的部分。

Grunt 0.4.X需要`0.8.0`及以上版本的Node.js支持。

##安装CLI

**如果你已经在之前安装了全局的Grunt，你可能需要先移除它:**

	npm uninstall -g grunt
	
为了开始，你可能希望在全局环境中安装Grunt的命令行界面(CLI)。你可能需要使用sudo(在OSX, *nix, BSD系统中)或者作为一个超级管理员运行你的shell命令去做到这一点。

	npm install -g grunt-cli
	
这将把`grunt`命令安装在你的系统的路径，并允许它在任何路径中运行。注意这是安装`grunt-cli`而不是安装grunt任务运行器。grunt CLI的工作是很简单的：运行这个版本的grunt接下来会安装一个`Gruntfile`。它允许在同一台机器上安装多个版本的grunt。

##CLI是如何工作的

每一次运行`grunt`时，它都会使用node的`require()`系统查找安装在本地环境的grunt。郑因为如此，你可以在你项目中的每一个子目录中运行`grunt`。

如果找到一个安装在本地的Grunt，CLI就会加载安装在本地的grunt库，在运行时执行你所有请求的任务，并应用你的`Gruntfile`中的配置。

要了解具体发生了什么，[阅读这个代码](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt)。它非常短。

##使用一个现有的grunt项目工作

假设已经安装了Grunt CLI并且项目已经配置了一个`package.json`和`Gruntfile`，那么很容易使用Grunt进行工作：

1. 更改项目的根目录
2. 使用`npm install`安装项目依赖
3. 使用`grunt`运行Grunt

所有的这些都是事实。安装好的Grunt任务可以通过运行`grunt --help`列出来，而且对于一个项目文档的开始，这通常是一个好的主意。

##准备一个新的grunt项目

一个典型的设置将涉及添加两个文件到你的项目中：`package.json`和`Gruntfile`。

**package.json**：这个文件作为一个npm模块用于通过[npm](https://npmjs.org/)存储发布项目的元数据。你将在这个文件中列出你项目所需要依赖([devDependencies](https://npmjs.org/doc/json.html#devDependencies))的grunt和grunt插件。

**Gruntfile**：这个文件名为`Gruntfile.js`或者`Gruntfile.coffee`, 它被用来配置或者定义任务和加载Grunt插件。

在Grunt0.3.x版本中这个文件名为`grunt.js`。

###package.json

`package.json`文件归属于你的项目的根目录中，紧跟着`Gruntfile`，并且应该和你的项目资源一起被提交。在同样的目录中运行`npm install`时`package.json`文件将安装列表中每个依赖的合适的版本。

这里有几个方式在你的项目中创建一个`package.json`文件：

+  大多数的[grunt-init](http://gruntjs.com/project-scaffolding)模板都会自动创建一个项目特有的`package.json`文件。
+  [npm init](https://npmjs.org/doc/init.html)令也会创建一个基础的`package.json`文件。
+  从下面的例子开始，按需扩展，都遵循这个[规范](https://npmjs.org/doc/json.html)。

		{
			"name": "my-project-name",
			"version": "0.1.0",
			"devDependencies": {
				"grunt": "~0.4.1",
				"grunt-contrib-jshint": "~0.1.1",
				"grunt-contrib-nodeunit": "~0.1.2"
			}
		}
		
###安装Grunt和grunt插件

最简单的方式是运行`npm install <module> --save-dev`命令把Grunt和grunt插件添加到现有的`package.json`中。这不仅只安装本地`<module>`，它会使用[波浪线的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)自动添加[依赖](https://npmjs.org/doc/json.html#devDependencies)的部分。

例如，这将安装最新版的Grunt到你的项目目录，并把它添加到你的依赖中。

	npm install grunt --save-dev
	
这同样可以用于grunt插件和其他的node模块。要确保更新过`package.json`之后与你项目的文件一起提交。

###Gruntfile

`Gruntfile.js`或者`Gruntfile.coffee`文件归属于你项目根目录中的有效JavaScript或者CoffeeScript文件，紧跟着`package.json`文件，并且应该和你的项目资源一起提交。这个文件在Grunt 0.3.x中名为`grunt.js`。

一个Gruntfile由一下几部分组成：

+  "wrapper"函数(包装函数)
+  项目和任务配置
+  grunt插件加载和任务
+  制定任务

####一个Gruntfile例子

在下面的Gruntfile中，项目元数据从项目的`package.json`中被导入到grunt配置中，[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务被配置用于压缩源一个源文件，并且使用该元数据生成一个标语注释。当在命令行中运行grunt时，会默认运行`uglify`任务。

	module.exports = function(grunt){
		
		//项目配置
		grunt.initConfig({
			pkg : grunt.file.readJSON('package.json'),
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build: {
					src: 'src/<%= pkg.name %>.js',
					dest: 'build/<%= pkg.name %>.min.js'
				}
			}
		});
		
		//加载用于提供'uglify'任务的插件
		grunt.loadNpmTasks('grunt-contrib-uglify');
		
		//默认任务
		grunt.registerTask('default', ['uglify']);
	}
	
现在你看到了完整的Gruntfile, 让我们来看看它的组成部分。

####"wrapper"函数

所有的Gruntfile(grunt插件)都使用这种基本格式，并且你所有的Grunt代码都必须指定在这个函数：

	module.exports = function(grunt){
		//这里做grunt相关的事情
	};
	
####项目和任务配置

大多数的Grunt任务依赖于将配置数据定义为一个对象传递给[grunt.initConfig](http://gruntjs.com/api/grunt#grunt.initconfig)方法。

在这个例子中，`grunt.file.readJSON('package.json')`导入存储在`package.json`中的JSON元数据到grunt配置中。因为`<% %>`模板字符串可以引用任何配置属性，配置数据与文件路径，文件列表一样可以指定这种方式去减少重复。

你可以在配置对象中存储任意数据，只要它和你的任务需求属性不冲突，否则它将被忽略。另外，由于这是JavaScript，在这里你并没有被JSON限制；你可以在这里使用任何有效的JS。如果有必要你甚至可以以编程的方式生成配置。(可编程)

与大多数任务类似，[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务的名称与预计配置中指定的属性名称一样。在这里，options中定义了`banner`，接下来就是一个名为`build`的uglify目标用于压缩一个单独的文件为一个单一的目标文件的。

	//项目配置
	grunt.initConfig({
    	pkg: grunt.file.readJSON('package.json'),
    	uglify: {
    		options: {
      			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    		},
    		build: {
      			src: 'src/<%= pkg.name %>.js',
      			dest: 'build/<%= pkg.name %>.min.js'
    		}
    	}
	});
	
####加载grunt插件和任务

很多常见的使用过的任务像[concatenation](https://github.com/gruntjs/grunt-contrib-concat), [minification](https://github.com/gruntjs/grunt-contrib-uglify)和[linting](https://github.com/gruntjs/grunt-contrib-jshint)都是作为[grunt插件](https://github.com/gruntjs)可用的。只要一个插件在`package.json`中被指定为依赖，并已经通过`npm install`安装过，它可以使用一个简单的命令在你的`Gruntfile`中启用。

	//加载插件提供'uglify'任务
	grunt.loadNpmTask('grunt-contrib-uglify');
	
**注意**：`grunt --help`命令将列出所有的可用任务。

####自定义任务

你可以通过定义一个默认任务配置Grunt去默认运行一个或者更多的任务。在下面的例子中，在命令行运行`grunt`而不是一个指定的任务将运行`uglify`任务。这个功能与运行`grunt uglify`或者`grunt default`是相同的。可以在数组中指定任意数量的任务(带或者不带参数)。

	//默认任务
	grunt.registerTask('default',['uglify']);
	
如果你的项目需求任务不是通过一个Grunt插件提供的，你可以在`Gruntfile`中定义指定任务。例如，下面的这个Gruntfile定义了一个完整的自定义`default`任务，不同于利用任务配置：

	module.exports = function(grunt){
	
		//一个基本的默认任务
		grunt.registerTask('default','Log some stuff.', function(){
			grunt.log.write('Logging some stuff…').oo();
		});
		
	}
	
自定义的项目具体任务不需要定义在Gruntfile中，它们可以在外部的`.js`文件中定义，然后通过[gruntgrunt.loadTask](http://gruntjs.com/api/grunt#grunt.loadtasks)方法加载。

###扩展阅读

+  [Installing grunt](http://gruntjs.com/installing-grunt)指南中有关于具体安装，生产或开发，Grunt和grunt-cli版本的详细信息。
+  [Configuring Tasks](http://gruntjs.com/configuring-tasks)指南中深入说明了如何在Gruntfile文件中配置任务，目标，选项，接着解释了模板, 匹配模式和引入外部数据。
+  [Creating Tasks](http://gruntjs.com/creating-tasks/)指南中列出了Grunt任务类型之间的不同，并展示了一些简单的任务和配置。
+  想了解更多的关于自定义任务或者插件的信息，请查看[开发者文档](check out the documentation)。