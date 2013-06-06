#创建任务

任务是Grunt的面包和奶油. 例如你常用的东西: `jshint`和`nodeunit`. 当你每次运行Grunt时, 你可以指定运行一个或者多个任务, 这些任务用于告诉Grunt你想要它做什么事情.

如果你不指定一个任务, 那么Grunt会自动定义一个名为'default'的任务, 该任务将默认运行(不要惊讶).

##别名任务

如果指定了一个任务列表, 新任务将是一个或多个其他任务的别名. 当运行'别名任务'时, 每个指定在`taskList`中的任务都会运行, 按照它们指定的顺序. `taskList`参数必须时一个任务数组.

    grunt.registerTask(taskName, [description, ], taskList);
    
这里有一个示例, 它定义了一个'default'别名任务, 如果运行Grunt时没有指定任何任务, 它将自动运行'jshint', 'qunit', 'concat'和'uglify'任务.

    grunt.registerTask('default', ['jshint','qunit','concat','uglify']);
    
最好是给任务指定参数. 在下面的示例中, 别名'dist'将运行'concat'和'min'两个任务, 并且它们都带有一个'dist'参数:

    grunt.registerTask('dist', ['concat:dist', 'uglify:dist']);
    
##多任务

当运行一个多任务时, Grunt会项目的Grunt配置中查找同名属性. 多任务可以拥有多个配置, 可以使用任意的'targets'命名.

同时指定像`grunt concat:foo`或者`grunt concat:bar`这样的任务和目标, 将只处理指定目标的配置, 然而运行`grunt concat`将遍历所有的目标, 并按顺序处理每个目标. 注意如果一个任务已经使用[grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask)重命名过, Grunt将会配置对象中查找新任务的名称属性.

大部分的扩展任务, 包括[grunt-contrib-jshint插件的jshint任务](https://github.com/gruntjs/grunt-contrib-jshint), 以及[grunt-contrib-concat插件的concat任务](https://github.com/gruntjs/grunt-contrib-concat)都是多任务的.

    grunt.registerTask(taskName, [description, ], taskFunction);
    
鉴于指定的配置, 这里有一个示例演示了如果通过`grunt log:foo`运行Grunt, 它应该记录日志信息`foo: 1,2,3`, 如果通过`grunt log:bar`来运行Grunt, 它应该记录日志信息`bar: hello world`. 然而如果通过`grunt log`运行Grunt, 它应该记录日志信息`foo: 1,2,3`, 然后是`bar: hello world`, 最后是`baz: false`.

    grunt.initConfig({
        log: {
            foo: [1,2,3],
            bar: 'hello world',
            baz: false
        }
    });
    
    grunt.registerTask('log','log stuff.', function(){
        grunt.log.writeln(this.target + ': ' + this.data);
    });
    
##'基本'任务

当运行一个基本任务时, Grunt并不会查找配置和环境, 它仅仅运行指定的任务函数, 可以传递任意使用冒号分割的参数作为函数的参数.

    grunt.registerTask(taskName, [description, ], taskFunction);
    
这里有一个例子演示了如果通过`grunt foo:testing:123`运行Grunt将记录日志信息`foo, testing 123`. 如果运行这个任务时不传递参数, 只运行`grunt foo`, 那么这个任务将记录日志信息`foo, no args`.

    grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
        if (arguments.length === 0) {
            grunt.log.writeln(this.name + ", no args");
        } else {
            grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
        }
    });
    
##自定义任务

你可能会着迷于任务. 如果你的任务并没有遵循多任务结构, 那么你可以使用自定义任务.

    grunt.registerTask('default', 'My "default" task description.', function(){
        grunt.log.writeln('Currently running the "default" task.');
    });
    
在一个任务的内部, 你可以运行其他的任务.

    grunt.registerTask('foo', 'My "foo" task.', function() {
        //在foo任务完成之后一次运行队列中的bar和baz任务
        grunt.task.run('bar', 'baz');
        // Or:
        grunt.task.run(['bar', 'baz']);
    });
    
任务可以是异步的.

    grunt.registerTask('asyncfoo', 'My "asyncfoo" task.', function() {
        //将任务转变为异步模式并交给done函数处理
        var done = this.async();
        //同步阻塞
        grunt.log.writeln('Processing task...');
        //异步阻塞.
        setTimeout(function() {
            grunt.log.writeln('All done!');
            done();
        }, 1000);
    });
    
任务也可以访问它们自身名称和参数.

    grunt.registerTask('foo', 'My "foo" task.', function(a, b) {
    grunt.log.writeln(this.name, a, b);
});

    // 用法:
    // grunt foo foo:bar
    //   logs: "foo", undefined, undefined
    //   logs: "foo", "bar", undefined
    // grunt foo:bar:baz
    //   logs: "foo", "bar", "baz"
    
如果任务记录到错误信息, 则任务可能会失败.

    grunt.registerTask('foo', 'My "foo" task.', function() {
        if (failureOfSomeKind) {
            grunt.log.error('This is an error message.');
        }

        //如果这个任务抛出错误则返回false
        if (ifErrors) { return false; }

        grunt.log.writeln('This is the success message');
    });
    
当任务失败时, 所有后续的除了指定`--force`标志的任务都会终止.

    grunt.registerTask('foo', 'My "foo" task.', function() {
        //同步失败
        return false;
    });

    grunt.registerTask('bar', 'My "bar" task.', function() {
        var done = this.async();
        setTimeout(function() {
            //异步失败
            done(false);
        }, 1000);
    });
    
任务还可以依赖其他成功执行的任务. 注意`grunt.task.requires`并不会运行其他任务. 它仅仅检查那些任务(其他任务)的运行, 并没有失败(其他任务运行成功).

    grunt.registerTask('foo', 'My "foo" task.', function() {
        return false;
    });

    grunt.registerTask('bar', 'My "bar" task.', function() {
        //如果foo任务运行失败或者没有运行
        grunt.task.requires('foo');
        //如果foo任务运行成功则执行这里的代码
        grunt.log.writeln('Hello, world.');
    });

    // 用法
    // grunt foo bar
    // 不记录，因为foo失败
    // grunt bar
    // 不记录，因为foo从未运行

如果需要的配置属性不存在, 任务也可能失败。

	grunt.registerTask('foo', 'My "foo" task', function(){
		//如果缺省"meta.name"配置属性则任务失败
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
	
在[contrib tasks](https://github.com/gruntjs/)中可以查看更多的例子。

##CLI选项和环境

TODO(从FAQ拉取，推荐process.env)

##为什么我的异步任务没有完成？

可能会发生这种情况，由于你可能忘记调用[this.async](http://gruntjs.com/api/grunt.task#wiki-this-async)方法来告诉Grunt你的任务是异步的。为了简单起见，Grunt使用同步的编码风格，可以在任务体中通过调用`this.async`将任务转换为异步的。

注意传递`false`给`done`函数就会告诉Grunt任务已经失败。

例如：

    grunt.registerTask('asyncme', 'My asynchronous task.', function(){
        var done = this.async();
        doSomethingAsync(done);
    }); 