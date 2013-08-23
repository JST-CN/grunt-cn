# 新手上路

Grunt和Grunt的插件都是通过[Node.js](http://nodejs.org/)的包管理器[npm](https://npmjs.org/)来安装和管理的。

*Grunt 0.4.x要求Node.js的版本`>=0.8.0`(也就是0.8.0及以上版本的Node.js才能很好的运行Grunt)。*

> 安装Grunt之前，可以在命令行中运行`node -v`查看你的Node.js版本。

## 安装CLI

**如果你是从Grunt 0.3升级而来的，请查看[Grunt 0.3的说明](http://gruntjs.com/getting-started#grunt-0.3-notes)**。(在这篇文档的底部)

为了方便使用Grunt，你应该在全局范围内安装Grunt的命令行接口(CLI)。要做到这一点，你可能需要使用sudo(OS X，*nix，BSD等平台中)权限或者作为超级管理员(Windows平台)来运行shell命令。

	npm install -g grunt-cli

这条命令将会把`grunt`命令植入到你的系统路径中，这样就允许你从任意目录来运行它(定位到任意目录运行`grunt`命令)。

注意，安装`grunt-cli`并不等于安装了grunt任务运行器！Grunt CLI的工作很简单：在`Gruntfile`所在目录调用运行已经安装好的相应版本的Grunt。这就意味着可以在同一台机器上同时安装多个版本的Grunt。

## CLI如何工作

每次运行`grunt`时，它都会使用node的`require()`系统查找本地已安装好的grunt。正因为如此，你可以从你项目的任意子目录运行`grunt`。

如果找到本地已经安好装的Grunt，CLI就会加载这个本地安装好的Grunt库，然后应用你项目中的`Gruntfile`中的配置(这个文件用于配置项目中使用的任务，Grunt也正是根据这个文件中的配置来处理相应的任务)，并执行你所指定的所有任务。

*想要真正的了解这里发生了什么，[可以阅读源码](https://github。com/gruntjs/grunt-cli/blob/master/bin/grunt)。这份代码很短。*

## 用一个现有的Grunt项目进行工作

假设已经安装好Grunt CLI并且项目也已经使用一个`package.json`和一个`Gruntfile`文件配置好了，那么接下来用Grunt进行工作就非常容易了：

1. 进入到项目的根目录(在命令行面板定位到项目根目录)。
2. 运行`npm install`安装项目相关依赖(插件，Grunt内置任务等依赖)。
3. 使用`grunt`(命令)运行Grunt。

就是这么简单。已经安装的Grunt任务可以通过运行`grunt --help`列出来，但是通常最好还是先查看一下项目的文档。

## 准备一个新的Grunt项目

一个标准的配置过程只需要给项目添加两个文件：`package.json`和`Gruntfile`。

**package.json**：这个文件被用来存储已经作为npm模块发布的项目元数据(也就是依赖模块)。你将在这个文件中列出你的项目所[依赖](https://npmjs.org/doc/json.html#devDependencies)的Grunt(通常我们在这里配置Grunt版本)和Grunt插件(相应版本的插件)。

**Gruntfile**：通常这个文件被命名为`Gruntfile.js`或者`Gruntfile.coffee`，它是用于配置或者定义Grunt任务和加载Grunt插件的。

### package.json

`package.json`与`Gruntfile`相邻，它们都应该归属于项目的根目录中，并且应该与项目的源代码一起被提交。在上述目录(`package.json`所在目录)中运行`npm install`将依据`package.json`文件中所列出的每个依赖来自动安装适当版本的依赖。

这里有一些为项目创建`package.json`文件的方式：

+ 大多数的[grunt-init](http://gruntjs.com/project-scaffolding)模板都会自动创建一个项目特定的`package.json`文件。

+ [npm init](https://npmjs.org/doc/init.html)命令会自动创建一个基本的`package.json`文件。

+ 从下面的例子开始并根据[规范](https://npmjs.org/doc/json.html)来按需扩展。
*****
	{
		"name": "my-project-name", // 项目名称
		"version": "0.1.0", // 项目版本
		"devDependencies": { // 项目依赖
			"grunt": "~0.4.1", // Grunt库
			"grunt-contrib-jshint": "~0.6.0", //以下三个是Grunt内置任务
			"grunt-contrib-nodeunit":s "~0.2.0",
			"grunt-contrib-uglify": "~0.2.2"
		}
	}

> 原文中注释仅作说明，使用时请自行检查编辑。其他地方如有雷同，参考这条提示。

#### 安装Grunt和grunt插件

添加Grunt和Grunt插件到一个现有的`package.json`中最简单的方式就是使用`npm install <module> --save-dev`命令。这不仅会在本地安装`<module>`，它还会使用一个[波浪形字符的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)自动将所安装的`<module>`添加到项目[依赖](https://npmjs.org/doc/json.html#devDependencies)中。

例如使用下面的命令将会安装最新版的Grunt到你的项目中，并自动将它添加到你的项目依赖中：

	npm install grunt --save-dev

上述命令也可以用于Grunt插件和其他的node模块的安装。当完成操作后请确保更新后的`package.json`文件也要与你的项目一起提交。

### Gruntfile

`Gruntfile.js`或者`Gruntfile.coffee`文件都是归属于你项目根目录中的一个有效的JavaScript或者CoffeeScript文件(和`package.json`文件一样都在根目录中)，并且它(Gruntfile)也应该与你的项目源文件一起提交。

一个Gruntfile由下面几部分组成：

+ "wrapper"函数(包装函数)
+ 项目和任务配置
+ 加载Grunt插件和任务
+ 自定义任务

#### 一个Gruntfile示例

在下面的Gruntfile中，项目的元数据会从项目的`package.json`文件中导入到grunt配置中，同时[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务被配置用于压缩一个源文件，同时使用该元数据(导入的元数据)动态的生成一个标语(banner)注释。在命令行运行`grunt`时默认会运行`uglify`任务。

	module.exports = function(grunt){

		// 项目配置
		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),
			uglify: {
				options: {
					banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				build: {
					src: 'src/<%=pkg.name %>.js',
					dest: 'build/<%= pkg.name %>.min.js'
				}               
			}
		});

		// 加载提供"uglify"任务的插件
		grunt.loadNpmTasks('grunt-contrib-uglify');

		// 默认任务
		grunt.registerTask('default', ['uglify']);
	}

现在你已经看到到了一个完整的Gruntfile，下面让我们来看看它的各个组成部分：

#### "wrapper"函数

每个Gruntfile(和Grunt插件)都使用这个基本格式，并且所有你的Grunt代码都必须指定在这个函数里面：

	module.exports = function(grunt) {
		// 在这里处理Grunt相关的事情
	}

#### 项目和任务配置

大多数Grunt任务所依赖的配置数据都被定义在传递给[grunt.initConfig](http://gruntjs.com/grunt#grunt.initconfig)方法的一个对象中。

在这个例子中，`grunt.file.readJSON('package.json')`会把存储在`package.json`中的JSON元数据导入到Grunt配置中。由于`<% %>`模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作(比如我们通常需要通过复制粘贴的方式来在不同的地方引用同一属性, 使用`<% %>`的方式可以简单的理解为将某些特定的数据存储在变量中，然后在其他地方像使用变量一样就可以使用这些数据属性)。

你可以在这个配置对象中(传递给initConfig()方法的对象)存储任意的数据，只要它不与你任务配置所需的属性冲突，否则会被忽略。此外，由于这本身就是JavaScript，你不仅限于使用JSON；你可以在这里使用任意的有效的JS代码。如果有必要，你甚至可以以编程的方式生成配置。

与大多数任务一样，[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个`banner`选项(用于在文件顶部生成一个注释)，紧接着是一个单一的名为`build`的uglify目标，用于将一个js文件压缩为一个目标文件(比如将src目录`jquery-1.9.0.js`压缩为`jquery-1.9.0.min.js`然后存储到dest目录)。

	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%=pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		}
	});

#### 加载grunt插件和任务

许多常用的任务像[concatenation](https://github.com/gruntjs/grunt-contrib-concat)，[minification](http://github.com/gruntjs/grunt-contrib-uglify)和[linting](https://github.com/gruntjs/grunt-contrib-jshint)都被作为[grunt插件](https://github.com/gruntjs)来使用。只要一个插件被作为一个依赖指定在项目的`package.json`文件中，并且已经通过`npm install`安装好，都可以在你的`Gruntfile`文件中使用下面这个简单的命令启用它(所依赖的任务)。

	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');

**注意**: `grunt --help`命令可以列出所有可用的任务。

#### 自定义任务

你可以通过定义一个`default`任务来配置Grunt，让它默认运行一个或者多个任务。在下面的例子中，在命令行中运行`grunt`而不指定特定的任务将自动运行`uglify`任务。这个功能与显示的运行`grunt uglify`或者等价的`grunt default`一样。你可以在任务参数数组中指定任意数量的任务(这些任务可以带参数，也可以不带参数)。

	// 默认任务
	grunt.registerTask('default', ['uglify']);

如果你的项目所需的任务没有对应的Grunt插件提供相应的功能，你可以在`Gruntfile`内定义自定义的任务。例如，下面的Gruntfile就定义了一个完整的自定义的`default`任务，它甚至没有利用任务配置(没有使用grunt.initConfig()方法)：

	module.exports = function(grunt) {
		// 一个非常基础的default任务
		grunt.registerTask('default', 'Log some stuff.', function() {
			grunt.log.write('Logging some stuff...').ok();
		});
	};

自定义的项目特定的任务可以不定义在Gruntfile中；它们可以定义在一个外部`.js`文件中，然后通过[grunt.loadTasks](http://gruntjs.com/grunt#grunt.loadtasks)方法来加载(Grunt 0.4.x中是`grunt.loadNpmTasks`)。

## 扩展阅读

+ [安装Grunt](installing_grunt.html)指南中有关于安装特定版本的，发布的或者开发中版本的Grunt和Grunt-cli的详细信息。

+ [配置任务](configuring_tasks.html)指南中有对于如何在Gruntfile中配置任务，目标，选项和文件的详细解释，还有模板，匹配模式和导入外部数据相关的说明。

+ [创建任务](creating_tasks.html)指南列出了Grunt任务类型之间的不同，还展示了许多实例任务和配置。

+ 对于关于编写自定义任务或者Grunt插件的更多信息，请参考[开发者文档](grunt.html)。

## Grunt 0.3说明

如果你从Grunt 0.3升级而来的，请确保先卸载全局的`grunt`(使用下面的命令)：

	npm uninstall -g grunt

*上面这些说明文档是针对Grunt 0.4.x编写的，但仍然适用于Grunt 0.3.x。只是注意0.3.x版本中的插件名称和任务配置选项可能与上面的"Gruntfile"中所展示的不同*。

*对于0.3.x版本的Grunt, Grunfile名为`grunt.js`。*
