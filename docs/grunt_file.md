#grunt.file

提供了很多方法来读取或者编辑文件, 通过匹配模式遍历文件系统或者查找文件. 其中很多方法都包装了内置的Node.js文件功能, 但是标准化了额外的错误处理,日志记录和字符编码.

*注意: 文件路径相对于Gruntfile所在目录, 除非当前工作目录使用`grunt.file.setBase`或者`--base`命令行选项改变了.*

##字符编码

###grunt.file.defaultEncoding

用于通过所有的`grunt.file`方法设置这个属性来改变默认的字符编码. 默认为`'utf8'`. 如果你改变了这个值, 推荐你尽早在Gruntfile中来改变它.

    grunt.file.defaultEncoding = 'utf8'
    
##读和写文件

###grunt.file.read

读取并返回文件内容. 返回一个字符串, 除非`options.encoding`为`null`, 这种情况下它返回一个[Buffer](http://nodejs.org/docs/latest/api/buffer.html)缓冲区).

    grunt.file.read(filepath [, options])
    
`options`对象可能有这些属性

    var options = {
        // If an encoding is not specified, default to grunt.file.defaultEncoding.
        // If specified as null, returns a non-decoded Buffer instead of a string.
        encoding: encodingName
    };

###grunt.file.readJSON

读取文件内容, 解析YAML数据并返回结果. 请参阅`grunt.file.read`所支持的选项列表.

    grunt.file.readYAML(filepath [, options]);
    
###grunt.file.write

给文件写入指定的内容, 必要时创建一个中间目录. 字符串将只用指定字符编码进行编码, [Buffters](http://nodejs.org/docs/latest/api/buffer.html)将被写入指定的磁盘.

*如果指定了`--no-write`命令行选项, 实际上不会xieur文件*.

    grunt.file.write(filepath, contents [, options])
    
`options`对象可能有这些属性

    var options = {
        // If an encoding is not specified, default to grunt.file.defaultEncoding.
        // If `contents` is a Buffer, encoding is ignored.
        encoding: encodingName
    };
    
###grunt.file.copy

复制源文件到目标路径, 必要时创建一个中间目录.

*如果指定了`--no-write`命令行选项, 实际上不会xieur文件*.

    grunt.file.copy(srcpath, destpath [, options]);
    
`options`对象可能有这些属性

    var options = {
        // If an encoding is not specified, default to grunt.file.defaultEncoding.
        // If null, the `process` function will receive a Buffer instead of String.
        encoding: encodingName,
        // The source file contents and file path are passed into this function,
        // whose return value will be used as the destination file's contents. If
        // this function returns `false`, the file copy will be aborted.
        process: processFunction,
        // These optional globbing patterns will be matched against the filepath
        // (not the filename) using grunt.file.isMatch. If any specified globbing
        // pattern matches, the file won't be processed via the `process` function.
        // If `true` is specified, processing will be prevented.
        noProcess: globbingPatterns
    };
    
###grunt.file.delete

删除指定文件路径. 将会递归的删除文件和目录.

*不会删除当前工作目录或者当前工作目录之外的文件, 除非指定`--force`命令行选项.*

*如果指定`--no-write`命令行选项, 文件路径实际上不会删除.*

    grunt.file.delete(filepath [, options]);
    
`options`对象可能有这些属性

    var options = {
        // Enable deleting outside the current working directory. This option may
        // be overridden by the --force command-line option.
        force: true
    };
    
##目录

###grunt.file.mkdir

类似`mkdir -p`工作. 使用任意中间目录创建一个目录. 如果没有指定`mode`, 默认为`0777 & (~process.umask())`.

*如果指定`--no-write`命令行选项, 实际上不会创建目录.*

    grunt.file.mkdir(dirpath [, mode])
    
###grunt.file.recurse

在目录中递归, 为每个文件执行回调函数.

    grunt.file.recurse(rootdir, callback)
    
回调函数接受以下参数:

    function callback(abspath, rootdir, subdir, filename) {
        // The full path to the current file, which is nothing more than
        // the rootdir + subdir + filename arguments, joined.
        abspath
        // The root director, as originally specified.
        rootdir
        // The current file's directory, relative to rootdir.
        subdir
        // The filename of the current file, without any directory parts.
        filename
    }

##匹配模式

单独指定所有的源文件路径往往是不切实际的, 因此Grunt通过内置的[node-glob](https://github.com/isaacs/node-glob)库支持文件名扩展(也就通配符).

在[配置任务](http://gruntjs.com/configuring-tasks/)指南的"匹配模式"一节可以查看更多匹配模式的例子.

###grunt.file.expand

返回匹配给定匹配模式的文件或者目录路径的特殊数组. 这个接受逗号分割的匹配模式或者匹配模式数组. 路径匹配模式以`!`开始将从返回的数组排除. 模式是按顺序处理的, 因此包含和排除文件的顺序是明显的.

    grunt.file.expand([options, ] patterns)
    
文件路径相对于Gruntfile所在目录, 除非当前工作目录使用`grunt.file.setBase`或者`--base`命令行选项改变过.

`options`对象支持所有的[minimatch库](https://github.com/isaacs/minimatch)的选项, 以及一些其他选项. 例如:

+ `filter`接受一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)或者已经通过匹配的`src`文件路径的函数并返回`true`或者`false`.
+ `nonull`表示`src`模式匹配文件失败. 结合Grunt的`-verbose`标志, 这个选项可以帮助调试文件路径问题.
+ `matchBase` 没有斜线的模式将只匹配基本的名称部分. 例如, 这使得`*.js`就像`**/*.js`.
+ `cwd` 模式将相对于当前路径进行匹配, 所有返回的文件路径也是相对于当前路径.

###grunt.file.expandMapping

返回一个src-dest文件映射对象数组. 通过指定的模式匹配每一个源文件, 然后将匹配的文件路径加入指定的`dest`这个文件路径可能加工或者重命名过, 依据指定的选项. 查看`grunt.file.expand`方法文档可以了解如何指定`patterns`和`options`参数.

    grunt.file.expandMapping(patterns, dest [,options])
    
*注意这个方法可以用于编程的方式针对多任务生成一个`files`数组, 会优先使用描述在[配置任务](http://gruntjs.com/configuring-tasks/)指南中"动态构建文件对象"一节描述的语法声明*.

除了支持哪些`grunt.file.expand`方法, `options`对象也支持这些属性:

    var options = {
        // The directory from which patterns are matched. Any string specified as
        // cwd is effectively stripped from the beginning of all matched paths.
        cwd: String,
        // Remove the path component from all matched src files. The src file path
        // is still joined to the specified dest.
        flatten: Boolean,
        // Remove anything after (and including) the first "." in the destination
        // path, then append this value.
        ext: String,
        // If specified, this function will be responsible for returning the final
        // dest filepath. By default, it joins dest and matchedSrcPath like so:
        rename: function(dest, matchedSrcPath, options) {
            return path.join(dest, matchedSrcPath);
        }
    };

###grunt.file.match

针对一个或者多个文件路径匹配一个或者多个匹配模式. 返回一个包含指定的匹配模式任意匹配的文件路径的特殊数组. `patterns`和`filepaths`参数可以时一个单一的字符串或者一个字符串数组. 匹配模式以`!`开始表示从返回的数组从排除路径. 模式按顺序处理, 因此包含和排除文件的顺序时明显的.

    grunt.file.match([options, ] patterns, filepaths)
    
`options`对象支持所有的[minimatch库](https://github.com/isaacs/minimatch)的选项. 例如: 如果`options.matchBase`为true, 即使它不包含斜线模式也匹配不包含斜线部分的基本名称. 例子: `*.js`模式将匹配`path/to/file.js`文件路径.

###grunt.file.isMatch

这个方法与`grunt.file.match`方法包含同样的签名和逻辑, 但是如果它匹配任何文件, 就简单的返回`ture`, 否则返回`false`.

##文件类型

###grunt.file.exists

给定的路径是否存在? 返回一个布尔值.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.exusts(path1 [, path2 [, …]])
    
###grunt.file.isLink

给定的路径是否表示链接? 返回一个布尔值.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.isLink(path1 [, path2 [, …]])
    
如果路径不存在则返回false.

###gruntfile.isDir
给定的路径是否时一个目录? 返回一个布尔值.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.isDir(path1 [, path2 [, …]])
    
如果路径不存在则返回false.

##路径

###grunt.file.isPathAbsolute

给定文件路径是否是绝对路径? 返回一个布尔值.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.isPathAbsolute(path1 [, path2 [, …]])

###grunt.file.arePathsEquivalent

所有指定的路径是否引用同一路径? 返回布尔值.

    grunt.file.arePathsEquivalent(path1 [, path2 [, …]])
    
###grunt.file.doesPathContain

所有的子路径都是否属于指定的父路径? 返回布尔值.

*注意: 它并不会检查路径是否真实存在*.

    grunt.file.doesPathContain(ancestorPath, descendantPath1 [, descendantPath2 [, …]])
    
###grunt.file.isPathCwd

给定文件路径是否CWD[Current Working Directory -> 当前工作目录]? 返回一个布尔值.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.isPathCwd(path1 [, path2 [, …]])
    
###grunt.file.isPathInCwd

给定的文件路径是否是CWD中的? 注意: CWD并不在CWD中. 返回一个布尔值

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

    grunt.file.isPathInCwd(path1 [, path2 [, …]])
    
###grunt.file.setBase

改变Grunt的当前工作目录(CWD). 默认情况下, 所有的文件路径相对于Gruntfile所在目录. 这就像`--base`命令行选项.

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法一样, 这个方法连接所有的参数并标准化返回的路径.

##外部库

> 来自第三方的库

grunt.file.glob

[glob](https://github.com/isaacs/node-glob) - 文件通配符工具

grunt.file.minimatch

[minimatch](https://github.com/isaacs/minimatch) - 文件匹配模式工具

grunt.file.findup

[findup-sync](https://github.com/cowboy/node-findup-sync) - 向上搜索文件匹配模式



