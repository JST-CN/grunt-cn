#grunt.event

尽管在这个页面中仅仅列出了大多数相干的方法，但是完整的[EventEmitter2 API](https://github.com/hij1nx/EventEmitter2)在`grunt.event`对象中都是有效的。Event命名空间可以使用`.`(点)操作符指定，并且通配符也是可用的。

注意grunt并不允许发布任意事件，但是在你自己的任务中任然是有效的。

###grunt.event.on

将指定的even监听器添加早listenters数组的后面

	grunt.event.on(event, listener)
	
###grunt.event.once

给event添加一个**一次性**监听器。这个监听器仅仅在event第一次触发时被调用，之后便被移除。

	grunt.event.once(event, listener)
	
###grunt.event.many