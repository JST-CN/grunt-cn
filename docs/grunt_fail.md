# grunt.fail

用户发生致命错误时执行某些行为。

查看[fail lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/fail.js)可以了解更多详细信息。

## The fail API

如果任务内部已经崩溃(或者即将崩溃)，这个API可以用于强制终止Grunt运行。在[出口代码](http://gruntjs.com/exit-codes)中可以查看内置的完整的Grunt出口代码列表。

注意任何使用☃(unicode雪人)标记的方法都可以在`grunt`对象上直接调用。这里你只需要知道就行了，可以查看[API主页](http://gruntjs.com/grunt)可以了解更多用法相关的信息。

### grunt.warn ☃

显示警告信息，同时立即终止Grunt运行。如果指定了命令行选项`--force`，Grunt会继续处理任务文件。`error`参数可以是一个字符串信息或者一错误对象。

    grunt.fail.warn(error [, errorcode]);
    
如果在命令行指定了`--debug 9`，同时还指定了一个错误对象，它会输出一个堆栈跟踪信息。

*这个方法也可以作为`grunt.warn`来使用。*

### grunt.fatal ☃

显示警告信息，同时立即终止Grunt运行。`error`参数也可以是一个字符串信息或者一个错误对象。

    grunt.fail.fatal(error [, errorcode]);
    
如果在命令行指定了`--debug 9`，还指定了一个错误对象，它会输出一个堆栈跟踪信息。

发生致命错误时会发出一个警报信息，除非指定`--no-color`选项.

*这个方法还可以作为`grunt.fatal`使用。*