#创建插件

1. 运行`npm install -g grunt-init`安装[grunt-init](https://github.com/gruntjs/grunt-init)
2. 运行`git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin`安装grunt插件模板
3. 在一个空目录运行`grunt-init gruntplugin`
4. 运行`npm install`准备开发环境
5. 编写你的插件
6. 运行`npm publish`发布你的Grunt插件到npm

##注意

###给你的任务命名

'grunt-contrib'命名空间是保留给Grunt团队维护的任务, 请适当的给你的任务命名以避免命名冲突.

###调试

Grunt在默认情况下隐藏了错误堆栈信息, 但是它们可以使用`--stack`选项很方便的启用任务调试功能. 如果你总是希望记录Grunt的错误堆栈信息, 那么你需要在你的shell中创建一个别名. 比如, 在bash中你可以这样做`alias grunt="grunt ---stack"`.

###存储任务文件

只能在项目根目录中的.grunt/[npm-module-name]目录中存储数据, 并且在适当的时候你可以清除它. 对于临时文件这并不是一个好的解决方案, 在这种情况下可以使用一个常用的npm模块(如:temporary, tmp)来启用操作系统的临时目录.

###避免改变当前工作目录: `process.cwd()`

默认情况下, 当前工作目录被设置为包含Gruntfile的目录. 用户可以在它们的Gruntfile中使用`grunt.file.setBase`去改变它(改变当前工作目录), 但是要注意不要改变插件.

`path.resolve('foo')`可以被用来获取foo相对于Gruntfile所在目录的绝对路径.

