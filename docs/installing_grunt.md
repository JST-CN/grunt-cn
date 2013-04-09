#安装grunt

这个文档描述了如何安装指定版本的grunt和grunt插件。如果你没有阅读[入门](http://gruntjs.com/getting-started)指南，你应该先去看看它。

##概述

Grunt和grunt插件应该作为[依赖](https://npmjs.org/doc/json.html#devDependencies)被定义在你项目的[package.json](https://npmjs.org/doc/json.html)文件中。这允许你使用一个单一的命令:`npm install`去安装你的项目所有的依赖。grunt当前稳定或者开发中的版本在总是列在wiki[主页](https://github.com/gruntjs/grunt/wiki/)中。

##安装一个指定的版本

如果你需要一个指定版本的grunt或者grunt插件，运行`npm install grunt@VERSION --save-dev`，其中`VERSION`就是你需要的版本。这将安装指定版本，并把它添加到你的package.json依赖中。

注意当你添加`--save-dev`标志到`npm install`中，一个[波浪线的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被用于你的`package.json`中。这通常很好的，后续的开发中新的补丁将随着指定版本自动更新。

##安装已经发布的开发版本

每当一个新的功能开发完成，grunt都会使用npm构建发布。这些没有指定版本号的构建将不可以安装，并带有一个候选的内部版本号/alpha/beta/release。

与安装一个制定版本的grunt类似，运行`npm install grunt@VERSION --save-dev`其中`VERSION`代表你选择的版本，然后npm会安装该版本的grunt到你的项目目录，并将它作添加到你的`package.json`依赖中。

注意不管你是否指定版本，一个[波浪线的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被用于你的`package.json`中。**这是非常糟糕的**，作为新的，可能是不兼容的，指定开发版本的补丁可能会由npm安装，从而破坏你的构建。

这种情况下，你手动的编辑你的`package.json`并从你的版本数字中移除~(波浪号)是**非常重要的**。这将锁定你准确指定的开发版本。

同样的过程也可以用来安装发布的开发版本grunt插件的。

##直接从Github安装

如果你先安装一个超前的，未发布的开发版本grunt或者grunt插件，按照说明指定一个[git URL](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies)最为依赖项，一定要指定一个实际存在的commit SHA(不是分支名)作为`commit-ish`。这将确保你的项目总是使用准确版本的grunt。

这个指定的git URL可能是来自官方的一个仓库或者分支。