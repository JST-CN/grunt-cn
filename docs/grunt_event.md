# grunt.event

尽管在这个页面中只是列出了大多数重要的方法，但是完整的[EventEmitter2 API](https://github.com/hij1nx/EventEmitter2)在`grunt.event`对象中都是有效的。Event命名空间可以使用`.`(点)操作符指定，还可以启用命名空间通配符。

*注意grunt并不允许你公开发布任何events(事件)，但是在你自己的任务中仍然是有用的。*

### grunt.event.on

给指定的事件监听器数组尾部添加一个监听器。

	grunt.event.on(event, listener)
	
### grunt.event.once

给事件添加一个**一次性**监听器。这个监听器仅仅在event第一次触发时被调用，之后便会被移除。

	grunt.event.once(event, listener)
	
### grunt.event.many

添加一个在事件被移除之前会执行**n次**的监听器。

    grunt.event.many(event, timesToListen, listener);
    
### grunt.event.off

从指定的事件监听器数组中移除一个监听器。

    grunt.event.off(event, listener);
    
### grunt.event.removeAllListeners

移除所有的监听器或者它们指定的事件。

    grunt.event.removeAllListeners([event]);
    
### grunt.event.emit

按照参数列表中自定的事件顺序执行每一个事件监听器。

    grunt.event.emit(event. [arg1], [arg2], [...]);