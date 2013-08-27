# grunt.task

注册，运行以及加载外部任务。

查看[task lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/task.js)和[task util lib source](https://github.com/gruntjs/grunt/blob/master/lib/util/task.js)可以了解更多详细信息。

## The task API

当一个任务运行时，Grunt通过任务函数内部的`this`对象将任务内部的大部分任务特定的实用属性和方法暴露在任务外面。可以在[内置任务](http://gruntjs.com/inside-tasks/)指南中查看它们属性和方法列表。

许多实用的属性和方法通过任务内部`this`对象来访问都是有效的。

注意，任何使用☃(unicode雪人)标记的方法在任务内部直接通过`grunt`对象来访问都是有效的。现在你只需要知道就可以了。可以查看[API主页](http://gruntjs.com/grunt)了解更多详细的用法信息。

## 创建任务

### grunt.task.registerTask ☃

这个方法用于注册一个"别名任务"或者一个任务函数。这个方法支持下面两种签名方式：

#### 别名任务

如果指定了一个任务列表，新的任务[任务列表之前的任务名]就是一个或者其他多个任务的别名。每当这个"别名任务"运行时，每个指定在`tasklist`中指定任务都会按照它们所指定的顺序一次运行。`tasklist`参数必须是一个任务数组。

	grunt.task.registerTask(taskName, taskList)

这里有一个别名任务的例子，我定义了一个"default"任务，这个"default"任务包含"jshint"，"qunit"，"concat"和"uglify"这几个不同的任务，执行Grunt(在命令行运行`grunt`)而不指定任何特定的任务时这些任务列表中的任务都会按照指定的顺序自动执行。

	task.registerTask("default", ["jshint", "qunit", "concat", "uglify"])

也可以给任务指定任务参数。这里有一个例子，我们定义了一个会执行"concat"和"uglify"这两个任务的别名任务"dist"，并且它们都都带有一个名为"dist"参数：

	task.registerTask("dist", ["concat:dist", "uglify:dist"])

#### 任务函数

如果传递一个`description`和1taskFunction`，每当任务运行时对应的指定的函数都会执行。此外, 当运行`grunt --help`时，指定的描述(description参数)也会显示出来。任务特性的属性和方法在任务内部作为`this`对象的属性使用也是有效的。任务函数可以返回一个`false`来表示任务失败。

注意`grunt.task.registerMultiTask`方法，可以用于定义一个特殊类型的任务，也就是我们所说的"多任务"，具体的信息后面再解释。

	grunt.task.registerTask(taskName, description, taskFunction)

这里有一个例子，如果通过`grunt foo:testing:123`命令来运行Grunt，这个任务就会输出`foo, testing 123`。如果运行这个任务时不传递参数，如`grunt foo`，这个任务就会输出`foo, no args`。

	grunt.task.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2) {
		  if (arguments.length === 0) {
				grunt.log.writeln(this.name + ", no args");
		  } else {
				grunt.log.writeln(this.name + ", " + arg1 + " " + arg2);
		  }
	});

可以查看[创建任务](http://gruntjs.com/creating-tasks)文档中更多的任务和别名任务的例子。

*这个方法也可作为[grunt.registerTask](http://gruntjs.com/grunt)来使用。*

### grunt.task.registerMultiTask ☃

注册一个"多任务"。一个多任务就是一个会隐式的遍历其命名子属性的任务(AKA目标)，在没有指定目标的情况下。除了默认的属性和方法之外，使用任务内部的`this`对象访问多任务特定的属性也是有效的。

许多contrib(官方维护的任务)任务，包括[jshint任务](https://github.com/gruntjs/grunt-contrib-jshint)，[concat任务](https://github.com/gruntjs/grunt-contrib-concat)和[uglify任务](https://github.com/gruntjs/grunt-contrib-uglify)都是多任务形式的。

	grunt.task.registerMultiTask(taskName, description, taskFunction)

基于一个给定的配置，这里有一个多任务例子,当通过`grunt log:foo`命令运行Grunt时输出`foo: 1,23`，或者通过`grunt log:bar`命令运行Grunt时输出`bar: hello world`。然而如果通过`grunt log`命令运行Grunt时，它会输出`foo: 1,2,3`，然后是`bar: hello world`，最后是`baz: false`。

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

查看[创建任务](http://gruntjs.com/creating-tasks)文档可以了解更多多任务的例子。

*这个方法也可作为[grunt.registerMultiTask](http://gruntjs.com/grunt)来使用。*

### grunt.task.renameTask ☃

这个方法用于重命名一个任务。如果你想覆盖任务的默认行为，那么对你来说这个方法可能是有用的，同时它还会保留旧的名称。

*注意，如果一个任务被重命名了，[this.name](http://gruntjs.com/inside-tasks#this.name)和[this.nameArgs](http://gruntjs.com/inside-tasks#this.nameargs)属性也会作出相应的改变。*
	
	grunt.task.renameTask(oldname, newname)

*这个方法也可作为[grunt.renameTask](http://gruntjs.com/grunt)来使用。*

## 加载外部定义的任务

对于大多数的项目而言，任务都会定义项目的在[Gruntfile](http://gruntjs.com/getting-started)文件中。对于大型项目，或者任务之间需要跨项目共享的情况下，可以从一个或多个外部目录中载入任务或者从使用Npm安装好的Grunt插件中载入。

### grunt.task.loadTasks ☃

从指定的目录载入任务相关的文件，目录必须相对于[Gruntfile](http://gruntjs.com/getting-started)所在目录。这个方法可以用于从一个本地的Grunt插件载入任务相关文件，通过指定路径为插件的"任务"子目录的方式就可以做到(即指定文件为插件子目录中任务相关的文件)。

	grunt.task.loadTasks(tasksPath)

*这个方法也可作为[grunt.loadTasks](http://gruntjs.com/grunt)来使用。*

### grunt.task.loadNpmTasks ☃

从指定的Grunt插件中加载任务。这个插件必须通过npm在本地安装好了，并且必须是相对于[Gruntfile](http://gruntjs.com/getting-started)所在目录的。Grunt插件可以通过使用[grunt-init Grunt插件模板](https://github.com/gruntjs/grunt-init)来创建：`grunt.init:gruntplugin`。

	grunt.task.loadNpmTasks(pluginName)

*这个方法可作为[grunt.loadNpmTasks](http://gruntjs.com/grunt)来使用。*

## 队列任务

Grunt会自动排列和运行所有在命令行中指定的任务，也有个别任务可以向队列中插入需要额外执行的任务。

### grunt.task.run

排入队列里的一个或多个任务。每个指定在`takList`中的任务都会在当前任务执行完成之后立即执行，并且是按照它们所指定的顺序来执行。任务列表参数可以是一个任务数组或者也可以是单个的任务。

	grunt.task.run(taskList)

### grunt.task.clearQueue

彻底清空任务队列。除非额外的任务排入队列中，否则就不会执行其他任务了。

	grunt.task.clearQueue()

### grunt.task.normalizeMultiTaskFiles

标准化一个任务目标配置对象为一个`src-dest`文件映射数组。通常这个方法通过[this.files/grunt.task.current.files](http://gruntjs.com/grunt.task#wiki-this-files)属性在多任务系统内部使用。

	grunt.task.normalizeMultiTaskFiles(data [, targetname])