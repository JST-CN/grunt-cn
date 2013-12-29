# 安装Grunt

本文档说明了如何安装指定版本的Grunt和Grunt插件。如果你还没有阅读[入门](getting-started.html)指南，那么你应该先阅读它。

## 概览

Grunt和Grunt插件应该作为[项目依赖](https://npmjs.org/doc/json.html#devDependencies)定义在你项目的[package.json](https://npmjs.org/doc/json.html)中。这样就允许你使用一个单独的命令:`npm install`安装你项目中的所有依赖(在`package.json`中定义好的grunt和grunt插件在使用`npm install`时会自动安装相关依赖，正如我们已经了解到的，这些依赖都定义在`package.json`中了)。当前稳定的和开发中的Grunt版本始终都列在[wiki页面上](https://github.com/gruntjs/grunt/wiki/)。

## 安装指定版本的Grunt

如果你要安装指定版本的Grunt或者Grunt插件，只需要运行`npm install grunt@VERSION --save-dev`命令，其中`VERSION`就是你所需要的版本(指定版本号即可)。这样会安装指定版本的Grunt或者插件，并将它作为你的项目依赖添加到`package.json`。

注意，当你给`npm install`添加`--save-dev`标志时，一个[波浪线范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被用于你的`package.json`中。通常这么做是很好的，因为如果指定版本的Grunt或者插件有更新补丁出现时，它将自动升级到开发中的版本，与[semver](http://semver.org/)对应。

## 安装已发布的开发版本的Grunt

通常当新功能开发完成后，Grunt构建都可能会定期被发布到npm中。没有显式指定的版本号，这些构建**不可能**安装到依赖中，通常它会有一个内部版本号或者alpha/beta/指定候选版本号。

与安装指定版本的Grunt一样，运行`npm install grunt@VERSION --save-dev`其中`VERSION`就是你所需要的版本，同时npm将会安装那个版本(所指定版本的模块)的Grunt到你的项目目录中(通常都会安装到nodemodule中)，并把它添加到`package.json`依赖中。

注意，如果你没有注意指定版本号，都会有一个[波浪线的版本范围](https://npmjs.org/doc/json.html#Tilde-Version-Ranges)将被指定到`package.json`中。**这是非常糟糕的**，因为指定开发版本的模块都是新的，可能是不兼容的，如果开发发布的补丁通过`npm`被安装到你的`package.json`中会有可能破坏你的构建工作。

在这种情况下手动的编辑你的`package.json`是**非常重要的**，并且你应该从`package.json`中的版本号中移除~(波浪线)。这样就会锁定你所指定的精确的开发版本(稳定并安装好的依赖模块)。

这种方式同样也可以用于安装已发布的开发版本的Grunt插件。

> 译注：通常发布的开发版都只是作为源代码提交到指定的仓库如Github等，可能并没有作为npm模块正式发布。在使用的过程中，建议按需添加稳定版本的依赖模块。如果你有足够的信心，也可以尝试使用最新的未正式发布的模块来满足工作需求。

## 从Github上直接安装

如果你想安装一个最新版的，未正式发布的Grunt或者Grunt插件，按照说明你可以指定一个[Git URL作为依赖](https://npmjs.org/doc/json.html#Git-URLs-as-Dependencies)，注意这里一定要指定一个实际提交的SHA(而不是一个分支名)作为`commit-ish`。这样就会保证你的项目总是使用明确版本的Grunt。

指定的Git URL可能来自于Grunt官方或者分支。

> 也可以将github上托管的源码文件下载到本地来安装。
