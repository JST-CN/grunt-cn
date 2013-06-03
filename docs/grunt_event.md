#grunt.event

尽管在这个页面中仅仅列出了大多数相关的方法，但是完整的[EventEmitter2 API](https://github.com/hij1nx/EventEmitter2)在`grunt.event`对象中都是有效的。Event命名空间可以使用`.`(点)操作符指定，并且已经启用了命名空间通配符。

*注意grunt并不允许发布任何events，但是在你自己的任务中任然是有用的。*

###grunt.event.on

在指定的event监听器数组尾部添加一个监听器.

	grunt.event.on(event, listener)
	
###grunt.event.once

给event添加一个**一次性**监听器。这个监听器仅仅在event第一次触发时被调用，之后便被移除。

	grunt.event.once(event, listener)
	
###grunt.event.many

添加一个在event被移除之前会执行**n次**的监听器.

    grunt.event.many(event, timesToListen, listener);
    
###grunt.event.off

从指定的event监听器数组中移除一个监听器.

    grunt.event.off(event, listener);
    
###grunt.event.removeAllListeners

移除所有的监听器或者它们指定的event

    grunt.event.removeAllListeners([event]);
    
###grunt.event.emit

执行每一个监听器, 可能按照指定event参数列表指定的顺序进行监听.

    grunt.event.emit(event. [arg1], [arg2], [...]);