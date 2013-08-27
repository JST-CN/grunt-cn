# grunt.option

Grunt的option API可以用来跨多任务共享参数，以及在命令行中访问参数设置。

一个简单的例子就是给你的目标(任务目标)打一个标记，标识任务是在开发阶段还是暂存阶段。在命令行中运行`grunt deploy --target=staging`就会让`grunt.option('target')`返回`"staging"`。

下面是一个在`Gruntfile`中使用`target`选项的例子：

	grunt.initConfig({
		compass: {
			dev: {
				options: {
					/* ... */
					outputStyle: 'expanded'
				},
			},
			staging: {
				options: {
					/* ... */
					outputStyle: 'compressed'
				},
			},
		},
	});
	var target = grunt.option('target') || 'dev';
	grunt.registerTask('deploy', ['compass:' + target]);

当你运行`grunt deploy`时你的样式表默认情况下为`dev`目标，并且它会以展开的格式输出CSS代码。如果你运行`grunt deploy --target=staging`, `staging`目标会替代父级的`dev`目标，同时它会以压缩格式输出CSS代码。

`grunt.option`也可以用在任务中，例如：

	grunt.registerTask('upload', 'Upload code to specified target.', function(n) {
		var target = grunt.option('target');
	  // do something useful with target here
	});
	grunt.registerTask('deploy', ['validate', 'upload']);

*注意：可以只用只有键(属性)而没有值的方式来指定布尔值选项。例如，在命令行中运行`grunt deploy --staging`会导致`grunt.option('staging')`返回`true`。*

### grunt.option ☃

获取或者设置一个选项。
	
	grunt.option(key[, val])

可以通过在`key`键上使用一个前置的`no-`来否定buerhi选项。例如：

	grunt.option('staging', false);
	var isDev = grunt.option('no-staging');
	// isDev === true

### grunt.option.init

初始化`grunt.option`设置。如果忽略参数中的`initObject`选项就会初始化为一个空对象，否则设置为指定的`initObject`。

	grunt.option.init([initObject])

### grunt.options.flags

以数组的形式选为命令行参数选项。

	grunt.option.flags()	