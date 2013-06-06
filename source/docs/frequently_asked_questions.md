#常见问题

##如何安装Grunt?

对于一般安装说明, 请阅读[新手入门](http://gruntjs.com/getting-started/)指南. 如果你在阅读新手入门指南之后需要更多具体的信息, 请阅读详细的[安装Grunt](http://gruntjs.com/installing-grunt/)指南.

##我什么时候能够使用开发中的某个特性?

按照[安装Grunt](http://gruntjs.com/installing-grunt/)指南中的说明同时安装发布的和未发布的开发版本的Grunt.

##Grunt能在Windows上工作吗?

Grunt在Windows上工作得很好. 因为[Node.js](http://nodejs.org/)和[npm](http://npmjs.org/)在Windows上都工作得很好. 通常情况下问题在于[Cygwin](http://www.cygwin.com/), 因为它绑定了一个过时版本的Node.js.

避免这个问题最好的方式是使用[msysGit安装器](http://msysgit.github.com/)安装二进制的`git`, 使用[Node.js安装器](http://nodejs.org/#download)安装二进制的`node`和`npm`, 并且使用内置的[Window命令提示符](http://www.cs.princeton.edu/courses/archive/spr05/cos126/cmd-prompt.html)或者[PowerShell](http://support.microsoft.com/kb/968929)替代Cygwin.

##为什么我的异步任务不能完成?

可能发生这种情况, 由于你忘记调用[this.async](http://gruntjs.com/grunt.task#wiki-this-async)方法来告诉Grunt你的任务是异步的. 为了简单起见, Grunt使用了同步编码的风格, 可以通过再任务体内调用`this.async()`方法将任务切换为异步的.

注意, 传递`false`给`done()`函数就会告诉Grunt该任务失败.

例子:

    grunt.registerTask('asyncme', 'My asynchronous task.', function() {
        var done = this.async();
        doSomethingAsync(done);
    });

##如何启用tab命令来自动完成?

添加下面的代码到你的`~/.bashrc`文件中, 在grunt中来启用bash tab自动完成:

    eval "$(grunt --completion=bash)"
    
假设已经使用`npm install -g grunt`在全局安装了Grunt. 目前仅仅支持bash命令.

##如何跨多任务共享参数?

虽然每个任务都可以接受它自己的参数, 但是这里有几个可选项在多任间进行参数共享.

###"动态"别名任务

**这是多任务共享参数的首选方法**

而[别名任务](http://gruntjs.com/grunt#wiki-grunt-registertask)是很简单的, 一个常规的任务可以使用[grunt.task.run](http://gruntjs.com/grunt.task#wiki-grunt-task-run)使其作为一个有效的"动态"别名任务函数. 在下面的例子中, 在命令行运行`grunt build:001`的结果是运行`foo:001`,`bar:001`和`baz:001`中的任务.

    grunt.registerTask('build', 'Run all my build task.', function(){
        if(n == null){
            grunt.warn('Build num must be specified, like build:001');
        }
    })
    
### -- options

另一种跨多任务共享参数的方式就是使用[grunt.option](http://gruntjs.com/grunt#wiki-grunt-option). 在下面的例子中, 在命令行中运行`grunt deploy --target=staging`将导致`grunt.option('target')`返回`"staging"`.

    grunt.registerTask('upload','Upload code to specified target.', function(n){
        var target = grunt.option('target');
        //在这里使用target做一些有用的事情
    });
    grunt.registerTask('deploy', ['validate', 'upload']);

注意布尔选项可以指定使用一个没有值的键. 例如, 在命行中运行`grunt deploy --staging`将导致`grunt.option('staging')`返回`true`.

###全局和配置

在其他情况下, 你可能需要暴露一种方式来设置配置或者全局的值. 在这种情况下, 注册一个任务并设置其参数作为一个全局的或者配置值.

在下面的例子中, 在命令行运行`grunt set_global:name:peter set_config:target:staging deploy`将导致`global.name`为`"peter"`以及`grunt.config('target')`将会返回`"staging"`. 由此推断, `deploy`任务将使用这些值.

    grunt.registerTask('set_global', 'Set a global variable.', function(name, val){
        global[name] = val;
    });
    
    grunt.registerTask('set_config', 'Set a config property.', function(name, val){
        grunt.config.set(name, val);
    });
    
##Grunt 0.3相关问题

###在Windows的Grunt 0.3中, 为什么当我尝试运行grunt时会打开我的JS编辑器

如果你在[Gruntfile](http://gruntjs.com/getting-started)同一目录中, 当你输入grunt时, Windows中会尝试执行该文件. 因此你应该输入`grunt.cmd`来替代.

另一种方式是使用`DOSKEY`命令创建一个Grunt宏, 以[这种方式](http://devblog.point2.com/2010/05/14/setup-persistent-aliases-macros-in-windows-command-prompt-cmd-exe-using-doskey/). 这样就会允许你使用`grunt`来替代`grunt.cmd`.

下面是你可以使用的`DOSKEY`命令:

    DOSKEY grunt=grunt.cmd $*


