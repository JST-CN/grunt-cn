# 任务内幕

> inside 有『内幕，内情，内部秘密之意，因而本节译作内幕』。

当一个任务运行时，Grunt通过`this`对象暴露出很多在任务函数内部的任务特有的实用属性和方法。这个对象也可以暴露为`grunt.task.current`在[templates](http://gruntjs.com/grunt.template)中使用。例如，`this.name`属性也可以写为`grunt.task.current.name`。

## 所有任务内部都可以使用的方法/属性

### this.async

如果一个任务是异步的，这个方法必须被调用来通知Grunt等待执行的信号。它会返回一个"done"函数作为回调句柄，“done”函数将在这个任务完成时被调用。可以传递`false`或者`Error`类的对象给这个"done"函数来通知Grunt当前任务失败了。

如果没有调用`this.async`方法，那么任务就会以同步方式执行。

	// 下面这行代码用于通知Grunt这是一个异步任务
	var done = this.async();
	// 下面是你的异步代码
	setTimeout(function(){
		// 这里我们模拟一个可能会产生的错误
		var success = Math.random() > 0.5;
		// 所有准备工作做好之后调用done函数
		done(success);
	}, 1000);

### this.requires

如果一个任务依赖于另外一个(或一些)任务的成功执行，在其依赖的任务没有运行或者运行失败的情况下，这个方法可以被用来强制Grunt退出。作为这个方法的参数，其依赖的任务列表可以是一个包含多个任务名称的数组，也可以是单个的任务名称。

注意，实际上这个方法并不会运行指定任务列表中的任务，它只是在任务列表中的任务没有成功运行的时候通知系统当前的任务失败了。

	this.requires(taskList);

### this.requiresConfig

这个方法可以指定一个或者多个字符串或者数组的配置属性为必需的。如果一个或多个必需的[配置](http://gruntjs.com/grunt.config)属性缺失，就通知系统当前任务失败。

	this.requiresConfig(prop [, prop [, ...]]);

查看[grunt.config文档](http://gruntjs.com/grunt.config)了解更多关于配置属性相关的信息。

*这个方式是[grunt.config.requires](http://gruntjs.com/grunt.config#grunt.config.requires)方法的一个别名。*

### this.name

当前任务的名称，和定义在`grunt.registerTask`中的任务名一致。例如，如果以`grunt sample`或者`grunt sample:foo`的方式运行一个名为"sample"的任务，那么在这个任务函数内部，`this.name`的值就是`"sample"`。

*注意，如果一个任务使用[grunt.task.renameTask](http://gruntjs.com/grunt.task#grunt.task.renametask)方法重命名过，那么这个属性就会指向对应的新名称。*

### this.nameArgs

当前任务的名称，包括在命令行中指定的任意使用逗号分割的参数或者标记。例如，如果以`grunt sample:foo`的方式运行一个名为"sample"的任务，那么在这个任务函数内部，`this.nameArgs`的值就是`"sample:foo"`。

*注意，如果一个任务使用[grunt.task.renameTask](http://gruntjs.com/grunt.task#grunt.task.renametask)方法重命名过，那么这个属性也会指向对应的新名称。*

### this.args

传递给当前任务的参数数组。例如，以`grunt sample:foo:bar`的方式运行一个名为"sample"的任务，那么在这个任务函数内部，`this.args`的值就是`["foo", "bar"]`。

*注意，在多任务形式中，当前目标(名)会从`this.args`数组中省略。*

### this.flags

根据传递给当前任务的参数生成的一个对象。例如，以`grunt sample:foo:bar`的形式运行一个名为"sample"的任务，那么在这个任务函数内部，`this.flags`的值是`{foo: true, bar: true}`。

*注意，在多任务形式中，任务目标名不会被设置为一个标记。*

### this.errorCount

当前任务执行期间[grunt.log.error](http://gruntjs.com/grunt.log#grunt.log.error)方法被调用的次数。如果在任务运行期间有错误信息输出，它可以用来让任务执行失败。

### this.options

返回一个options对象。`defaultsObj`是一个可选参数，它的属性会被任意的任务级`options`对象的属性覆盖；在多任务形式中，它的属性会进一步被目标级的`options`对象的属性覆盖。

	this.options([defaultsObj]);

> PS：这里有点绕口，以JS代码为例做个简单的解释：

	var task = {
		options : {
			// 这里是任务级的配置
		},
		targetA: {
			options : {
				// 这里可以使用任务目标级的配置来覆盖任务级的配置
			}
		}
	}

下面给出了一个例子，展示了在任务中可以如何使用`this.options`方法：

	var options = this.options({
		enabled: false
	});

	doSomething(options.enabled);

在[配置任务](http://gruntjs.com/configuring-tasks#options)指南中，有一个例子展示了如何从用户任务的角度来指定options。

## 多任务形式内部可用的方法/属性

### this.target

在一个多任务形式中，这个属性包含了当前正被遍历的目标的名称。例如，如果一个名为"sample"的多任务带有`{sample: {foo: "bar"}}`这样的配置数据，当以`grunt sample:foo`的形式运行这个任务时，那么在这个任务函数内部，`this.target`属性的值就为`"foo"`。

### this.files

在一个多任务形式中，使用Grunt支持的[文件格式和选项](http://gruntjs.com/configuring-tasks#files)，[通配符模式](http://gruntjs.com/configuring-tasks#globbing-patterns)或者[动态映射](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically)方式指定的文件，都会被自动标准化为一个唯一的格式：即[文件数组格式](http://gruntjs.com/configuring-tasks#files-array-format)。

这意味着，任务不需要为了明确的处理自定义文件格式，通配符格式，源文件到目标文件映射或者过滤输出文件或者目录而包含大量模板。任务用户只需要根据[配置任务](http://gruntjs.com/configuring-tasks#files)指南中的说明指定文件，*Grunt会自动处理所有任务细节*。

`this.files`属性永远都是一个数组。你的任务应该利用数组中每个对象的`src`和`dest`属性遍历`this.files`数组。在你的任务关注每个目标文件的多个源文件的情况下，`src`属性也永远是一个数组。

*注意，`src`属性的值中可能会包含不存在的源文件，所以在你使用这些文件之前最好明确的检测一下它们是否存在。*

下面的例子展示了一个简单的"concat"任务是怎样使用`this.files`属性的：

	this.files.forEach(function(file) {
		var contents = file.src.filter(function(filepath) {
		// Remove nonexistent files (it's up to you to filter or warn here).
			if (!grunt.file.exists(filepath)) {
	      		grunt.log.warn('Source file "' + filepath + '" not found.');
	      		return false;
	    	} else {
	      		return true;
	    	}
	  	}).map(function(filepath) {
	    	// Read and return the file's source.
	    	return grunt.file.read(filepath);
	  	}).join('\n');
		// Write joined contents to destination filepath.
		grunt.file.write(file.dest, contents);
		// Print a success message.
		grunt.log.writeln('File "' + file.dest + '" created.');
	});

*如果你还需要使用原始文件对象的属性，可以通过每个单独的文件对象的`orig`属性来获取并使用，但是目前都没发现有访问原始属性的用例。*

### this.filesSrc

在多任务形式中，在`src`中通过任意的[文件格式](http://gruntjs.com/configuring-tasks#files)指定的文件都会被归并到一个数组。如果你的任务是"只读"的并且无需关心目标文件路径，可以使用这个数组来替代`this.files`。

下面这个例子展示了一个简单的"lint"的任务是怎样使用`this.filesSrc`属性的：

	// Lint specified files
	var files = this.filesSrc;
	var errorCount = 0;
	files.forEach(function(filepath) {
		if (!lint(grunt.file.read(filepath))) {
			errorCount++;
		}
	});

	// Fail task if errors were logged.
	if (errorCount > 0) { return false; }

	// Otherwise, print a success message.
	grunt.log.ok('Files lint free: ' + files.length);

### this.data

在多任务形式中，这是存储在给定目标的Grunt配置对象中的实际数据。例如，如果一个名为"sample"的多任务带有`{sample: {foo: "bar"}}`这样的配置数据，当以`grunt sample:foo`的形式运行这个任务时，那么在这个任务函数内部，`this.data`的值就为`"bar"`。

*推荐使用`this.options`，`this.files`和`this.filesSrc`来替代`this.data`, 因为它们的值都是经过标准化的。*
