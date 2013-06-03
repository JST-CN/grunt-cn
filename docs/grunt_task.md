#grunt.task

注册, 运行和加载外部任务

查看[task lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/task.js)和[task util lib source](https://github.com/gruntjs/grunt/blob/master/lib/util/task.js)可以了解更多信息.

##The task API

当一个任务运行时, Grunt通过任务函数内部的`this`对象暴露许多特定任务工具的属性和方法. 查看[内置任务](http://gruntjs.com/inside-tasks/)指南中它们属性和方法列表.

许多工具的属性和方法在任务内部通过`this`对象都是可用的.

注意任何使用☃(unicode雪人)标记的方法在`grunt`对象内部都是直接有效的. 你只需要直到就行. 查看[API主页](http://gruntjs.com/grunt)可以了解更多用法信息.

##创建任务

###grunt.task.registerTask ☃

注册一个"别名任务"或者一个任务函数. 这个方法支持下面两种签名:

####别名任务

如果指定一个任务列表, 新任务将是一个或者其他多个任务的别名. 每当运行这个"别名任务"时, 每个在`tasklist`中指定的任务都运行, 按照指定的顺序. `tasklist`参数必须是一个任务数组.

	grunt.task.registerTask(taskName, taskList)

这里有一个别名任务例子, 定义了一个"default"任务, 包含"jshint", "qunit", "concat"和"uglify"任务, 如果执行Grunt而不指定任何任务时它们将自动运行.

	task.registerTask("default", ["jshint", "qunit", "concat", "uglify"])

也可以指定任务参数. 这里有一个例子, 别名任务"dist"会运行"concat"和"uglify"任务, 都带有一个"dist"参数:

	task.registerTask("dist", ["concat:dist", "uglify:dist"])

####任务函数

如果传递一个`description`和1taskFunction`, 每当任务运行时指定的函数都会执行. 此外, 当运行	`grunt --help`时, 指定的描述也会显示. 特定的任务属性和方法在任务函数内部作为`this`对象的属性都是可用的. 任务函数返回`false`表示任务失败.

注意`grunt.task.registerMultiTask`方法, 后面再解释, 可以用于一种特殊类型的任务, 成为"多任务".

	grunt.task.registerTask(taskName, description, taskFunction)

这里有一个例子, 如果Grunt运行`grunt foo:testing:123`, 这个任务记录`foo, testing 123`. 如果运行这个任务不带参数, 如`grunt foo`, 任务记录`foo, no args`.

	grunt.task.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
		  if (arguments.length === 0) {
				grunt.log.writeln(this.name + ", no args");
		  } else {
				grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
		  }
	});

可以查看[创建任务](http://gruntjs.com/creating-tasks)文档中更多任务和别名任务的例子.

*这个方法也可作为[grunt.registerTask](http://gruntjs.com/grunt)*.

###grunt.task.registerMultiTask ☃

注册一个"多任务". 多任务是一个隐式的遍历其命名自属性的任务(AKA目标), 如果没有指定目标. 除了默认的属性和方法, 另外特定的多任务属性在任务函数内部作为`this`对象的属性是可用的.

许多contrib任务, 都包含[jshint任务](https://github.com/gruntjs/grunt-contrib-jshint), [concat任务](https://github.com/gruntjs/grunt-contrib-concat)和[uglify任务](https://github.com/gruntjs/grunt-contrib-uglify)都是多任务.

	grunt.task.registerMultiTask(taskName, description, taskFunction)

由于给定的配置, 这里有一个多任务例子当grunt通过`grunt log:foo`运行时会记录`foo: 1,23`, 或者通过`grunt log:bar`运行会记录`bar: hello world`. 然而如果grunt运行`grunt log`, 它会记录`foo: 1,2,3`, 然后是`bar: hello world`, 最后时`baz: false`.

	grunt.initConfig({
		log: {
			foo: [1, 2, 3],
			bar: 'hello world',
			baz: false
		}
	});

	grunt.task.registerMultiTask('log', 'Log stuff.', function() {
		grunt.log.writeln(this.target + ': ' + this.data);
	});
可以查看[创建任务](http://gruntjs.com/creating-tasks)文档了解更多多任务的例子.

*这个方法也可作为[grunt.registerMultiTask](http://gruntjs.com/grunt)*.

###grunt.task.renameTask ☃

重命名一个任务. 如果你想覆盖任务的默认行为这可能是有用的, 同时保留了旧名称.

*注意, 如果一个任务被重命名, [this.name](http://gruntjs.com/inside-tasks#this.name)和[this.nameArgs](http://gruntjs.com/inside-tasks#this.nameargs)属性也会相应的改变*.
	
	grunt.task.renameTask(oldname, newname)

*这个方法也可作为[grunt.renameTask](http://gruntjs.com/grunt)*.

##加载外部定义的任务

对于大多数的项目, 任务都会定义在[Gruntfile](http://gruntjs.com/getting-started). 对于大型项目, 或者在任务需要的情况下跨项目共享, 任务可以从一个活多个外部目录中或者npm安装的Grunt插件中载入.

###grunt.task.loadTasks ☃

从指定的目录载入任务相关的文件, 相对于[Gruntfile](http://gruntjs.com/getting-started)所在目录. 这个方法可以用于从一个本地的Grunt插件载入任务相关文件, 通过指定插件的"任务"子目录路径.

	grunt.task.loadTasks(tasksPath)

*这个方法也可作为[http://gruntjs.com/grunt]*.

###grunt.task.loadNpmTasks ☃

从指定的Grunt插件加载任务.这个插件必须通过npm安装在本地, 并且必须相对于[Gruntfile](http://gruntjs.com/getting-started)所在目录. Grunt插件可以通过使用[grunt-init Grunt插件模板](https://github.com/gruntjs/grunt-init)创建: `grunt.init:gruntplugin`.

	grunt.task.loadNpmTasks(pluginName)

*这个方法可作为[grunt.loadNpmTasks](http://gruntjs.com/grunt)*.

##队列任务

Grunt会自动排列和运行所有命令行指定的任务, 但是个别任务可以执行其他任务来排入队列.

###grunt.task.run

排入队列里的一个或多个任务. 每个在`takList`中指定的任务在当前任务完成之后将立即执行, 按照指定的顺序执行. 任务列表可以是一个任务数组或者单个的任务参数.

	grunt.task.run(taskList)

###grunt.task.clearQueue

清空队列里完成的任务. 除非额外的任务排入队列, 将没有更多的任务运行.

	grunt.task.clearQueue()

###grunt.task.normalizeMultiTaskFiles

标准话一个任务目标配置对象到src-dest文件映射数组中. 这个方法通过[this.files/grunt.task.current.files](http://gruntjs.com/grunt.task#wiki-this-files)属性用于多任务系统内部.

	grunt.task.normalizeMultiTaskFiles(data [, targetname])