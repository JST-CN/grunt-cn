#贡献

这里有一些Grunt项目

+  [grunt](https://github.com/gruntjs/grunt) - Grunt主项目
+  [grunt-init](https://github.com/gruntjs/grunt-init) - 独立的grunt项目脚手架工具
+  [gruntjs.com](https://github.com/gruntjs/gruntjs.com) - gruntjs官方网站
+  [grunt-contrib collection](https://github.com/gruntjs/grunt-contrib) - Grunt'contrib'插件集合

此外，每个单独的grunt-contrib插件都是一个独立的仓库被列在[gruntjs](https://github.com/gruntjs)主页上。

##问题反馈

如果有些事情不是像你想象的那样工作的，请阅读[文档](https://github.com/gruntjs/grunt/wiki)，尤其是[入门](http://gruntjs.com/getting-started/)指南。如果你想和别人聊聊grunt，请加入到grunt社区[IRC](http://gruntjs.com/contributing#discussing-grunt)并提出你的问题。

如果你有一些问题并没有在这个文档中涵盖或者希望申报一个bug，解决它最好的方式是查看文件路径并适当的跟踪问题。

+  **如果有一些grut, grunt-init, grunt-lib-???模块的问题，或者具体的grunt-contrib-???插件的问题**
+  +  请在项目问题跟踪站点提交问题文件。
+  **如果你愿意贡献一个新的插件。**
+  +  请提交问题文件到[grunt-contrib问题跟踪集合](https://github.com/gruntjs/grunt-contrib/issues)站点中。我们不接受所有的插件，但我们会考虑你的意见。
+  **如果发现[官方网站](http://gruntjs.com/)有问题**
+  +  请提交到[Grunt官网问题跟踪集合](https://github.com/gruntjs/gruntjs.com/issues)站点中。
+  **如果遇到以上描述之外的问题**
+  +  请提交问题文件到[grunt问题跟踪](https://github.com/gruntjs/grunt/issues)站点中并让我们知道你为什么提交它。

###简化问题

尽量[减少你的代码](http://www.webkit.org/quality/reduction.html)保证最低限度的重现问题。这使得它更容易(及早)避免或解决问题。

###解释问题

如果我们不能重现问题，我们就不能解决它。请列出重现该问题的步骤，包括你的系统版本，Node.js版本，grunt版本等等。包括相关的日志或示例代码。

##Grunt讨论

加入[freenode](http://freenode.net/) IRC的#grunt频道。我们有一个机器人和所有信息。

*请不要发私人的信息*。

##修改grunt

首先，确保你安装了最新版本的[Node.js](http://nodejs.org/)和[npm](http://npmjs.org/)。

1.  确保安装了grunt-cli(查看[入门](http://gruntjs.com/getting-started/)指南获取更多信息)。
2.  Fork和clone仓库。
3.  检出master分支(多数的grunt/grunt-contrib开发都发生在这里)。
4.  运行`npm install`安装所有的Grunt依赖。
5.  运行`grunt`来构建Grunt。

假设你没有看到红色的部分，那说明你准备好了。在所有更改完成之后运行`grunt`，以确保不会被中断。

###提交pull requests

1.  创建一个新的分支，请不要直接在`master`上工作。
2.  给你想要的改变添加失败测试，运行`grunt`查看失败测试。
3.  解决问题。
4.  如果运行`grunt`通过测试，请重复2-4次直到它完成工作。
5.  更新文档以反应任何改变。
6.  推送到你的分支并提交pull request。

###语法

+  使用两个空格缩进而不要在任何位置使用tab键。如果字符传中需要一个tab字符则使用`\t`。
+  不要使用多余的空格，除了在markdown文件必须使用它来强制换行。
+  不要极端的使用空格。
+  不要[每一个变量](http://benalman.com/news/2012/05/multiple-var-statements-javascript/)都使用`var`语句赋值。
+  使用单引号`'`分割字符串而不是双引号`"`。
+  提出`if`和`else`语句，使用[灵活](http://programmers.stackexchange.com/a/25281)的`? :`控制流程或者`||`,`&&`逻辑运算符。
+  注释是很强大的。应该将他们放在代码的*前面*，而*不是*代码的*后面*。
+  **如果还有疑问，请在你的源代码中遵循上面你看到的规则**