#Frequently Asked Questions
##(常见问题)

###如何安装grunt?

对于常规的安装说明，请阅读Getting Start指南。如果在阅读完之后你需要更多的详细信息，你可以阅读综合的Installing grunt指南。

###什么时候我将可以使用开发中的特性"X"?

在Installing grunt指南中安装发布的和未发布的开发版本的Grunt将包括这些新特性。

###Grunt可以在Windows上工作吗?

Grunt可以很好的在windows上工作，因为Node.js和npm都能够很好的在windows上工作。常见的问题是Cygwin，因为它对一些老版本的Node.js有约束。

避免这个问题最好的方式时使用msysGit installer去安装二进制的`git`和使用Node.js installer去安装`node`和`npm`，然后使用内置的Windows command prompt或者时PowerShell去替代Cygwin。

###为什么我的异步任务没有执行?

偶尔发生这种情况是因为你忘记调用this.async方法告诉Grunt你的任务是一个异步的。一个简单的理由是，Grunt使用的时异步的编码风格，可以在任务体中通过调用`this.async`来转换为异步的任务。

例如:

	grunt.registerTask('asyncme', 'My asyncronous task', function(){
		var done = this.async();
		doSomethingAsync(done);
	});
	
###我如何在shell中启用tab自动完成?

在你的`~/.bashrc`文件中添加下面的命令，可以暴力的在你的grunt中启用tab自动完成。

	eval "$(grunt --cpmpletion=bash)"
	
这要确保Grunt是使用`npm install -g grunt`安装的全局的版本。目前仅仅在命令中支持这个。

###我如何夸多个任务共享我的参数?

虽然每个任务可以使用它自己的参数，这里有一些选项允许你夸多任务共享参数。

####"动态的"任务别名

**这是挎多任务共享参数的首选方法**

鉴于任务别名时最很简单的，一个合格的任务可以使用grunt.task.run使一个有效的函数作为“动态的”任务别名。在这里有一个例子，在命令行运行`grunt build:001`将在运行中返回`foo:001`,`bar:001`和`baz:001`任务。

	grunt.registerTask('build', 'Run all my build task.', function(n){
		if(n == null){
			grunt.warn('Build num must be specified, like build:001');
		}
		grunt.task.run('foo:' + n, 'bar:' +   n, 'baz:' + n);
	});
	
####--选项

另一种挎多任务共享参数的方式是可以使用grunt.option。在这里有一个例子，在命令行总运行`grunt deploy --target=staging`可以触发`grunt.option('target')`返回`staging`。

	grunt.registerTask('upload', 'Upload code to specified target.', function(n){
		var target = grunt.option('target');
		//这里使用target做一些处理
	});
	grunt.registerTask('deploy', ['validata', 'upload']);
	
注意布尔值的选项可以指定使用一个键而不是一个值。例如，在命令行中运行`grunt deploy --staging`可以触发`grunt.option('target')`返回`true`。

####全局和配置

在另外一些情况下，你可能希望曝露一种方式去设置配置或者全局的值。在这些情况下，注册一个任务设置它的参数作为一个全局或者配置的值。

这里有一个例子，在命令行中运行`grunt set_global:name:peter set_config:target:staging deploy`可以触发`global.name`为`"peter"`和`grunt.config('target')`返回`"staging"`假设，`deploy`任务会使用这些值。

	grunt.registerTask('set_global', 'Set a global variable.', function(name, val) {
		global[name] = val;
	});

	grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
		grunt.config.set(name, val);
	});
	
####grunt0.3的问题

###在Windows的grunt0.3中，为什么当我尝试运行grunt时我的JS编辑器会打开?

如果你是出来与Gruntfile相同的目录，当你输入grunt时Windows会尝试去执行那个文件。因此你需要输入`grunt.cmd`去替代。

另一个选择是使用`DOSKEY`命令去创建一个Grunt宏，可以下看这个说明。那样可以允许你使用`grunt`替代`grunt.cmd`。

这是你能够使用的`DOSKEY`命令:

	DOSKEY grunt=grunt.cmd $*