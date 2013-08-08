# 新手上路

Grunt和Grunt插件都是通过[npm](https://npmjs.org/), [Node.js](http://nodejs.org/)包管理器安装和管理的.

*Grunt 0.4.x要求Node.js版本`>=0.8.0`*.

## 安装CLI

**如果你时从Grunt 0.3升级的, 请查看[Grunt 0.3的说明](http://gruntjs.com/getting-started#grunt-0.3-notes)**.

便于开始, 你可能希望在全局范围内安装Grunt的命令行接口(CLI). 要做到这一点, 你可能需要使用sudo(OS X, *nix, BSD等平台中)或者作为超级管理员(Windows)来运行你的shell命令.

	npm install -g grunt-cli

这将会把`grunt`命令推送到你的系统路径中, 这样就允许你从任意目录来运行它.

注意安装`grunt-cli`并不是安装grunt任务运行器! Grunt CLI的工作很简单: 运行以安装的Grunt版本之后的`Gruntfile`. 并且它允许在同一台机器上同时安装多个版本的grunt.

## CLI如何工作

每一次运行`grunt`时, 它都会使用node的`require()`系统查找一个本地已安装的grunt. 正因为如此, 你可以从你项目的任意目录运行`grunt`.

如果找到一个本地已安装的Grunt, CLI就会加载grunt库的本地装置, 然后应用你的`Gruntfile`的配置, 并执行你要求它运行的任意任务.

*要真正了解这里发生了什么, [可以阅读源码](https://github.com/gruntjs/grunt-cli/blob/master/bin/grunt). 这份代码很短*.

## 用一个现有的Grunt项目进行工作

假设已经安装了Grunt CLI并且项目也已经配置了一个`package.json`和一个`Gruntfile`, 它很容易使用Grunt来开始工作:

1. 进入到项目的根目录.
2. 用`npm install`安装项目依赖.
3. 使用`grunt`(命令)运行Grunt.

这是真的. 已经安装的Grunt任务可以通过运行`grunt --help`列出来, 然而以此作为项目文档的开始通常是一个好主意.

## 准备一个新的Grunt项目

一个标准的设置将设置添加两个文件到项目中: `package.json`和`Gruntfile`.

**package.json**: 这个文件被用于通过[npm](https://npmjs.org/)存储已发布的作为npm模块的项目元素据. 你将在这个文件中列出你的项目所[依赖](https://npmjs.org/doc/json.html#devDependencies)的grunt和Grunt插件.

**Gruntfile**: 这个文件被命名为`Gruntfile.js`或者`Gruntfile.coffee`, 它被用于配置或者定义任务和加载Grunt插件.

### package.json

`package.json`归属于项目的根目录, 紧挨着`Gruntfile`, 并且应该与项目的源代码一起被提交. 在上述目录运行`npm install`将依据`package.json`文件中所列出的每个依赖来安装适当的版本.

这里有一些为你的项目创建一个`package.json`文件的方式:

+ 大多数的[grunt-init](http://gruntjs.com/project-scaffolding)模板都会自动创建一个项目特定的`package.json`文件.
+ [npm init](https://npmjs.org/doc/init.html)命令将创建一个基础的`package.json`文件.
+ 从下面的例子开始并按需扩展, 根据[规范](https://npmjs.org/doc/json.html).

&nbsp;

	{
		"name": "my-project-name", // 项目名称
		"version": "0.1.0", // 项目版本
		"devDependencies": { // 项目依赖
			"grunt": "~0.4.1", // Grunt库
			"grunt-contrib-jshint": "~0.6.0",
			"grunt-contrib-nodeunit":s "~0.2.0",
			"grunt-contrib-uglify": "~0.2.2"
		}
	}

#### 安装Grunt和grunt插件

添加Grunt和grunt插件到一个现有的`package.json`中最容易的方式是使用`npm install <module> --save-dev`命令. 这不仅会在本地安装`<module>`, 它还会自动被添加到[依赖](https://npmjs.org/doc/json.html#devDependencies)部分, 使用一个[波浪形字符的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges).

例如下面的代码将会安装最新版的Grunt到你的项目目录中, 并将它添加到你的依赖中:

	npm install grunt --save-dev

上述命令也可以用于grunt插件和其他的node模块. 当你完成时请确保更新后的`package.json`文件与你的项目一起提交.

### Gruntfile

`Gruntfile.js`或者`Gruntfile.coffee`文件是归属与你项目根目录的一个有效的JavaScript或者CoffeeScript文件, 紧挨着`package.json`文件, 并且也应该与你的项目源文件一起提交.

一个Gruntfile有下面的部分组成:

+ "wrapper"函数
+ 项目和任务配置
+ 加载Grunt插件和任务
+ 自定义任务

#### 一个Gruntfile示例

在下面的Gruntfile中, 项目的元数据从项目的`package.json`文件中被导入到grunt配置中并且[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务被配置用于压缩一个资源文件同时使用该元素据动态的生成一个标语注释. 当在命令行运行grunt时, 将默认运行`uglify`任务.

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

		// 注册默认任务
		grunt.registerTask('default', ['uglify']);
	}

现在你已经了解到了完整的Gruntfile, 下面让我们来看看它的各个组成部分.

#### "wrapper"函数

每个Gruntfile(和grunt插件)都使用这个基本格式, 并且所有你的Grunt代码都必须指定在这个函数里面:

	module.exports = function(grunt) {
		// 在这里处理Grunt相关的事情
	}

#### 项目和任务配置

大多数Grunt任务依赖的配置数据都被定义在传递给[grunt.initConfig](http://gruntjs.com/grunt#grunt.initconfig)方法的一个对象中.

在这个例子中, `grunt.file.readJSON('package.json')`会导入存储在`package.json`中的JSON元数据到Grunt配置中. 由于`<% %>`模板字符串可以引用任意的配置属性, 配置数据如文件路径, 并且可以使用这种方式指定文件列表来减少重复.

你可以在这个配置对象内存储任意的数据, 只要它不与你任务所需的属性冲突, 否则将被忽略. 此外, 由于这就是JavaScript, 你仅限于使用JSON; 你可以在这里使用任意的有效的JS代码. 如果有必要, 你甚至可以以编程的方式生成配置.

就像大多数任务, [grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的`uglify`任务期望它的配置被指定在一个同名属性中. 在这里, 我们指定了一个`banner`选项, 紧接着是一个被命名为`build`的uglify目标用于压缩一个单一的源文件到单一目标文件. 

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

许多常用的任务像[concatenation](https://github.com/gruntjs/grunt-contrib-concat), [minification](http://github.com/gruntjs/grunt-contrib-uglify)和[linting](https://github.com/gruntjs/grunt-contrib-jshint)都是当作[grunt插件](https://github.com/gruntjs)可用的. 只要一个插件作为一个依赖指定在`package.json`中, 并且已经通过`npm install`安装好, 它都可以使用一个简单的命令来在你的`Gruntfile`启用.

	//加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-uglify');

**注意**: `grunt --help`命令将会列出所有可用的任务.

#### 自定义任务

你可以通过顶一个`default`任务来配置Grunt默认运行一个或者多个任务. 在下面的例子中, 在命令行中不指定一个任务运行`grunt`将会运行`uglify`任务. 这个功能与明确运行`grunt uglify`或者等价的`grunt default`一样. 任意数量的任务(带或不带参数)可以指定在一个数组中.

	// 默认任务
	grunt.registerTask('default', ['uglify']);

如果你项目所需的任务没有通过一个Grunt插件提供, 你可以适当在`Gruntfile`内适当的定义自定义任务. 例如, 下面的Gruntfile就定义了一个完整的自定义的`default`任务, 它甚至没有利用任务配置:

	module.exports = function(grunt) {
		// 一个非常基础的default任务
		grunt.registerTask('default', 'Log some stuff.', function() {
			grunt.log.write('Logging some stuff...').ok();
		});
	};

自定义的项目特定的任务可以不定义在Gruntfile中; 它们也可以定义在一个外部`.js`文件中, 然后通过[grunt.loadTasks](http://gruntjs.com/grunt#grunt.loadtasks)方法来加载.

## 扩展阅读

+ [安装Grunt](installing_grunt.html)指南中有关于安装特定的, 发布的或者开发中版本的Grunt和grunt-cli的详细信息.
+ [配置任务](configuring_tasks.html)指南中有对于如何在Gruntfile中配置任务, 目标, 选项和文件的深入的解释, 还带有模板, 匹配模式和导入外部数据的说明.
+ [创建任务](creating_tasks.html)指南列出了Grunt任务类型之间的不同, 同时展示了许多实例任务和配置.
+ 对于关于编写自定义任务或者Grunt插件的更多信息, 请参考[开发者文档](grunt.html).

## Grunt 0.3说明

如果你从Grunt 0.3升级而来的, 请确保先卸载全局的`grunt`:

	npm uninstall -g grunt

*这些说明是针对Grunt 0.4.x编写的, 但仍然适用于Grunt 0.3.x. 只是注意0.3.x中的插件名称和任务配置选项可能与"Gruntfile"部分所展示的不同*.

*对于0.3.x版本的Grunt, 这个文件被命名为`grunt.js`*.
