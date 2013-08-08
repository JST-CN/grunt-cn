# 安装Grunt

这个文档说明了如何安装指定版本的Grunt和Grunt插件. 如果你还没有阅读[入门](http://gruntjs.com/getting-started/)指南, 那么你应该先阅读它.

## 概览

Grunt和Grunt插件在你项目的[package.json](https://npmjs.org/doc/json.html)中定义为[项目依赖](https://npmjs.org/doc/json.html#devDependencies). 这样就允许你使用一个单独的命令:`npm install`安装你项目中的所有依赖. 当前稳定的和开发中的Grunt版本始终列在[维基页面上](https://github.com/gruntjs/grunt/wiki/).

## 安装一个指定版本的Grunt

如果你需要一个指定版本的Grunt或者Grunt插件, 只需要运行`npm install grunt@VERSION --save-dev`命令, 其中`VERSION`就是你所需要的版本. 这将会安装指定版本的Grunt或者插件, 并将它作为你的项目依赖添加到package.json.

注意, 当你给`npm install`添加`--save-dev`标志时, 一个[波浪线范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被用于你的`package.json`中. 这通常是很好的, 如果指定版本的Grunt或者插件有更新补丁出现时, 它将自动升级到开发中的版本, 与[语义版本](http://semver.org/)一一对应.

## 安装一个已经发布的开发版本的Grunt

偶尔, 当新功能开发完成时, Grunt构建都可能被发布到npm中. 这些构建将永远不可以通过显示的指定一个版本号来安装, 通常它会有一个候选指定的内部版本号/alpha/beta/release.

和安装一个制定版本的Grunt一样, 运行`npm install grunt@VERSION --save-dev`其中`VERSION`就是你所需要的版本, 同时npm将会安装那个版本的Grunt到你的项目目录中, 并把它添加到`package.json`依赖中.

注意, 不管你是否制定版本, 都会有一个[波浪线的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被指定到`package.json`中. **这是非常糟糕的**, 指定开发版本的新的, 不兼容的, 发布补丁可能通过npm被安装到你的项目, 从而破坏你的构建工作.

在这种情况下手动的编辑你的`package.json`是**非常重要的**, 并且从版本号中移除~(波浪线). 这将锁定你所指定的确切的开发版本.

同样的过程也可以被用来安装一个发布的开发版本的Grunt插件.

## 从Github上直接安装

如果你想安装一个最新的, 未发布版本的Grunt或者Grunt插件, 按照说明指定一个[Git URL作为依赖](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies), 一定要指定一个实际提交的SHA(而不是一个分支名)作为`commit-ish`. 这将会保证你的项目总是使用明确版本的Grunt.

指定的Git URL可能来自于Grunt官方或者分支.