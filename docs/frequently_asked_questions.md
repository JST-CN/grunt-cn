# 常见问题

## 如何安装Grunt?

对于一般安装说明，请阅读[新手入门](http://gruntjs.com/getting-started/)指南。如果你在阅完读新手入门指南之后想要了解更多具体的信息，请阅读详细的[安装Grunt](http://gruntjs.com/installing-grunt/)指南。

## 我什么时候能够使用开发中的某个特性？

依据[安装Grunt](http://gruntjs.com/installing-grunt/)指南中的说明可以了解如何安装发布的和未发布的开发版本的Grunt(对于插件，你也可以使用npm安装并添加到依赖中使用；对于新的特性可以查阅相关说明安装使用)。

## Grunt能在Windows上工作吗？

Grunt可以很好的工作在Windows平台，因为[Node.js](http://nodejs.org/)和[npm](http://npmjs.org/)在Windows上都工作得很好(Grunt是基于Node.js的，因而是能够跨平台工作，对于特定平台不支持的特性一般都会有相关说明或者有兼容性的选择来支持)。通常情况下问题在于[Cygwin](http://www.cygwin.com/)，因为它捆绑了一个过时版本的Node.js。

避免这个问题最好的方式是使用[msysGit安装器](http://msysgit.github.com/)安装二进制的`git`，然后使用[Node.js安装器](http://nodejs.org/#download)安装二进制的`node`和`npm`，并且使用内置的[Window命令提示符](http://www.cs.princeton.edu/courses/archive/spr05/cos126/cmd-prompt.html)或者[PowerShell](http://support.microsoft.com/kb/968929)替代Cygwin(或者说我们首可以先安装好Git环境，然后将托管在Github上的Grunt库克隆到本地来安装使用Grunt，在工具方面Windows对Node.js的支持或许有欠缺，但是在对Node.js本身的支持上已经做得很好了)。

## 为什么我的异步任务不能完成？

如果发生这种情况可能是由于你忘记调用[this.async](http://gruntjs.com/grunt.task#wiki-this-async)方法来告诉Grunt，你的任务是异步的。为了简单起见，Grunt使用了同步编码的风格，可以通过在任务体内调用`this.async()`方法将该任务转换为异步任务。

注意，可以传递`false`给`done()`函数来告诉Grunt该任务失败。

例子:

    grunt.registerTask('asyncme', 'My asynchronous task.', function() {
        var done = this.async();
        doSomethingAsync(done);
    });

## 如何启用tab命令来自动补全？

添加下面的代码到你的`~/.bashrc`文件中来在Grunt中来启用bash tab自动补全功能：

    eval "$(grunt --completion=bash)"
    
当然前提是你已经使用`npm install -g grunt`在全局范围内安装好了Grunt。当前，自动补全唯一支持的shell脚本是bash。

## 如何跨多任务共享参数？

虽然每个任务都可以接受它自己的参数，但是这里有几个选项可以在多个任务之间进行参数共享。

### "动态"别名任务

**这是在多任务间共享参数的首选方法。**

[别名任务](http://gruntjs.com/grunt#wiki-grunt-registertask)是非常简单的，一个常规的任务可以使用[grunt.task.run](http://gruntjs.com/grunt.task#wiki-grunt-task-run)方法让它编程一个有效的"动态的"别名任务函数。在下面的例子中，在命令行运行`grunt build:001`的结果就是执行`foo:001`,`bar:001`和`baz:001`这三个任务。

	grunt.registerTask('build', 'Run all my build tasks.', function(n) {
	  if (n == null) {
	    grunt.warn('Build num must be specified, like build:001.');
	  }
	  grunt.task.run('foo:' + n, 'bar:' + n, 'baz:' + n);
	});
    
### -- options

另一种跨多任务共享参数的方式就是使用[grunt.option](http://gruntjs.com/grunt#wiki-grunt-option)。在下面的例子中，在命令行中运行`grunt deploy --target=staging`将导致`grunt.option('target')`返回`"staging"`。

    grunt.registerTask('upload','Upload code to specified target.', function(n){
        var target = grunt.option('target');
        //在这里使用target做一些有用的事情
    });
    grunt.registerTask('deploy', ['validate', 'upload']);

*注意布尔类型的选项(options)可以只指定使用一个没有值的键。例如，在命行中运行`grunt deploy --staging`将导致`grunt.option('staging')`返回`true`.*

### 全局和配置

在其他情况下，你可能希望暴露一个设置配置或者全局的值方法。 在这种情况下，可以在注册任务时设置其参数作为一个全局对象的或者项目配置的值。

在下面的例子中，在命令行运行`grunt set_global:name:peter set_config:target:staging deploy`会导致`global.name`的值为`"peter"`以及`grunt.config('target')`将会返回`"staging"`。由此推断，`deploy`任务就可以使用这些值。

    grunt.registerTask('set_global', 'Set a global variable.', function(name, val){
        global[name] = val;
    });
    
    grunt.registerTask('set_config', 'Set a config property.', function(name, val){
        grunt.config.set(name, val);
    });
    
## Grunt 0.3相关问题

### 在Windows的Grunt 0.3中, 为什么当我尝试运行grunt时会打开我的JS编辑器

如果你在[Gruntfile](http://gruntjs.com/getting-started)所在目录中(在命令行进入到这个目录)，当你输入grunt时，Windows中会尝试执行该文件(实际上Windows中会尝试执行grunt.js，因为在0.4.x之前的版本中Gruntfile.js名为grunt.js)。因此你应该输入`grunt.cmd`来替代。

另一种方式是使用`DOSKEY`命令创建一个Grunt宏, 可以参考也读[这篇文章](http://devblog.point2.com/2010/05/14/setup-persistent-aliases-macros-in-windows-command-prompt-cmd-exe-using-doskey/)。这样就会允许你使用`grunt`来替代`grunt.cmd`。

下面是你可以使用的`DOSKEY`命令：

    DOSKEY grunt=grunt.cmd $*
