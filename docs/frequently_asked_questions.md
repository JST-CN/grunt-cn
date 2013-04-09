#常见问题


###如何安装grunt?

对于常规的安装说明，请阅读[Getting Start](http://gruntjs.com/getting-started/)指南。如果在阅读完之后你需要更多的详细信息，你可以阅读更详细的的[Installing grunt](http://gruntjs.com/installing-grunt/)指南。

###什么时候我将可以使用开发中的特性"X"?

在[Installing grunt](http://gruntjs.com/installing-grunt/)指南中介绍了安装发布的和未发布的开发版本的Grunt。

###Grunt可以在Windows上工作吗?

Grunt可以很好的在windows上工作，因为[Node.js](http://nodejs.org/)和[npm](http://npmjs.org/)都能够很好的在windows上工作。通常情况下，问题在于[Cygwin](http://www.cygwin.com/)，因为它捆绑着一个过时版本的Node.js。

避免这个问题最好的办法是使用[msysGit installer](http://msysgit.github.com/)安装二进制的`git`和使用[Node.js installer](http://nodejs.org/#download)去安装二进制的`node`和`npm`，然后使用内置的Windows command prompt或者时PowerShell去替代Cygwin。

###为什么我的异步任务没有完成?

发生这种情况可能是因为你忘记调用[this.async](http://gruntjs.com/grunt.task#wiki-this-async)方法告诉Grunt你的任务是一个异步的。为了简单起见，Grunt使用的是同步的编码风格，你可以在任务体中通过调用`this.async`来转换为异步的任务。

例如:

	grunt.registerTask('asyncme', 'My asyncronous task', function(){
		var done = this.async();
		doSomethingAsync(done);
	});
	
###如何启用shell自动完成?

为了在子程序中启用grunt自动完成，可以在你的`~/.bashrc`中添加下面一行。

	eval "$(grunt --cpmpletion=bash)"
	
这要确保已经使用`npm install -g grunt`安装的全局Grunt。目前只有命令支持子程序。

###我如何跨多个任务共享我的参数?

虽然每个任务可以使用它自己的参数，这里有一些选项允许你跨多任务共享参数。

####"动态的"任务别名

**这是挎多任务共享参数的首选方法**

鉴于[任务别名](http://gruntjs.com/grunt#wiki-grunt-registertask)是很简单的，常见的做法是可以使用[grunt.task.run](http://gruntjs.com/grunt.task#wiki-grunt-task-run)使一个有效的函数作为“动态的”任务别名。在这里有一个例子，在命令行运行`grunt build:001`，正在运行的任务返回`foo:001`,`bar:001`和`baz:001`任务。

	grunt.registerTask('build', 'Run all my build task.', function(n){
		if(n == null){
			grunt.warn('Build num must be specified, like build:001');
		}
		grunt.task.run('foo:' + n, 'bar:' +   n, 'baz:' + n);
	});
	
####--选项

另一种跨多任务共享参数的方式是可以使用[grunt.option](http://gruntjs.com/grunt#wiki-grunt-option)。在这里有一个例子，在命令行总运行`grunt deploy --target=staging`会导致`grunt.option('target')`返回`staging`。

	grunt.registerTask('upload', 'Upload code to specified target.', function(n){
		var target = grunt.option('target');
		//这里做一些有效的目标
	});
	grunt.registerTask('deploy', ['validata', 'upload']);
	
注意布尔值的选项可以指定使用一个没有值的键。例如，在命令行中运行`grunt deploy --staging`会导致`grunt.option('target')`返回`true`。

####全局和配置

在其他情况下，你可能希望以公开的方式设置配置或者全局值。在这种情况下，注册一个任务设置它的参数作为一个全局的或者配置值。

这里有一个例子，在命令行中运行`grunt set_global:name:peter set_config:target:staging deploy`会导致`global.name`为`"peter"`和`grunt.config('target')`返回`"staging"`。假设，`deploy`任务会使用这些值。

	grunt.registerTask('set_global', 'Set a global variable.', function(name, val) {
		global[name] = val;
	});

	grunt.registerTask('set_config', 'Set a config property.', function(name, val) {
		grunt.config.set(name, val);
	});
	
####Grunt0.3的问题

###在Windows的grunt0.3中，为什么当我尝试运行grunt时我的JS编辑器会打开?

如果[Gruntfile](http://gruntjs.com/getting-started)在你相同的目录中，当你输入grunt时Windows会尝试去执行那个文件。因此你需要输入`grunt.cmd`去替代。

另一个选择是使用`DOSKEY`命令去创建一个Grunt宏，按照[这个指示](http://devblog.point2.com/2010/05/14/setup-persistent-aliases-macros-in-windows-command-prompt-cmd-exe-using-doskey/)。这将允许你使用`grunt`替代`grunt.cmd`。

这是你能够使用的`DOSKEY`命令:

	DOSKEY grunt=grunt.cmd $*