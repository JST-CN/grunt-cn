#grunt

Grunt的所有方法和属性都通过传递到你的[Gruntfile](http://gruntjs.com/getting-started)中Grunt插件或者[任务文件](http://gruntjs.com/creating-tasks)的`module.exports`入口函数中而暴露在`grunt`对象中。

下面几乎所有的方法都是在别处定义的，但是能够很方面的提供给`grunt`对象。详细的解释和例子请参阅独立的API文档部分。

###Config

####grunt.initConfig

这个方法是[grunt.config.init](http://gruntjs.com/api/grunt.config#grunt.config.init)方法的别名。

###创建任务

####grunt.registerTask

这个方法是[grunt.task.registerTask](http://gruntjs.com/api/grunt.task#grunt.task.registertask)方法的别名。

####grunt.registerMultiTask

这个方法是[grunt.task.registerMultiTask](http://gruntjs.com/api/grunt.task#grunt.task.registermultitask)方法的别名。

####grunt.renameTask

这个方法时[grunt.task.renameTask](http://gruntjs.com/api/grunt.task#grunt.task.renametask)方法的别名。

###装载外部定义的任务

####grunt.loadTasks

这个方法是[grunt.task.loadTasks](http://gruntjs.com/grunt.task#grunt.task.loadtasks)方法的别名。

####grunt.loadNpmTasks

这个方法是[grunt.task.loadNpmTasks](http://gruntjs.com/grunt.task#grunt.task.loadnpmtasks)方法的别名。

###警告和致命错误

####grunt.warn

这个方法是[grunt.fail.warn](http://gruntjs.com/grunt.fail#grunt.fail.warn)方法的别名。

####grunt.fatal

这个方法是[grunt.fail.fatal](http://gruntjs.com/grunt.fail#grunt.fail.fatal)方法的别名。

###命令行选项

####grunt.option

检索命令行选项的值，例如`debug`。注意对于每个命令行选项，都有相反的测试，例如`no-debug`。

	grunt.options(optionName)
	
###杂项(Miscellaneous)

####grunt.package

当前grunt的`package.json`元数据，一个对象。

	grunt.package
	
####grunt.version

当前grunt的版本，一个字符串。这仅仅是`grunt.package.version`属性的缩写。
