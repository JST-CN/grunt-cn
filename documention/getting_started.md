#Getting Started

Grunt和Grunt插件是通过Node.js的管理包npm安装和管理额。

这个说明是基于Grunt 0.4.x编写的，但是仍然能通过Grunt 0.3.x验证。注意在0.3.x中，在"The Gruntfile"一节中插件名称和任务配置选项可能是可能不同的。

Grunt 0.4.x包含了`0.8。0`及以上版本的Node.js。

##CLI安装

如果你已经在之前安装了全局的Grunt，首先你可能需要移除它：

	npm uninstall -g grunt
	
为了重新开始，你可能希望安装全局的Grunt命令接口(CLI)。你可能需要使用sudo(在OSX, *nix, BSD系统中)或者作为一个超级管理员运行你的shell命名去做这些。

	npm install -g grunt-cli
	
这将把`grunt`命令设置在你的系统的路径，允许你在任何路径中运行它。注意这是安装`grunt-cli`而不是安装grunt任务执行器。grunt CLI的工作是很简单的：运行这个版本的grunt接下来会安装一个`Gruntfile`。着允许多个版本的grunt在同一台机器上被安装。

##CLI是如何工作的

每一次运行`grunt`时，它看起来就是使用node的`require()`系统安装一个局部的grunt。因此，你可以从你项目中的每一个子目录中运行`grunt`。

如果一个局部的Grunt被发现，CLI就会加载一个局部的grunt库装置，从你的`Gruntfile`中调用配置，在运行时执行你所有的请求任务。

要了解具体发生了什么，阅读这个代码。它非常短。

##使用一个现有的grunt项目工作

假设已经安装了Grunt CLI并且项目已经提前使用一个`package.json`和`Gruntfile`配置过，它使用Grunt进行工作是非常简单的：

1. 找到项目的根目录
2. 使用`npm install`安装项目依赖
3. 使用`grunt`运行Grunt

事实上所有的这些。安装的Grunt任务可以通过运行`grunt --help`列出来，而且对于一个项目的开始文档它是一个好的想法。

##准备一个新的grunt项目

一个基本的安装会包含两个文件添加到你的项目中：`package.json`和`Gruntfile`。

**package.json**：这个文件用来通过npm存储已经发布的项目的元素据作为一个npm模块。这个文件中将列出你项目所依赖的grunt和grunt插件清单。

**Gruntfile**：这个文件名为`Gruntfile.js`或者`Gruntfile.coffee`, 它被用来配置或者定义任务和加载Grunt插件。

在Grunt0.3.x版本中这个文件名为`grunt.js`。

###package.json

`package.json`文件应该被放在你的项目的根目录中，接着时`Gruntfile`, 并且应该和你的项目资源一起被提交。在同样的目录中运行`npm install`时`package.json`文件将安装每个列出条目的修正版本。

这里有几个方式在你的项目中创建一个`package.json`文件：

+  大多数的grunt  初始化都会自动创建一个规范的`package.json`文件。
+  npm初始命令也将创建一个基础的`package.json`文件。
+  开始下面的例子，并作为需求展开，详细信息请查看规范说明。

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

简单的方式添加Grunt和grunt插件给一个现存的`package.json`就是运行`npm install <module> --save-dev`命令。这不仅仅是安装局部的`<module>`，它会自动添加到依赖的部分，使用一个连续的版本。

例如，这将安装最新版的Grunt到你的项目目录，把它添加到你的依赖中。

	npm install grunt --save-dev
	
这同样可以用于grunt插件和其他的node模块。在你做完这些只有你应该在你的项目把更新过的`package.json`文件一起提交。

###Gruntfile

`Gruntfile.js`或者`Gruntfile.coffee`文件是放在你项目根目录的一个验证过的JavaScript或者CoffeeScript文件，接着就是`package.json`文件，并且应该和你的项目资源一起提交。这个文件在Grunt 0.3.x中名为`grunt.js`。

一个Gruntfile由下面的部分组成：

+  "wrapper"函数
+  项目和任务配置
+  加载grunt插件和任务
+  制定任务

####一个Gruntfile实例

在下面的Gruntfile中，项目元数据从项目的`package.json`被引入到grunt配置中，grunt-contrib-uglify插件的`uglify`任务被配置用于压缩源文件，并且使用该元数据生成一个横幅的注释。当在命令行中运行Grunt时，`uglify`任务将被默认运行。

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

所有的Gruntfile(grunt插件)都使用这种基本形式，并且你所有的Grunt代码都在这个函数内指定：

	module.exports = function(grunt){
		//这里做grunt相关的事情
	};
	
####项目和任务配置

大多数的Grunt任务配置数据都被定义为一个对象传递给grunt.initConfig方法。

在这个例子中，`grunt.file.readJSON('package.json')`引入JSON元数据存储`package.json`到grunt配置中。因为`<% %>`模板字符串将引用所有的配置属性，配置数据像文件路径，文件列表可以通过这种方式指定去减少重复。

你可能存储任意的数据到配置对象中，只要它不和你的任务需求属性不冲突，否则它将被忽略。另外，由于这是JavaScript，你并不被JSON限制；你可以在这里使用认可通过验证的JS。如果有必要你可以使用同等的方案生成配置。

与大多数任务类似，grunt-contrib-uglify插件的`uglify`任务希望它的配置文件中给属性指定相同的名称。这里`banner`项被指定了，接下来一个名为`build`的单独的uglify目标压缩一个单独的源文件到一个单独的目标文件。

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

很多常见的使用过的类似concatenation, minification和linting任务都是作为grunt插件使用的。在下面的例子中，在命令行运行`grunt`而不是一个指定的任务将运行`uglify`任务。这个功能与运行`grunt uglify`或者是等价的`grunt default`时相同的。多个任务(带参数或者不带)可以在数组中分配。

	//默认任务
	grunt.registerTask('default',['uglify']);
	
如果你的项目并没有使用Grunt插件提供一个需求任务，你可以在`Gruntfile`中指定一个任务。例如，这个Gruntfile定义了一个完整的指定的`default`任务而不同于利用任务配置：

	module.exports = function(grunt){
	
		//一个基础的任务
		grunt.registerTask('default','Log some stuff.', function(){
			grunt.log.write('Logging some stuff…').oo();
		});
		
	}
	
自定义的项目具体任务不需要定义在Gruntfile中，它们可以在外部的`.js`文件中定义，然后通过gruntgrunt.loadTask方法加载。

###扩展阅读

+  Installing grunt指南中有关于详细安装的详细说明信息，包括Grunt和grunt-cli的生产或者开发，版本。
+  Configuring Tasks指南中有一个深入的说明如何配置任务，目标，选项，在Gruntfile文件中也有关于模板, 一些模式和引入外部数据的说明。
+  Creating Tasks指南中列出了Grunt任务类型和一些简单的任务和配置之间的不同
+  更多的关于边学自定义任务或者插件的信息，在developer documention中有详细信息。