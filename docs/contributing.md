# 贡献

这里有一些Grunt项目

+  [grunt](https://github.com/gruntjs/grunt) - Grunt主项目
+  [grunt-init](https://github.com/gruntjs/grunt-init) - 独立的grunt项目脚手架工具
+  [gruntjs.com](https://github.com/gruntjs/gruntjs.com) - gruntjs官方网站
+  [grunt-contrib collection](https://github.com/gruntjs/grunt-contrib) - Grunt'contrib'插件集合

此外，每个单独的grunt-contrib插件都有一个独立的仓库，并且已经列在[gruntjs](https://github.com/gruntjs)主页上了。

## 问题反馈

如果有些事情不是像你想象的那样工作的，请阅读[文档](https://github.com/gruntjs/grunt/wiki)，尤其是[新手入门](http://gruntjs.com/getting-started/)指南。如果你想和别人聊聊grunt，请加入到grunt社区[IRC](http://gruntjs.com/contributing#discussing-grunt)并提出你的问题。

如果你有一些问题并没有在这个文档中涵盖或者希望申报一个bug，适当的跟踪有问题的文件是确保问题得以解决的最好的方式。

+  **如果有一些grut, grunt-init, grunt-lib-???模块的问题，或者是特定的grunt-contrib-???插件相关的的问题**
+  +  请在Grunt项目的问题跟踪站点提交问题文件。
+  **如果你愿意给一个新的插件做贡献。**
+  +  请提交问题文件到[grunt-contrib问题跟踪集合](https://github.com/gruntjs/grunt-contrib/issues)站点中。虽然我们不会接受所有的插件，但我们会考虑你的意见。
+  **如果发现[官方网站](http://gruntjs.com/)有问题**
+  +  请提交到[Grunt官网问题跟踪集合](https://github.com/gruntjs/gruntjs.com/issues)站点中。
+  **如果遇到以上描述之外的问题**
+  +  请提交问题文件到[grunt问题跟踪](https://github.com/gruntjs/grunt/issues)站点中并让我们知道你为什么提交它。

### 简化问题

尽量[减少你的代码](http://www.webkit.org/quality/reduction.html)到最少以保证重现该问题，这使得它更容易(及早)避免或者更容易解决问题。

### 解释问题

如果不能重现问题，我们就不能及时解决它。请列出重现该问题的步骤，包括你的系统版本，Node.js版本，grunt版本等等，最好包括相关的日志或示例代码。

## Grunt讨论

加入[freenode](http://freenode.net/) IRC的#grunt频道，那里有一个机器人和所有信息。

*请不要发私人的信息。*

## 修改grunt

首先，确保你已经安装了最新版本的[Node.js](http://nodejs.org/)和[npm](http://npmjs.org/)。

1.  确保安装了grunt-cli(查看[入门](http://gruntjs.com/getting-started/)指南可以获取更多信息)。
2.  Fork和clone我们的Grunt仓库。
3.  检出master分支(多数的grunt/grunt-contrib开发都是在这里完成的)。
4.  运行`npm install`安装所有的Grunt依赖。
5.  运行`grunt`来构建Grunt项目。

假设你没有看到标红的部分，那说明你准备好了。在所有更改完成之后运行`grunt`，以确保不会被中断。

### 提交pull requests

1.  创建一个新的分支，请不要直接在`master`上工作。
2.  给你想要的改变添加失败测试，运行`grunt`查看失败测试。
3.  解决问题。
4.  如果运行`grunt`通过测试，请重复2-4次直到它完成工作。
5.  更新文档以反应相关变化。
6.  推送到你的分支并提交pull request。

### 语法

+  使用两个空格缩进而不要随意的位置使用tab缩进，如果字符串中需要使用tab字符则使用`\t`来替代。
+  不要使用多余的空格，除了在markdown文件必须使用它来强制换行。
+  不要极端的使用空格。
+  不要[每一个变量](http://benalman.com/news/2012/05/multiple-var-statements-javascript/)都使用`var`语句赋值。
+  使用单引号`'`分割字符串而不是双引号`"`。
+  提出`if`和`else`语句，使用[灵活](http://programmers.stackexchange.com/a/25281)的`? :`控制流程语句或者`||`,`&&`等逻辑运算符。
+  注释是很有用的，应该将他们放在代码的*前面*，而*不是*代码的*后面*。
+  **如果还有疑问，请在你的源代码中遵循上面你看到的规则。**

### <strong style="color:red;">中文社区贡献说明：</strong>

+ 首先可以clone我们的master分支(因为我们的markdown源文件在这个分支中)到你的本地工作目录中，然后作出修改；完成修改之后可以给我们提交pull request。

+ gh-pages分支中的HTML会根据源码自动编译发布，如果有修改请参考上一条。

+ 如果有相关问题可以加入我们的QQ群，或者在github的issue中提出来。

+ 文档编辑使用中文标点，对列数暂不作限制。