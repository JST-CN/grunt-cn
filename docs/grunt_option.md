# grunt.option

Grunt option API用于跨多任务共参数以及在命令行中访问参数设置.

很明显的例子便是无论构建目标是在开发期还是演示期间都有一个标志. 在命令行中: `grunt deploy --target=staging`会导致`grunt.option('target')`返回`"staging"`.

一个Gruntfile利用`target`选项的例子可能如下:

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

当你运行`grunt deploy`时你的样式表将默认为`dev`目标并且输出CSS扩展格式. 如果你运行`grunt deploy --target=staging`, `staging`目标会替代运行, 你的CSS将变成压缩格式.

`grunt.option`也可以用在任务中, 例如:

	grunt.registerTask('upload', 'Upload code to specified target.', function(n) {
		var target = grunt.option('target');
	  // do something useful with target here
	});
	grunt.registerTask('deploy', ['validate', 'upload']);

*注意: 布尔值选项可以用于只指定一个没有值的键. 例如, 在命令行中运行`grunt deploy --staging`将导致`grunt.option('staging')`返回`true`*.

### grunt.option ☃

获取或者设置一个选项.
	
	grunt.option(key[, val])

布尔值选项可以通过在`key`上前置`no-`来否定, 例如:

	grunt.option('staging', false);
	var isDev = grunt.option('no-staging');
	// isDev === true

### grunt.option.init

初始化`grunt.option`. 如果`initObject`选项省略将初始化为一个空对象, 否则将设置为`initObject`.

	grunt.option.init([initObject])

### grunt.options.flags

返回命令行参数的选项数组.

	grunt.option.flags()	