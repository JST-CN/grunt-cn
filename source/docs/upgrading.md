#从0.3升级到0.4


注意即使你能熟练的使用grunt，新的[Getting start](http://gruntjs.com/getting-started/)指南都是值得一读。

Grunt现在被分为三部分：`grunt`, `grunt-li`和`grunt-init`。

1.  npm模块的`grunt`应该安装到你本地的项目中。它包含运行任务的代码和逻辑，插件加载等等。

2.  npm模块的`grunt-cli`应该被安装在全局环境中。它会把`grunt`命令推送到你所有的路径中，因此你可以在任何位置执行它。对于它自身而言，它不会做任何事情：它的工作就是安装到你本地的项目中加载和运行Grunt，不管是什么版本。想要了解更多关于这个改变的信息，请阅读: [npm 1.0:Global vc Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation)。

3.  `init`任务已经被分解为其自身的npm模块，`grunt-init`。它可应该使用`npm install -g gruntp-init`安装在全局环境中的，并使用`grunt-init`命令运行。在未来几个月中，[Yeoman](http://yeoman.io/)将完完全取代grunt-init。查看[grunt-init项目页面](https://github.com/gruntjs/grunt-init)有更多的信息。

##预装的任务和插件

所有的`grunt-contrib-*`系列的插件都是Grunt0.4才有的。然而，极有可能第三方给Grunt0.3编写的插件继续在Grunt0.4中工作知道它们被更新。我们也在积极的与插件作者一起确保它尽快更新。

一个致力于脱离grunt架构的Grunt即将发布，因此插件不会受到未来更新的影响。

##要求

Grunt现在需要`>=0.8.0`版本的Node.js支持。

##Gruntfile

+  "Gruntfile"已经从`grunt.js`被改变为`gruntfile.js`。
+  在你项目的`Gruntfile.coffee`gruntfile中和`*.coffe`任务文件中已经支持CoffeeScript了(自动解析为JS)。

查看"Gruntfile"部分的[入门](http://gruntjs.com/getting-started/)指南可以获取更多信息。