#项目架构

###grunt-init

Grunt-init是一个架构工具被用于自动构建项目。它将基于当前所在的环境创建一个完整的目录结构并回答一些问题。适当的文件和内容创建取决于选择的模板和所问的问题。

注意：这个独立的实用程序被用于内置的Grunt初始化任务。可以在[0.3升级到0.4](https://github.com/gruntjs/grunt/wiki/Upgrading-from-0.3-to-0.4)指南中查看关于这个改变的更多信息。

###安装

为了使用grunt-init，你会希望在全局环境安装它。

	npm install -g grunt-init
	
这将把`grunt-init`命令置于你的系统路径，并允许它在任何地方运行。

注意：你可能需要使用sudo或者作为超级管理员运行你的shell命令去处理这个。

###用法

+  使用`grunt-init --help`获取程序帮助和可用的模板列表
+  使用`grunt-init TEMPLATE`基于各个可用的模板创建一个项目
+  使用`grunt-init /path/to/TEMPLATE`基于周围任意位置的模板创建一个项目

注意大部分的模板都在它们当前目录生成文件，如果你不想覆盖现有的文件，你一定要改变到一个新的目录。

###安装模板

一旦模板被安装到你的`~/grunt-init/`目录(Windows中在`%USERPROFILE%\.grunt-init\`)中，它们将可以使用grunt-init进行初始化。推荐你使用git克隆一个模板到你的目录中。例如，[grunt-init-jquery](https://github.com/gruntjs/grunt-init-jquery)模板可以这样安装:

	git clone git@github.com:gruntjs/grunt-init-jquery.git ~/.grunt-init/jquery
	
注意：如果你想让本地可用的模板为'foobarbaz'，你应该指定`~/.grunt-init/foobarbaz`进行克隆。Grunt-init将使用实际的模板目录名，因为它在`~/.grunt-init`目录里面。

一些官方维护的grunt-init模板:

+  [grunt-init-commonjs](https://github.com/gruntjs/grunt-init-commonjs) - 创建一个commonjs模块，包含Nodeunit单元测试([范例](https://github.com/gruntjs/grunt-init-commonjs-sample/tree/generated)|[成绩](https://github.com/gruntjs/grunt-init-commonjs-sample#project-creation-transcript))
+  [grunt-init-gruntfile](https://github.com/gruntjs/grunt-init-gruntfile) - 创建一个基础的Gruntfile([范例](https://github.com/gruntjs/grunt-init-gruntfile-sample/tree/generated)|[成绩](https://github.com/gruntjs/grunt-init-gruntplugin-sample#project-creation-transcript))
+  [grunt-init-gruntplugin](https://github.com/gruntjs/grunt-init-gruntplugin) - 创建一个Grunt插件，包含Nodeunit单元测试([范例](https://github.com/gruntjs/grunt-init-gruntplugin-sample/tree/generated)|[成绩](https://github.com/gruntjs/grunt-init-gruntplugin-sample#project-creation-transcript))
+  [grunt-init-jquery](https://github.com/gruntjs/grunt-init-jquery) - 创建一个jQuery插件，包含QUnit单元测试([范例](https://github.com/gruntjs/grunt-init-jquery-sample/tree/generated)|[成绩](https://github.com/gruntjs/grunt-init-jquery-sample#project-creation-transcript))
+  [grunt-init-node](https://github.com/gruntjs/grunt-init-node) - 创建一个Node.js模块，包含Nodeunit单元测试([范例](https://github.com/gruntjs/grunt-init-node-sample/tree/generated)|[成绩](https://github.com/gruntjs/grunt-init-node-sample#project-creation-transcript))

###自定义模板

你可以创建和使用自定义模板，你的模板必须与上述模板遵循相同的结构。

一个简单的名为`my-template`的模板一般遵循这种文件结构:

+  `my-template/template.js` - 主模板文件
+  `my-template/rename.json` - 模板的具体命名规则，用于模板处理
+  `my-template/root/` - 文件拷贝的目标位置

假设这些文件存在于`/path/to/my-template`目录中，命令`grunt-init /path/to/my-template`将被用来处理模板。多个命名唯一的模板可能存在于相同的目录，就像内置模板一样。

此外，如果你的自定义模板在`~/.grunt-init`目录中(Windows中是`%USERPROFILE%\.grunt-init\`)，它将在使用`grunt-init my-template`后自动可用。

####复制文件

只要一个模板使用`init.filesToCopy`和`init.copyAndProcess`方法，当运行初始化模板之后，所有`root/`子目录的文件将被复制到当前目录。

注意所有被复制的文件都将被处理为模板，任何`{% %}`模板都被处理为对应的`props`数据对象集，除非设置`noProcess`选项。来看看一下[jQuery模板](https://github.com/gruntjs/grunt-init-jquery)的例子。

####重命名或者排除模板文件

`rename.json`描述了`sourcepath`到`destpath`的重命名映射。`sourcepath`必须是被复制的文件相对与`root/`目录的路径，但是`destpath`值可以是包含`{% %}`的模板，这将描述目标路径时什么样的。

如果`destpath`被指定为`false`，那么文件将不会被复制。此外，模式匹配也支持`srcpath`。

###指定默认提示答案

每个初始化提示都有一个硬编码的默认值或者或者在当前环境下查找并试图确定缺省值。如果你希望覆盖一个特定指定的默认值，你可以在可选的OSＸ或者Linux系统的`~/.grunt-init/defaults.json`或者Windows的`%USERPROFILE%\.grunt-init\defaults.json`文件中处理。

例如：我的`defaults.json`看起来是这样的，因为我希望使用一个与众不同的名称相对于默认名称，我希望排除我的email地址，并自动指定一个作者的url.

	{
		"author_name": "\"Cowboy\" Ben Alman",
		"author_email": "none",
		"author_url": "http://benalman.com/"
	}

注意：直到所有的内置提示被指定在案，你可以在[源代码](https://github.com/gruntjs/grunt-init/blob/master/tasks/init.js)中找到他们的名字和默认值。

###定义初始化模板

####exports.description

这个简单的模板描述将始终与模板名一起显示，当用户运行`grunt init`或者`grunt-init`来显示一个所有可用的初始化模板的列表时。

	exports.description = descriptionString;
	
####exports.notes

如果指定，这个可选的扩展描述将显示在任意的提示信息之前。这是给用户解释一个命名约定做好的地方，指明那些提示时必须包含的或者可选的，等等。

	exports.notes = noteString;

####exports.warnOn

如果这个可选的(推荐指定)通配符模式或者数组被通配符模式匹配，Grunt将终止运行并伴随一个警告信息，用户可以使用`--force`来覆盖。在初始化模板可能覆盖现有文件的情况下这是非常有用的。

	exports.warnOn = wildcardPattern;
	
最常见的值是`*`，匹配任意文件或者目录，[minimatch](https://github.com/isaacs/minimatch)通配符模式语法的使用具有很大的灵活性。例如：

	exports.warnOn = 'Gruntfile.js'; //
	exports.warnOn = '*.js';
	exports.warnOn = '*';
	exports.warnOn = '.*';
	exports.warnOn = '{.*, *}';
	exports.warnOn = '!*/**';
	exprots.warnOn = '*.{png,gif,jpg}';
	
	exprots.warnOn = ['*.png', '*.gif', '*.jpg'];
	
####exports.template

虽然`exports`属性被定义在函数的外部，但所有初始化的代码在内部指定。三个参数被传递到这个函数。`grunt`参数用来引用grunt，包含所有的[grunt methods and libs](http://gruntjs.com/api/grunt)。`init`参数是一个包含这个初始化模板的具体方法和属性的对象。`done`参数是一个进行模板初始化时必须调用的函数。

	exports.template = function(grunt, init, done){
		//请查看下一节内容
	};
	
###初始化模板的内部信息

####init.addLicenseFiles

给文件添加适当的命名许可协议。

	var files = {};
	var licenses = ['MIT'];
	init.addLicenseFiles(files, license);
	//files === {'LICENSE-MIT': 'licenses/LICENSE-MIT'}
	
####init.availableLicenses

返回一个可用许可协议的数组。

	var licenses = init.availableLicenses();
	//licenses === ['Apache-2.0', 'GPL-2.0', 'MIT', 'MPL-2.0']
	
####init.copy

提供一个绝对或者相对的源文件路径，和一个可选的相对目标路径，复制一个文件，可以通过传递回掉函数处理文件复制。

	init.copy(srcpath[, destpath], options)

####init.copyAndProcess

遍历传递对象中的所有文件，将源文件复制到目标路径，并处理它的内容。

	init.copyAndProcess(files, props[, options])
	
####init.defaults

用户在`defaults.json`中指定的默认初始值。

	init.defaults
	
####init.destpath

目标文件的绝对路径

	init.destpath();
	
####init.expand

与[grunt.file.expand](https://github.com/gruntjs/grunt/wiki/grunt.file#wiki-grunt-file-expand)一样

返回一个特殊的匹配给定通配符模式的所有文件或者目录的数组。该方法接受一个逗号分割的通配符模式或者数组形式的通配符模式。以!开始的匹配模式匹配的路径将被排除在返回数组之外。模式按顺序处理，因此包含和排除的顺序是很重要的。

	init.expand([options, ] patterns);
	
####init.filesToCopy

返回一个包含文件复制的源文件绝对路径和目标路径的对象，重命名(或者缺省)的规则包含在rename.json中(如果存在相关规则)。

	var files = init.filesToCopy(props);
	/* files === { '.gitignore': 'template/root/.gitignore',
	   '.jshintrc': 'template/root/.jshintrc',
	   'Gruntfile.js': 'template/root/Gruntfile.js',
	   'README.md': 'template/root/README.md',
       'test/test_test.js': 'template/root/test/name_test.js' } */
       
####init.getFile

一个单一任务的文件路径

	init.getFile(filepath[, …])
	
####init.getTemplates

返回一个包含所有可用模板的对象

	init.getTemplates()
	
####init.initSearchDirs

搜索模板初始化的初始目录。`template`为模板的位置。还将包括`~/.grunt-init`和使用grunt-init中的核心初始化任务。

	init.initSearchDirs([filename]);
	
####init.process

启动开始输入提示信息的过程

	init.process(options, prompt, done)
&nbsp;

	init.process({}, [
		//提示值
		init.prompt('name'),
		init.prompt('description'),
		init.prompt('version')
	], function(err, props){
		//完成之后使用属性处理一些事情
	});
	
###init.prompt

给用户一个提示值

	init.prompt(name[, default])
	
####init.prompts

包含所有提示信息的对象

	var prompts = init.prompts;
	
####init.readDefaults

从任务文件(如果他们存在)读取默认的JSON信息，将它们合并为一个数据对象

	init.readDefaults(filepath[, …])
	
####init.renames

模板命名规则。

	var renames = init.renames;
	// renames === {'test/name_test.js': ‘test/{%= name %}_test.js' }
	
####init.searchDirs

索引模板所在目录的一个数组.

	var dirs = init.searchDirs;
	/* dirs === [ '/Users/shama/.grunt-init',
	'/usr/local/lib/node_modules/grunt-init/templates' ] */
	
####init.srcpath

搜索模板初始化路径的文件名并返回一个绝对路径

	init.srcpath(filepath[, …])
	
####init.useDir

返回用户模板目录的绝对路径。

	var dir = init.useDir();
	// dir === '/User/shama/.grunt-init'
	
####init.writePackageJSON

在目标目录中保存一个package.json文件。回掉函数可用来处理后期的属性add/remove/其他操作。

	init.writePackageJSON(filename, props[, callback])
	
###内置提示

####author_email

用于`package.json`中的作者email地址。将试图从用户的git配置中查找一个默认值。

####author_name

用于`package.json`中的作者全名和版权提示。将试图从用户的git配置中查找一个默认值。

####author_url

用于`package.json`中指向作者个人网站的一个公共URL。

####bin

cli脚本相对于项目根目录的一个相对路径。

####bugs

一个用于项目问题跟踪的公共URL。如果项目拥有一个github仓库，将默认指向github上的issue模块。

####description

一个关于项目的描述信息。用于`package.json`和README文件中。

####grunt_version

Grunt项目所需要的一个有效版本范围描述。

####homepage

一个指向项目主页的公共URL。如果有github仓库则默认指向github。

####jquery_version

如果是一个jQuery项目，这代表jQuery的所需要的版本信息。必须是一个有效的版本范围描述。

####licenses

项目的许可协议。多个许可协议使用空格分割。内置的协议有: `MIT`,`MPL-2.0`,`GPL-2.0`和`Apache-2.0`。默认时`MIT`。使用[init.addLicensFiles](http://gruntjs.com/#initaddlicensefiles)添加自定义许可协议。

####main

项目的主要入口点。默认情况下指向项目中名为`lib`的目录。

####name

项目的名称。在项目模板中将被大量使用。默认指向当前的工作目录。

####node_version

项目所需的Node.js的版本。必须是有效的版本范围描述。

####npm_test

在你的项目中运行测试的命令。默认就是`grunt`。

####repository

项目的git仓库。默认为一个github url的猜测。

####title

一个开发人员易读的项目名称。默认将实际项目名称改为可读的。

####version

项目的版本。默认为一个有效的版本:`0.1.0`。


