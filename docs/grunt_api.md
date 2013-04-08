#Grunt API

//grunt---------------------

##grunt

Grunt的所有方法和属性都通过传递到你的Gruntfile, Grunt插件或者任务文件的`module.exports`入口函数中而暴露在`grunt`对象中。

下面几乎所有的方法都是在别处定义的，但是能够很方面的提供给`grunt`对象。查看这个独特的API文档可以获取更详细的说明和例子。

###Config

####grunt.initConfig

这个方法是grunt.config.init方法的别名。

###Creating Tasks

####grunt.registerTask

这个方法是grunt.task.registerTask方法的别名。

####grunt.registerMultiTask

这个方法是grunt.task.registerMultiTask方法的别名。

####grunt.renameTask

这个方法时grunt.task.renameTask方法的别名。

###装载外部定义的任务

####grunt.loadTasks

这个方法是grunt.task.loadTasks方法的别名。

####grunt.loadNpmTasks

这个方法是grunt.task.loadNpmTasks方法的别名。

###警告和致命错误

####grunt.warn

这个方法是grunt.fail.warn方法的别名。

####grunt.fatal

这个方法是grunt.fail.fatal方法的别名。

###命令行选项

####grunt.option

检索命令行选项的值，例如`debug`。注意对于每个命令行选项，他都有相反的测试，例如`no-debug`。

	grunt.options(optionName)
	
###Miscellaneous

####grunt.package

当前grunt的`package.json`元数据，如同一个对象。

	grunt.package
	
####grunt.version

当前grunt的版本，