#grunt.util

其他实用工具, 包括Lo-Dash, Async和Hooker.

###grunt.util.kindOf

返回一个值的"种类". 好比`typeof`返回内部的`[Class](Class/)`值. 可能返回`"number"`, `"string"`, `"boolean"`, `"function"`, `"regexp"`, `"array"`, `"date"`, `"error"`, `"null"`, `"undefined"`以及全面的`"object"`.

	grunt.util.kindOf(value)

###grunt.util.error

返回一个新的Error实例(可以抛出)与相应的消息. 如果指定一个Error对象而不是`message`, 将放回该对象. 另外, 如果指定一个Error对象`origError`并且使用`--debug 9`选项运行Grunt, 原始的Error堆栈将被抛出.

	grunt.util.error(message [, origError])

###grunt.util.linefeed

标准化当前操作系统的换行符(Window上是`\r\n`,否则为`\n`).

###grunt.util.normalizeIf

给定一个字符串, 返回一个新字符串, 所有的换行符都被标准化为当前操作系统中的形式(Window上是`\r\n`,否则为`\n`).

	grunt.util.normalizeIf(string)

###grunt.util.recurse

递归嵌套的对象和数组, 为每个非对象值执行`callbackFunction`. 如果`continueFunction`返回`false`, 给定的对象和值将会跳过.

	grunt.util.recurse(object, callbackFunction, continueFunction)

###grunt.util.repeat

返回重复`n`次的字符串`str`

	grunt.util.repeat(n, str)

###grunt.util.pluralize

给定一个`"a/b"`形式的`str`, 如果`n`为`1`, 返回`"a"`否则返回`"b"`. 如果你不能使用'/'则你可以指定一个自定义的分隔符.

	grunt.util.pluralize(n, str, separator)

###grunt.util.spawn

生成一个子进程, 跟踪其标准输出, 标准错误和退出代码. 该方法返回一个生成的子进程的引用. 当子进程退出时, 将调用done函数.

	grunt.util.spawn(options, doneFunction)

`options`对象可能有以下属性:

	var options = {
		// The command to execute. It should be in the system path.
		cmd: commandToExecute,
		// If specified, the same grunt bin that is currently running will be
		// spawned as the child command, instead of the "cmd" option. Defaults
		// to false.
		grunt: boolean,
		// An array of arguments to pass to the command.
		args: arrayOfArguments,
		// Additional options for the Node.js child_process spawn method.
		opts: nodeSpawnOptions,
		// If this value is set and an error occurs, it will be used as the value
		// and null will be passed as the error value.
		fallback: fallbackValue
	};

done函数接收以下参数:

	function doneFunction(error, result, code) {
		// If the exit code was non-zero and a fallback wasn't specified, an Error
		// object, otherwise null.
		error
		// The result object is an object with the properties .stdout, .stderr, and
		// .code (exit code).
		result
		// When result is coerced to a string, the value is stdout if the exit code
		// was zero, the fallback if the exit code was non-zero and a fallback was
		// specified, or stderr if the exit code was non-zero and a fallback was
		// not specified.
		String(result)
		// The numeric exit code.
		code
	}

###grunt.util.toArray

给定一个数组或者一个类数组对象, 返回一个数组. 转换`arguments`对象为数组是很好的.

	grunt.util.toArray(arrayLikeObject)

###grunt.util.callbackify

标准化"返回值"和"传递结果给回调"的函数, 总是传递一个结果给指定的回调函数. 如果原始函数返回一个值, 该值将即刻传递给回调函数, 并指定为最后一个参数, 在是哟有的预定义参数之后. 如果原始函数传递一个值给回调函数, 它也会继续这样做.

	grunt.util.callbackify(syncOrAsyncFunction)

下面这个例子可能能够更好的说明:

	function add1(a, b) {
		return a + b;
	}
	function add2(a, b, callback) {
		callback(a + b);
	}

	var fn1 = grunt.util.callbackify(add1);
	var fn2 = grunt.util.callbackify(add2);

	fn1(1, 2, function(result) {
		console.log('1 plus 2 equals ' + result);
	});
	fn2(1, 2, function(result) {
		console.log('1 plus 2 equals ' + result);
	});

##内部库

###grunt.util.namespace

一个内部库用于解决对象内部深层嵌套的属性.

###grunt.util.task

一个用于运行任务内部库.

##外部库

###grunt.util._

[Lo-Dash](http://lodash.com/) - 超级有用的数组, 函数和对象实用方法. [Underscore.string] - 极其实用的字符串方法.

注意Underscore.string是混合在`grunt.util._`中的, 它也可以作为`grunt.util._.str`的方法, 但是它与现有的Lo-Dash方法冲突.

###grunt.util.async

[Async](https://github.com/caolan/async) - node和浏览器异步实用工具.

###grunt.util.hooker

[JavaScript Hooker](https://github.com/cowboy/javascript-hooker) - 进行调试和填充的小补丁[Monkey-patch](钩子).