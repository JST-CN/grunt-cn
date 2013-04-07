#Creating plugins

1.  使用`npm install -g grunt-init`安装grunt-init
2.  使用`git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin`安装grunt插件模板
3.  在一个空目录中运行`grunt-init gruntplugin`
4.  运行`npm install`去准备开发环境
5.  创作你的插件
6.  运行`npm publish`发布你的grunt插件到npm

##注意

###给你的任务命名

"grunt-contrib"命名空间是grunt团队保留的维护任务，请适当的命名你的任务以避免命名合并。

###调试

Grunt默认时隐藏错误的信息痕迹的，但是它可以使用`--stack`选项简单的启用任务调试。如果你始终希望grunt在发生错误时记录信息痕迹，在你的shell命令中创建一个别名。例如: 你可以粗暴的处理`alias grunt='grunt --stack`。

###存储任务文件

仅仅在项目的根目录存储一个.grunt/[npm-module-name]目录，以后在适当的时候你可以清除它。对于临时凑合的文件这并不是一个解决方案，使用一个公共的npm模块(temporary, tmp)可以获取这个项目中优秀的系统级的临时目录。

###避免改变当前工作目录:`process.cwd()`

默认情况下，当前工作目录所在目录都会包含gruntfile。用户可以在他们的gruntfile中使用`grunt.file.setBase`去改变它，但是要注意别改变插件。`path.resolve('foo')`可以被用来获取'foo'文件路径相对与gruntfile的绝对路径。