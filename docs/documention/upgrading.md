#Upgrading from 0.3 to 0.4
#从0.3升级到0.4

注意即使你经常使用grunt，新的Getting start指南都是有阅读价值的。

Grunt现在被分割为三部分：`grunt`, `grunt-li`和`grunt-init`。

1.  npm的`grunt`模块应该安装在你本地的项目中。它包含代码和运行任务的逻辑，插件加载等等。
2.  npm的`grunt-cli`模块应该被安装在全局环境中。它会把`grunt`命令推送到你的路径中，因此你可以在任何位置执行它。对于它自己而言，它什么事都不做：它的工作就是加载和运行被安装到你本地项目中的Grunt，不管是什么版本。更多关于为什么这个被改变了，请阅读: npm 1.0:Global vc Local installation。
3.  `init`任务会在自身的npm模块中中断，`grunt-init`。它可能是使用`npm install -g gruntp-init`安装在全局环境中的，并使用`grunt-init`命令运行。在接下来的几个月中，Yeoman将完整的替换grunt-init。查看grunt-init project page有更多的信息。

##已存在的任务和插件

所有的`grunt-contrib-*`系列的插件都是Grunt0.4才有的。