# grunt.fail

针对一些事情发生错误.

查看[fail lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/fail.js)了解更多信息.

## The fail API

如果任务内部一些事情出错(即将出错), 它可以强制终止Grunt运行. 在[出口代码文档](http://gruntjs.com/exit-codes)中可以查看grunt内置的出口代码列表.

注意`grunt`对象上任何使用☃(unicode雪人)标记的方法也是直接有效的. 你知道就行. 查看[API主页](http://gruntjs.com/grunt)可以了解更多的使用信息.

### grunt.warn ☃

显示警告并立即终止grunt.  如果执行`--force`命令行选项Grunt会继续处理任务文件. `error`参数可以时一个字符串信息或者一错误对象.

    grunt.fail.warn(error [, errorcode]);
    
如果在命令行指定了`--debug 9`并指定了一个错误对象, 将记录一个堆栈跟踪.

*这个方法如同`grunt.warn`一样有效*

### grunt.fatal ☃

显示警告并立即终止Grunt. `error`参数可以是一个字符串信息或者一个错误对象.

    grunt.fail.fatal(error [, errorcode]);
    
如果在命令行指定了`--debug 9`并指定了一个错误对象, 将记录一个堆栈跟踪.

发出一个致命的警报, 除非指定`--no-color`选项.

*这个方法如同`grunt.fatal`一样有效*