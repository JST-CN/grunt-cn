# grunt.util

各种实用工具，包括Lo-Dash，Async和Hooker等。

### grunt.util.kindOf

返回给定值的"类型"。就像`typeof`运算符就会返回内部的`[Class](Class/)`信息。这个方法可能会返回`"number"`，`"string"`，`"boolean"`，`"function"`，`"regexp"`，`"array"`，`"date"`，`"error"`，`"null"`，`"undefined"`和代表一切类型的`"object"`。

	grunt.util.kindOf(value)

### grunt.util.error

返回一个新的Error实例(它也可以抛出)与相应的消息。如果指定的是一个Error对象而不是`message`，会返回指定的对象。另外，如果指定一个Error对象作为`origError`参数，同时使用`--debug 9`选项运行Grunt，那么就会输出原始的Error堆栈信息。

	grunt.util.error(message [, origError])

### grunt.util.linefeed

将换行符标准化为当前操作系统使用的形式(Window上是`\r\n`，否则为`\n`)。

### grunt.util.normalizeIf

给定一个字符串，返回一个新字符串，原始字符串中所有的换行符都会被标准化为当前操作系统中使用的形式(Window上是`\r\n`，否则为`\n`)。

	grunt.util.normalizeIf(string)

### grunt.util.recurse

以递归的方式遍历嵌套的对象和数组，然后为每个非对象类型的值执行`callbackFunction`(回调函数)。如果`continueFunction`返回`false`，那么就会跳过给定的对象和值。

	grunt.util.recurse(object, callbackFunction, continueFunction)

### grunt.util.repeat

返回重复`n`次的字符串`str`。

	grunt.util.repeat(n, str)

### grunt.util.pluralize

给定一个`"a/b"`形式的`str`，如果`n`为`1`则返回`"a"`；否则返回`"b"`。如果你不能使用'/'，你还可以指定一个自定义的分隔符。

	grunt.util.pluralize(n, str, separator)

### grunt.util.spawn

生成一个子进程，跟踪它的stdout(标准输出)，stderr(标准错误)和退出码代。这个方法会返回所生成的子进程的引用。当子进程退出时，就会调用done函数。

	grunt.util.spawn(options, doneFunction)

`options`对象可以指定下面这些属性：

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

done函数可以接收以下参数：

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

### grunt.util.toArray

给定一个数组或者一个类数组对象，然后返回一个(新)数组。将`arguments`对象转换为数组是非常有用的。

	grunt.util.toArray(arrayLikeObject)

### grunt.util.callbackify

标准化"返回值"和"传递结果给回调"的函数，并且总是传递一个结果给指定的回调函数。如果原始函数返回一个值，那么这个返回值会立即传递给回调函数，同时指定为回调函数的最后一个参数，在所有预定义的参数之后。如果原始函数给回调函数传递一个值，它也会这么做。

	grunt.util.callbackify(syncOrAsyncFunction)

下面这个例子也许能够更好的说明这个问题：

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

## 内部库

### grunt.util.namespace

一个用于解析对象内部深度嵌套的属性的内部库。

### grunt.util.task

一个用于运行任务内部库。

## 外部库

### grunt.util._

[Lo-Dash](http://lodash.com/) - 它带有很多超级有用的处理数组、函数和对象的实用方法。[Underscore.string] - 它就包含了很多字符串处理的实用方法。

注意Underscore.string已经混合到`grunt.util._`中了，它也可以以`grunt.util._.str`的形式调用这个方法，但是这样做它就会与现有的Lo-Dash方法冲突。

### grunt.util.async

[Async](https://github.com/caolan/async) - 用于Node.js和浏览器异步操作的实用工具。

### grunt.util.hooker

[JavaScript Hooker](https://github.com/cowboy/javascript-hooker) - 用于调试和作其他补充的补丁[Monkey-patch](钩子)函数。