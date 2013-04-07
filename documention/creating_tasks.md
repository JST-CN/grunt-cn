#Creating tasks

任务是grunt的面包和黄油。你经常使用的东西例如`jshint`和`nodeunit`。当每次运行Grunt时，你指定运行一个或者多个任务，用于告诉Grunt你希望它去做什么。

如果你没有指定一个任务，就会有一个名为'default'的任务被定义，将运行一个默认的任务(这并不是惊奇的)。

##任务别名

如果指定了任务列表，新的任无将有针对一个或者更多其他任务的别名。每当'别名任务'运行时，在`taskList`中指定的任务都会按指定的顺序运行。`taskList`的参数是一个任务数据。

	grunt.registerTask(taskName, [description, ] taskList);
	
这个任务别名的例子指定了一个'default'例子，当Grunt没有指定一些任务时被执行它会自动运行使用'jshint','qunit','concat'和'uglify'任务。

	grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
	
可以适当的指定任务的参数。在这个例子中，别名'dist'运行'concat'和'min'两个任务，都带有一个'dist'参数:

	grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);
	
###多个任务

当运行多个任务时，Grunt与Grunt配置中的一个属性同名属性。多个任务可以有多个配置，使用任意"targets"命名定义。

指定类似`grunt concat:foo`或者`grunt concat:bar`的任务和目标将立即处理指定的目标配置，然而运行`grunt concat`将遍历所有的目标，然后依次处理。注意如果使用grunt.renameTask重命名一个任务，Grunt将在配置对象中查找新任务的名称属性。

大多数的基本任务，包括grunt-contrib-jshint插件的jshint任务，concat任务和grunt-contrib插件的concat的任务都是多任务的。

	grunt.registerMultiTask(taskName, [description, ] taskFunction)
	
考虑到指定的配置，这个例子中如果Grunt通过运行`grunt log:foo`多任务将输出`foo: 1,2,3`日志信息。或者Grunt通过运行`grunt log:bar`会输出`bar: hello world`。然而如果Grunt运行`grunt log`，将输出`foo: 1,2,3`然后是`bar: hello world`，最后时`baz: false`。

	grunt.initConfig({
		log: {
			foo: [1, 2, 3],
			bar: 'hello world',
			baz: false
		}
	});
	
	grunt.registerNultiTask('log', 'Log stuff', function(){
		grunt.log.writeln(this.target + ': ' + this.data);
	});
	
###基本任务

当运行一个基本任务时，Grunt并不在配置或者环境中能看到，它会立即运行指定的任务函数，传递指定的的独特的运算符作为函数参数。

	grunt.registerTask(taskName, [description, ] taskFunction)
	
当Grunt通过运行`grunt foo:testing:123`时这个例子输出`foo, testing 123`任务日志。如果这个任务运行时没有传递参数而只运行了`grunt foo`这个任务将指输出`foo, no args`日志信息。

	grunt.registerTask('foo','A sample task that logs stuff', function(arg1, arg2){
		if(arguments.length === 0){
			grunt.log.wrireln(this.name + ", no args");
		}else{
			grunt
		}
	});
	
###定制任务

你可以疯狂的使用任务。如果你的任务没有遵循"多任务"结构，使用定制任务吧。

	grunt.registerTask('default','My "default" task description', function(){
		grunt.log.writeln('Currently running the "default" task.');
	});
	
在一个任务中，你可以运行其他的任务。

	grunt.registerTask('foo', 'My "foo" task.', function(){
		//"bar"和"baz"任务队列，在"foo"完成之后依次运行
		grunt.task.run('bar, baz');
		//或者
		grunt.task.run(['bar', 'baz']);
	});

任务也可以是异步的。

	grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function(){
		//推动任务到一步模块之中并定义一个"done"函数进行处理
		var done = this.async();
		//运行一些同步的任务
		grunt.log.writeln("Processing task…");
		//添加一些异步的信息
		setTimeout(function(){
			grunt.log.writeln('All done!');
			done();
		}, 1000);
	});
	
任务可以访问自身的名称和参数。

	grunt.registerTask('foo', 'My "foo" task', function(a, b){
		grunt.log.writeln(this.name, a, b);
	});
	
	// 用例
	// grunt foo foo:bar
	// logs: "foo", undefined, undefined
	// logs: "foo", "bar", undefined
	// grunt foo:bar:baz
	// logs: "foo", "bar", "baz"
	
如果我们记录了一些错误信息，任务可以被舍弃。

	grunt.registerTask('foo', 'My "foo" task', function(){
		if(failureSomeKind){
			grunt.log.error('This is an error message');
		}
		
		//如果任务发生错误返回false并退出
		if(isErrors){
			return false;
		}
		
		grunt.log.writeln('This is the success message');
	});
	
当任务失败时，所有后面的任务除了指定了`--force`的任务都会随之流产。

	grunt.registerTask('foo','My "foo" task.', function(){
		//同步失败
		return false;
	});
	
	grunt.registerTask('bar', 'My "bar" task', function(){
		var done = this.async();
		setTimeout(function(){
			//异步失败
			done(false);
		}, 1000);
	});
	
任务可以依赖其他成功执行的任务。注意`grunt.task.requires`实际上并不运行其他任务。它将立即检查运行并不退出。

	grunt.registerTask('foo', 'My "foo" task', function(){
		return false;
	});
	
	grunt.registerTask('bar', 'My "bar" task.', function(){
		//如果"foo"任务失败或者没有运行则任务失败
		grunt.task.requires('foo');
		//如果"foo"任务运行成功则执行下面的代码
		grunt.log.writeln('Hello, world');
	});
	
	// 用例
	// grunt foo bar
	// 不记录，因为foo失败
	// grunt bar
	// 不记录，因为foo从未运行

任务可能失败，如果必要的配置属性并不存在。

	grunt.registerTask('foo', 'My "foo" task', function(){
		//如果省略"meta.name"配置属性则任务失败
		grunt.config.requires('meta.name');
		//如果缺省"mata.name"配置属性则任务同样失败
		grunt.config.requires(['meta', 'name']);
		//附加记录
		grunt.log.writeln('This will only log if meta.name is defined in the config');
	});
	
任务可以访问配置属性。

	grunt.registerTask('foo', 'My "foo" task.', function(){
		// 记录属性值，如果属性未定义则返回null
		grunt.log.writeln('The meta.name property is:' + grunt.config('meta.name'));
		// 同样的记录属性值，如果属性未定义则返回null
		grunt.log.writeln('Ths meta.name property is:' + grunt.config(['meta', 'name']));
	});
	
在contrib tasks中可以获取更多的例子。

##CLI选项和环境

TODO(从FAQ拉取，推荐process.env)

##为什么我的异步任务没有执行

偶尔发生这种情况是因为你可能忘记调用this.async方法告诉Grunt你的任务是异步的。一个简单理由，Grunt使用一个异步的代码风格，可以在任务体中通过调用`this.async`转换为异步的。

注意传递`false`给`done`函数就会告诉Grunt这个任务失败了。

例如：

	grunt.registerTask('asyncme', 'My asynchronous task.', function(){
		var done = this.async();
		doSomethingAsync(done);
	});