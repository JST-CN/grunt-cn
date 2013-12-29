# 创建插件

1. 首先运行`npm install -g grunt-init`安装[grunt-init](https://github.com/gruntjs/grunt-init)(这是一个Grunt插件构建模块)；
2. 运行`git clone git://github.com/gruntjs/grunt-init-gruntplugin.git ~/.grunt-init/gruntplugin`安装grunt插件模板；
3. 在一个空目录运行`grunt-init gruntplugin`(这样就会将该目录初始化为Grunt插件构建目录，构建插件的文件最终存储在这个目录中，`grunt-init`会自动生成相关配置文件)；
4. 运行`npm install`准备开发环境(自动安装插件构建所需的依赖)；
5. 编写你的插件(插件开发)；
6. 运行`npm publish`发布你的Grunt插件到npm(发布插件)；

## 注意

### 给你的任务命名

'grunt-contrib'命名空间是保留给Grunt团队[官方]维护的任务，请适当的给你的任务命名以避免命名冲突。

### 调试

默认情况下Grunt隐藏了错误堆栈跟踪信息，但是可以用`--stack`选项启用它以方便任务调试。 如果你希望Grunt始终都记录错误堆栈跟踪信息， 那么你就需要在你的shell中创建一个别名。 比如，在bash中你可以通过`alias grunt="grunt ---stack"`命令做到。

### 存储任务文件

只在项目根目录的.grunt/[npm-module-name]目录中存储数据，并且在适当的时候清除它。对于临时文件这并不是一个好的解决方案，在这种情况下可以使用常用的npm模块(如:[temporary](https://npmjs.org/package/temporary)，[tmp](https://npmjs.org/package/tmp))来充分利用操作系统级的临时目录。

### 避免改变当前工作目录：`process.cwd()`

默认情况下，当前工作目录被设置为包含Gruntfile的目录。用户可以在它们的Gruntfile中使用`grunt.file.setBase`去改变它(改变当前工作目录)，但是插件应该当心点不要去改变它。

`path.resolve('foo')`可以用于获取相对于`Gruntfile`所在目录的`foo`文件路径的绝对路径。

