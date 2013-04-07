#Installing grunt

这个文档描述了如何安装指定版本的grunt和grunt插件。如果你没有阅读Getting Started指南，你应该先去看看它。

##概述

Grunt和grunt插件应该作为依赖被定义在你项目的package.json中。这允许你使用一个单一的命令:`npm install`去安装你的项目依赖。当前稳定或者开发的grunt版本在wiki的首页总是列出来了。

##安装一个指定的版本

如果你需要一个制定版本的grunt或者一个grunt插件，运行`npm install grunt@VERSION --save-dev`，其中`VERSION`就是你需要的版本。这将安装指定版本，并添把它添加到你的package.json依赖中。

注意当你添加`--save-dev`标志给`npm install`中一些不稳定的东西将被用于你的`package.json`。这是很好的，当一个新的制定版本发布时它将自动更新每个标准的开发版本。

##安装已经发布的开发版本

每当一个新的功能开发完成，grunt都会使用npm构建发布。这些构建将会带有明确指定的版本被允许安装，代表它乎有一个构建的数字/alpha/beta/release候选名称。

与安装一个制定版本的grunt类似，运行`npm install grunt@VERSION --save-dev`其中`VERSION`代表ii选择的版本，然后npm会安装该版本的grunt到你的项目目录，并将它作添加到你的`package.json`依赖中。

注意不管你是否指定了版本信息，一个浮动的版本信息都会指定在你的`package.json`中。**这是非常不好的**，新的，不确定兼容的，解
决构建的指定开发版本可能会被npm安装，终端你的构建。

这个实例**是非常重要的**，你要手动的编辑你的`package.json`并从你的版本数字中移除~(波浪号)。这将固定你指定的开发版本。

同样的过程你也可以用来安装一个已经发布的grunt插件的开发版本。

##从Github立即安装

如果你希望暴力的安装一个没有正式发布版本的grunt或者grunt插件，接下来的命令指定一个git URL作为一个从属，然后指定一个实际存在的commit SHA(不是分支名)作为`commit-ish`。这将确保你的项目总是使用一个精确版本的grunt。

这个指定的git URL可能是来自官方的或者来自一个分叉。