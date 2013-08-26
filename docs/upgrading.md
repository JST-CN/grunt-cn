# 从0.3升级到0.4


*注意，即使你能熟练的使用grunt，新的[Getting start](http://gruntjs.com/getting-started/)指南都是值得一读的。*

Grunt现在被分割为三部分：`grunt`, `grunt-cli`和`grunt-init`。

1. npm模块`grunt`应该安装到你本地的项目中。它包含运行任务，插件加载的代码和逻等等。

2. npm模块`grunt-cli`应该被安装在全局环境中。它会把`grunt`命令植入到你所有的路径中，因此你可以在任意位置执行grunt命令。对于它自身而言，它不会做任何事情; 它的工作就是在你已经安装的本地项目中加载和运行Grunt，无论是哪个版本的Grunt。想要了解更多关于它演变的信息，请阅读: [npm 1.0:Global vc Local installation](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation)。

3. `init`任务已经被分解为其自身的npm模块：`grunt-init`。它可应该使用`npm install -g gruntp-init`在全局安装，然后就可以使用`grunt-init`命令来执行。在未来几个月中，[Yeoman](http://yeoman.io/)将完完全取代grunt-init。查看[grunt-init项目主页](https://github.com/gruntjs/grunt-init)，里面有更多更详细的信息。

> Yeoman的门槛比较高，目前Grunt并没有使用Yeoman完全替代grunt-init.

## 预装的任务和插件

所有的`grunt-contrib-*`系列的插件都是Grunt0.4才有的。然而，极有可能第三方为Grunt0.3所编写的插件还继续在Grunt0.4中工作直到它们被更新。我们也在积极的与插件作者一起努力确保尽快更新它们。

*一个致力于脱离grunt架构的Grunt即将发布，这样就可以保证插件不会受到未来更新的影响。*

## 要求

Grunt现在需要`0.8.0`及以上版本的Node.js支持。

## Gruntfile

+  "Gruntfile"已经从`grunt.js`改变为`gruntfile.js`。
+  在你项目中名为`Gruntfile.coffee`的gruntfile以及`*.coffe`任务文件中已经支持CoffeeScript了(会自动解析为JS)。

可以查看"Gruntfile"部分的[入门](http://gruntjs.com/getting-started/)指南以获取更多详细信息。

## 核心任务就是现在的Grunt插件

Grunt0.3中所包含的8个核心任务现在都变成了独立的Grunt插件。 其中每个插件都变成了独立的npm模块，而且必须被作为一个插件安装使用。对应的信息在[Grunt入门](http://gruntjs.com/getting-started/)指南的"加载Grunt插件和任务"一节。

+ concat → [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)插件
+ init → 独立的[grunt-init](https://github.com/gruntjs/grunt-init)功能
+ lint → [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)插件
+ min → [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)插件
+ qunit → [grunt-contrib-qunit](https://github.com/gruntjs/grunt-contrib-qunit)插件
+ server → [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)插件
+ test → [grunt-contrib-nodeunit](https://github.com/gruntjs/grunt-contrib-nodeunit)插件
+ watch → [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch)插件

有些任务名称和选项都已经发生了变化。 可以通过上面的链接查看每个插件文档中的最新配置信息。

## 配置

Grunt0.4的任务配置格式已经被标准化并大大提高了质量。可以查看[配置任务](http://gruntjs.com/configuring-tasks/)指南，也可以查看单独的插件文档了解更多详细信息。

+ 文件匹配(通配符)模式现在可以排除文件匹配来反选匹配项，
+ 任务现在支持一个标准的`options`对象，
+ 任务现在支持一个标准的`files`对象；

Gruntfile内作为配置数据指定的`<% %>`风格的字符串模板会自动解析，查看[grunt.template](http://gruntjs.com/grunt.template/)文档可以了解更多信息。

**移除了指令**，但是它们的功能仍然保留着。可以使用下面的替代方式：

+ `'<config:prop.subprop>'` → `'<%= prop.subprop %>'`
+ `'<json:file.json>'` → `grunt.file.readJSON('file.json')`
+ `'<file_template:file.js>'` → `grunt.template.process(grunt.file.read('file.js'))`

现在使用`<banner>`或者`<banner:prop.subprop>`替代在文件列表中指定banner信息，[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)和[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)插件都有一个`banner`选项.

现在使用`<file_strip_banner:file.js>`替代从文件中单独剥离banners，[grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat)和[grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify)插件都有一个选项用于剥离/保留banners选项。

## 别名任务变化

当指定一个别名任务时，现在必须将运行的任务列表指定为一个数组：

    //v0.3.x(老格式)
    grunt.registerTask('default', 'jshint nodeunit concat');
    //v0.4.x(新格式)
    grunt.registerTask('default', ['jshint','nodeunit','concat']);
    
## 任务参数现在可以包含空格

上述别名任务的变化(任务列表必须指定为一个数组)使得参数包含空格变得可能。当在命令行中指定它们时，只需要确保传递给任务的参数是在引号中包含空格，这样它们才可以正确的解析。

> 正如你所了解的，在JS对象的属性中，字符串形式的属性可以包含空格。

    grunt my-task:argument-without-spaces "other-task:argument with spaces"
    
## 字符编码

[file.defaultEncoding](http://gruntjs.com/grunt.file#wiki-grunt-file-defaultencoding)方法被加入到默认的字符编码中，所有的`grunt.file`的方法都已经更新以支持指定编码。

## 帮助

Grunt的帮助系统所遵循的node`require`机制已经被移除了。对于在简单的例子和Grunt插件之间如何共享功能，请查看[grunt-lib-legacyhelpers](https://github.com/gruntjs/grunt-lib-legacyhelpers)。插件的作者也在积极的更新他们的插件。

## API

Grunt API从0.3到0.4有了实质性的变化.

+ [grunt](http://gruntjs.com/grunt)
  +  移除了`grunt.registerHelper`和`grunt.renameHelper`方法.
+ [grunt.config](http://gruntjs.com/grunt.config)
  + 改变[grunt.get](http://gruntjs.com/grunt.config#wiki-grunt-config-get)方法为自动以递归的方式解析`<% %>`形式的模板。
  + 添加了[grunt.getRaw](http://gruntjs.com/grunt.config#wiki-grunt-config-getraw)方法用于检索原始(未加工的)配置数据。
  + 改变[grunt.process](http://gruntjs.com/grunt.config#wiki-grunt-config-process)方法为现在的值加工，如果它已经从配置中检索到，就会递归的解析模板。这个方法要在`grunt.get`内部调用，但是不能在`config.getRaw`内部调用。
+ [grunt.file](http://gruntjs.com/grunt.file)
  + 任务不再从`~/.grunt/tasks/`目录中自动加载(请在本地项目中安装)。
  + 给所有的`grunt.file`方法添加了[file.defaultEncoding](http://gruntjs.com/grunt.file#wiki-grunt-file-defaultencoding)方法用于处理默认编码。
  + 添加了[file.delete](http://gruntjs.com/grunt.file#wiki-grunt-file-delete)方法
  + 添加了顾名思义的 [file.exists](http://gruntjs.com/grunt.file#wiki-grunt-file-exists)，[file.isDir](http://gruntjs.com/grunt.file#wiki-grunt-file-isdir)，[file.isFile](http://gruntjs.com/grunt.file#wiki-grunt-file-isfile)，[file.isLink](http://gruntjs.com/grunt.file#wiki-grunt-file-islink)，[file.isPathCwd](http://gruntjs.com/grunt.file#wiki-grunt-file-ispathcwd)，[file.isPathInCwd](http://gruntjs.com/grunt.file#wiki-grunt-file-ispathincwd), [file.doesPathContain](http://gruntjs.com/grunt.file#wiki-grunt-file-doespathcontain)，[file.arePathsEquivalent](http://gruntjs.com/grunt.file#wiki-grunt-file-arepathsequivalent)等测试方法。
  + 添加了[file.match](http://gruntjs.com/grunt.file#wiki-grunt-file-match)和[file.isMatch](http://gruntjs.com/grunt.file#wiki-grunt-file-ismatch)方法便于匹配文件时使用通配符模式。
  + 添加了[file.expandMapping](http://gruntjs.com/grunt.file#wiki-grunt-file-expandmapping)方法用于生成1对1的src-dest文件映射。
  + 添加了[file.readYAML](http://gruntjs.com/grunt.file#wiki-grunt-file-readyaml)方法。
  + 改变[file.findup](http://gruntjs.com/grunt.file#wiki-grunt-file-findup)为使用[findup-sync](https://github.com/cowboy/node-findup-sync)模块。
  + 改变[file.glob](http://gruntjs.com/grunt.file#wiki-grunt-file-glob)为使用[glob](https://github.com/isaacs/node-glob)模块。
  + 添加了[file.miniatch](http://gruntjs.com/grunt.file#wiki-grunt-file-minimatch)来暴露[minimatch](https://github.com/isaacs/minimatch)模块。
  + 移除了`file.userDir`方法(移到[grunt-init](https://github.com/gruntjs/grunt-init)中了)
  + 移除了`file.clearRequireCache`方法。
  + 移除了`file.expandFiles`和`file.expandDirs`方法，现在使用`filter`选项的`file.expand`替代。
  + 移除了`file.expandFileURLs`方法。不应该指定URLs，应该指定文件(例如：qunit任务现在支持一个`urls`选项)。
+ [grunt.task](http://gruntjs.com/grunt#wiki-grunt-task)
  + 使用[task.registerTask](http://gruntjs.com/grunt.task#wiki-grunt-task-registertask)和[task.registerMultiTask](http://gruntjs.com/grunt.task#wiki-grunt-task-registermultitask)获取一个`this.options`方法来注册任务。
  + 添加了[task.normalizeMultiTaskFiles](http://gruntjs.com/grunt.task#wiki-grunt-task-normalizemultitaskfiles)方法便于标准化多任务`files`对象到`this.file`属性。
  + 移除了`task.registerHelper`和`task.renameHelper`方法
  + 移除了`task.searchDirs`属性
  + 移除了`task.expand` `task.expandDirs` task.expandFiles``task.getFile` task.readDefaults`方法(移到[grunt-init](https://github.com/gruntjs/grunt-init)中了)
+ [grunt.package](http://gruntjs.com/grunt#wiki-grunt-package)表示存储在grunt的`package.json`中的元数据。
+ [grunt.version](http://gruntjs.com/grunt#wiki-grunt-versions)是Grunt的当前版本，是一个字符串。
+ [grunt.template](http://gruntjs.com/grunt.template)
  + 添加了[template.addDelimiters](http://gruntjs.com/grunt.template#wiki-grunt-template-adddelimiters)方法用于添加新模板分隔符。
  + 添加了[template.setDelimiters](http://gruntjs.com/grunt.template#wiki-grunt-template-setdelimiters)方法用于选取模板分隔符。
  + 移除了`init`和`user`模板分隔符，如果有需要你可以使用`template.addDelimiters`再次添加它们([grunt-init](https://github.com/gruntjs/grunt-init)使用这个启用`{% %}`模板分隔符)。
+ [grunt.util](http://gruntjs.com/grunt.util)替换了现在已经移除的`grunt.utils`
  + 改变`util._`为使用[Lo-Dash](http://lodash.com/)。
  + 添加了[util.callbackify](http://gruntjs.com/grunt.util#wiki-grunt-util-callbackify)方法，确保与回调函数中传递更一致的参数。
  
## 任务/插件作者

**插件作者，请在你仓库中的README文件中清晰的表明你的Grunt插件的数字版本以避免与Grunt 0.3的兼容性问题。**

### 任务

+ 多任务
 + 多个`src-dest`文件映射形式现在可以给每个目标指定一个`files`对象(这是可选的)。
+ [this.files / grunt.task.current.files
](http://gruntjs.com/grunt.task#wiki-this-files)
  + `this.files`属性是一个遍历你的多任务得到一个`src-dest`文件映射对象数组。它一直都是一个数组， 即使通常只时指定一个单一的文件，它也会遍历返回一个数组。
  + 每个`src-dest`文件映射对象都有一个`src`和`dest`属性(对于其他情况, 取决于用户是否指定)。`src`属性可能早已从用户以任何方式指定的glob模式中解析了。
+ [this.filesSrc / grunt.task.current.filesSrc](http://gruntjs.com/grunt.task#wiki-this-filessrc)
  + `this.filesSrc`属性是一个与所有指定的`src`属性所匹配归并的，uniqued文件数组。这对只读任务非常有用.
+ [this.options / grunt.task.current.options](http://gruntjs.com/grunt.task#wiki-this-options)
  + `this.options`可以用在任务中用于标准化options。在任务内部，你可能会指定默认的options就像：`var options = this.options({option: 'defaultvalue', ...});`。
  
### 插件

Grunt 0.4中创建了一个兼容Grunt 0.4插件的`gruntplugin`模板，并且在独立的[grunt-init](https://github.com/gruntjs/grunt-init)中是有效的。

## 故障排除

+ 如果你之前已经安装了开发版本的Grunt 0.4或者grunt-contrib插件，务必首先使用`npm cache clean`清空你的npm缓存以确保提取最终版本的Grunt和grunt-contrib插件。