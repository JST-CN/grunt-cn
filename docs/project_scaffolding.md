#Project Scaffolding
##(项目架构)

###grunt-init

Grunt-init是一个架构工具被用于自动化项目构建。它将基于当前所在的环境创建一个完整的目录结构并处理一些问题。解决问题的方案依赖于实际的文件和内容创建所选择的模板。

注意：这个独特功能同样被用于Grunt的内置任务初始化。可以在Upgrading from 0.3 to 0.4指南中获取更多关于这个改变的信息。

###安装

为了使用grunt-init，你需要在全局环境安装它。

	npm install -g grunt-init
	
这将吧`grunt-init`命令推入到你的系统路径，并允许它在任何地方运行。

注意：你可能需要使用sudo或者作为超级管理员运行你的shell命令去处理这个。

###用法(Usage)

+  使用`grunt-init --help`获取程序帮助和有效的模板列表
+  使用`grunt-init TEMPLATE`基于一个有效的模板创建一个项目
+  使用`grunt-init /path/to/TEMPLATE`基于一个已经存在的模板创建一个项目

注意大部分的模板都在它们所在的目录生成文件，如果你不想覆盖已经存在的文件，你必须第一时间改变它到一个新的目录。

###安装模板

一旦模板被安装到你的`~/grunt-init/`目录(Windows中在`%USERPROFILE%\.grunt-init\`)中，它们将可以通过grunt-init有效的使用。推荐你使用git克隆一个模板到你的目录中。例如，grunt-init-jquery模板可以这样安装:

	git clone git@github.com:gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery
	
注意：如果你希望使模板在本地的'foobarbaz'中有效，你应该指定`~/.grunt-init/foobarbaz`之后再克隆。Grunt-init将使用实际的模板名在它的`~/.grunt-init`目录里面存在。

一些官方维护的grunt-init模板:

+  grunt-init-commonjs - 创建一个commonjs模块，包含Nodeunit单元测试
+  grunt-init-gruntfile - 创建一个基础的Gruntfile
+  grunt-init-gruntplugin - 创建一个Grunt插件，包含Nodeunit单元测试
+  grunt-init-jquery - 创建一个jQuery插件，包含QUnit单元测试
+  grunt-init-node - 创建一个Node.js模块，包含Nodeunit单元测试

###定制模板

你可以创建和使用定制模板，你的模板必须与前面所属的模板保持相同的结构。

一个简单的名为`my-template`的模板的大体结构如下:

+  `my-template/template.js` - 主模板文件
+  `my-template/rename.json` - 模板重命名详细规则，用于模板处理
+  `my-template/root/` - 文件拷贝的目标位置

假设这些文件在`/path/to/my-template`中，命令`grunt-init /path/to/my-template`将被用来处理模板。多个特殊明明的模板可能存在于相同的目录，就像内置模板一样。

此外，如果你的定制模板在`~/.grunt-init`目录中(Windows中是`%USERPROFILE%\.grunt-init\`)，它将在使用`grunt-init my-template`之后自动有效。

####文件复制

只要一个模板使用`init.filesToCopy`和`init.copyAndProcess`方法，当初始化模板运行之后，`root/`子目录中的任何文件都被复制到当前目录。

注意所有被复制的文件都被当作模板处理，任何`{% %}`模板都被处理为对应的`props`数据对象集，除非设置`noProcess`选项。来看看一下jQuery模板的例子。

####重命名或者排除模板文件

`rename.json`描述了`sourcepath`到`destpath`的重命名列表。`sourcepath`必须是被复制的文件相对与`root/`目录的路径，但是`destpath`值可以包含`{% %}`模板，这将表示目标路径。

如果`destpath`被指定为`false`，那么文件将不会被复制。同样的通配模式也支持`srcpath`。

###指定默认的信息

每个初始化快捷都有一个默认的代码值或者当前环境试图分配默认值。如果你希望覆盖快捷方式的详细的默认值，你可以在OSＸ或者Linux系统的`~/.grunt-init/defaults.json`或者Windows的`%USERPROFILE%\.grunt-init\defaults.json`文件中处理。

例如：我的`defaults.json`看起来时这样的，因为我希望使用一个与众不同的名字而不是默认的名字，我希望排除我的email地址，希望自动指定一个作者的url.

	{
		"author_name": "\"Cowboy\" Ben Alman",
		"author_email": "none",
		"author_url": "http://benalman.com/"
	}

注意：在左右的内置快捷方式中都有证明文件，你可以在源代码中查看他们的名字和默认值。

###定义一个初始化模板

####exports.description

这个简单的模板描述将被用来显示附带的模板名称，当用户运行`grunt init`或者`grunt-init`时显示一个所有初始化模板的列表。

	exports.description = descriptionString;
	
####exports.notes

如果指定，这个可选的扩展描述将被用来显示任意之前的快捷方式。这是一个很好的东西能够给用一点帮助解释命名转换，哪些快捷方式时必须的或者可选的。

	exports.notes = noteString;

####exports.warnOn

如果这个可选的(不推荐的)符号模式或者符号模式数组被匹配，Grunt将带来一个用户可以使用`--force`代理的警告并中断。这对于初始化模板可能覆盖已经存在的文件来说是一个非常有用的情况。

	exports.warnOn = wildcardPattern;
	
然而大多数的共用的值时`*`，匹配任意文件或者目录，minimatch符号模式语法允许被很灵活的使用。例如：

	exports.warnOn = 'Gruntfile.js';
	exports.warnOn = '*.js';
	exports.warnOn = '*';
	exports.warnOn = '.*';
	exports.warnOn = '{.*, *}';
	exports.warnOn = '!*/**';
	exprots.warnOn = '*.{png,gif,jpg}';
	
	exprots.warnOn = ['*.png', '*.gif', '*.jpg'];
	
####exports.template

虽然`exports`属性被定义在函数的外部，所有初始化的代码在内部指定。三个参数被传递到这个函数。`grunt`参数用来引用grunt，包含所有的grunt methods and libs。`init`参数是一个对象包含这个模板初始化的详细的方法和属性。`done`参数时一个当模板初始化完成之后必须被调用的方法。

	exports.template = function(grunt, init, done){
		//请查看下一节内容
	};
	
###一个初始化模板的细节

####init.addLicenseFiles

添加正确的命名协议文件到文件对象。

	var files = {};
	var licenses = ['MIT'];
	init.addLicenseFiles(files, license);
	//files === {'LICENSE-MIT': 'licenses/LICENSE-MIT'}
	
####init.availableLicenses

返回一个有效的协议数组。

	var licenses = init.availableLicenses();
	//licenses === ['Apache-2.0', 'GPL-2.0', 'MIT', 'MPL-2.0']
	
####init.copy

提供一个绝对或者相对的资源路径，和一个可选的相对目标路径，复制一个文件，通过传递一个回掉函数进行处理。

	init.copy(srcpath[, destpath], options)

####init.copyAndProcess

在被传递的对象中重复所有的文件，复制资源文件到目标路径，并处理它的内容。

	init.copyAndProcess(files, props[, options])
	
####init.defaults

用户在`defaults.json`中指定的默认初始值。

	init.defaults
	
####init.destpath

目标文件的绝对路径

	init.destpath();
	
####init.expand

与grunt.file.expand类似

返回一个特殊的匹配提供的字符模式的所有文件或者目录路径的数组。这个方法接受任意的逗号分割的字符模式或者字符模式数组。路径匹配模式的开始是!将从返回的数组中排除。模式按顺序处理，因此包含和排除的顺序时有意义的。

	init.expand([options, ] patterns);
	
####init.filesToCopy

返回一个对象包含文件复制的绝对资源路径和相对目标路径，按照规则在rename.json(如果存在)中重命名(或者省略)

	var files = init.filesToCopy(props);
	/* files === { '.gitignore': 'template/root/.gitignore',
	   '.jshintrc': 'template/root/.jshintrc',
	   'Gruntfile.js': 'template/root/Gruntfile.js',
	   'README.md': 'template/root/README.md',
       'test/test_test.js': 'template/root/test/name_test.js' } */
       
####init.getFile

获取一个单一任务的文件路径

	init.getFile(filepath[, …])
	
####init.getTemplates

返回一个包含所有有效模板的对象

	init.getTemplates()
	
####init.initSearchDirs

搜索初始化模板来初始化目录。`template`时模板的位置。总是包含`~/.grunt-init`和使用grunt-init的核心初始化任务。

	init.initSearchDirs([filename]);
	
####init.process

发起快捷的初始化输入

	init.process(options, prompt, done)
&nbsp;

	init.process({}, [
		//快捷值
		init.prompt('name'),
		init.prompt('description'),
		init.prompt('version')
	], function(err, props){
		//使用属性完成所有的事情
	});
	
####init.prompts

所有的快捷对象

	var prompts = init.prompts;
	
####init.readDefaults

从任务文件(如果他们存在)读取默认的JSON信息，将它们合并到一个数据对象

	init.readDefaults(filepath[, …])
	
####init.renames

模板的重命名规则。

	var renames = init.renames;
	// renames === {'test/name_test.js': ‘test/{%= name %}_test.js' }
	
####init.srcpath

搜索初始模板的文件名并返回一个绝对路径

	init.srcpath(filepath[, …])
	
####init.useDir

返回用户模板目录的绝对路径。

	var dir = init.useDir();
	// dir === '/User/shama/.grunt-init'
	
####init.writePackageJSON

在目标目录保存一个package.json文件。毁掉函数用来提交处理属性到add/remove/whatever

	init.writePackageJSON(filename, props[, callback])
	
###内置prompts

####author_email

用于`package.json`中的作者email地址。将试图从用户的git配置中查找一个默认值。

####author_name

用于`ackage.json`中的作者全名和版权公告。将试图从用户的git配置中查找一个默认值。

####author_url

用于`package.json`中指向作者个人网站的一个公共URL。

####bin

一个cli脚本相对于项目根目录的一个相对路径。

####bugs

一个用于项目问题跟踪的公共URL。如果项目拥有一个github仓库，将默认指向github上的问题跟踪模块。

####description

一个关于项目的描述信息。用于`package.json`和README文件中。

####grunt_version

针对Grunt需求的一个通过验证的语义上的版本范围。

####homepage

一个指向项目首页的公共URL。如果有github仓库则默认指向github。

####jquery_version

如果是一个jQuery项目，这代表jQuery的需求版本。必须是一个能通过验证的描述器。

####licenses

项目的协议。多个协议使用空格分割。内置的协议有: `MIT`,`MPL-2.0`,`GPL-2.0`和`Apache-2.0`。默认时`MIT`。使用init.addLicensFiles添加定制协议。

####main

项目的主要入口点。默认情况指向项目中`lib`目录的名称。

####name

项目的名称。将用来贯穿于整个项目模板。默认指向当前的工作目录。

####node_version

项目所需的Node.js的版本。必须是可验证的版本版本范围描述器。

####npm_test

在你的项目中运行测试的命令。默认就是`grunt`。

####repository

项目的git分支。默认推荐指向一个github url。

####title

一个易读的项目名。默认指向实际的项目名改变更多人的阅读习惯。

####version

项目的版本信息。默认指向可验证的版本`0.1.0`。


