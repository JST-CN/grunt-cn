# grunt.file

这里提供了很多用来读取或者编辑文件，通过匹配模式遍历文件系统或者查找文件的方法。其中很多方法都是对Node.js中文件操作功能的一次包装，但是在这里标准化了额外的错误处理，日志记录和字符编码相关的行为。

*注意：通常情况下所有的文件路径都是相对于Gruntfile所在目录来确定，除非当前工作目录使用`grunt.file.setBase`或者命令行选项`--base`改变过。*

## 字符编码

### grunt.file.defaultEncoding

用于通过所有的`grunt.file`方法设置这个属性来改变默认的字符编码。默认情况下为`'utf8'`。如果你改变了这个值，推荐你尽早在你项目Gruntfile中改变它。

    grunt.file.defaultEncoding = 'utf8'
    
## 读写文件

### grunt.file.read

读取并返回指定文件内容。它会返回一个字符串，通常这种情况下它会返回一个[Buffer](http://nodejs.org/docs/latest/api/buffer.html)(缓冲区)，除非`options.encoding`为`null`。

    grunt.file.read(filepath [, options])
    
`options`对象可以指定下面这些属性：

    var options = {
        // If an encoding is not specified, default to grunt.file.defaultEncoding.
        // If specified as null, returns a non-decoded Buffer instead of a string.
        encoding: encodingName
    };

### grunt.file.readJSON

读取指定文件的内容，它会将数据作为JSON信息解析并返回结果。可以查看`grunt.file.read`来了解它所支持的选项列表。

    grunt.file.readJSON(filepath [, options]);

### grunt.file.readYAML

读取指定文件的内容，它会将数据作为YAML解析并返回结果。 同样可以查看`grunt.file.read`来了解它所支持的选项。
  
### grunt.file.write

写入指定的内容到一个文件中，必要的情况下它会创建一个中介目录。字符串会使用指定字符编码进行编码，[Buffters](http://nodejs.org/docs/latest/api/buffer.html)会按照其指定的方式写入磁盘。

*如果指定了`--no-write`命令行选项，不会真正写入文件中。*

    grunt.file.write(filepath, contents [, options])
    
`options`对象可以指定下面这些属性：

    var options = {
        // If an encoding is not specified, default to grunt.file.defaultEncoding.
        // If `contents` is a Buffer, encoding is ignored.
        encoding: encodingName
    };
    
### grunt.file.copy

复制一个源文件到目标路径指向的目录中，必要的情况下它也会创建一个中介目录。

*如果指定了`--no-write`命令行选项，它不会真正写入文件中。*

    grunt.file.copy(srcpath, destpath [, options]);
    
`options`对象可以指定下面这些属性：

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
    
### grunt.file.delete

删除指定文件路径，它会以递归的方式删除指定的文件和目录。

*它不会删除当前工作目录或者当前工作目录之外的文件，除非指定了`--force`命令行选项。*

*如果指定了`--no-write`命令行选项，文件路径不会真正删除。*

    grunt.file.delete(filepath [, options]);
    
`options`对象可以指定下面这些属性：

    var options = {
        // Enable deleting outside the current working directory. This option may
        // be overridden by the --force command-line option.
        force: true
    };
    
## 目录操作

### grunt.file.mkdir

类似`mkdir -p`操作。可以使用任意参考目录创建一个新目录。如果没有指定`mode`选项，则默认为`0777 & (~process.umask())`。

*如果指定了`--no-write`命令行选项，则不会真正创建目录。*

    grunt.file.mkdir(dirpath [, mode])
    
### grunt.file.recurse

在目录中以递归方式执行为每个文件指定的回调函数。

    grunt.file.recurse(rootdir, callback)
    
回调函数可以接收以下参数：

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

## 匹配模式

> 原文为Globbing Patterns，主要是指使用一些匹配模式来操作，因而译作匹配模式。

通常单独指定所有的源文件的路径往往是不切实际的，因此Grunt支持通过内置的[node-glob](https://github.com/isaacs/node-glob)库来根据文件扩展名来选择文件(也就通配符)。

在[配置任务](http://gruntjs.com/configuring-tasks/)指南的"通配符模式"一节可以查看更多匹配模式的例子。

### grunt.file.expand

返回包含匹配给定通配符模式的文件或者目录路径的特殊数组。这个方法接收一个逗号分割的匹配模式或者一个匹配模式数组。如果路径匹配模式以`!`开头，它会从返回的数组排除所匹配的项。模式是按指定的顺序进行处理的， 因此包含和排除文件的顺序是明显的。

    grunt.file.expand([options, ] patterns)
    
通常文件路径都是相对于Gruntfile所在目录的路径，除非当前工作目录使用`grunt.file.setBase`或者命令行选项`--base`改变了。

`options`对象支持所有的[minimatch库](https://github.com/isaacs/minimatch)提供的选项，它还支持其他的一些选项。例如：

+ `filter` 接受一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)或者一个已经通过了`src`文件路径匹配的函数，这个函数会返回`true`或`false`；
+ `nonull` 会保留`src`匹配模式，即使文件匹配失败。结合Grunt的`-verbose`标志，这个选项有助于文件路径问题的调试；
+ `matchBase` 不带斜线的模式只会匹配基本的名称部分。例如，这会使`*.js`就像`**/*.js`一样；
+ `cwd` 会让模式相对于当前路径进行模式匹配，所有返回的文件路径也是相对于当前路径的。

### grunt.file.expandMapping

返回一个`src-dest`文件映射对象的数组。通过所指定的模式来匹配每一个源文件，然后将匹配的文件路径加入指定的`dest`中(dest存放匹配的文件路径)。这个文件路径会按照指定的选项加工或者重命名过。 查看`grunt.file.expand`方法文档可以了解如何指定`patterns`和`options`参数。

    grunt.file.expandMapping(patterns, dest [,options])
    
*注意这个方法可以用于以编程的方式针对多任务的情况生成一个`files`数组，它会优先使用在[配置任务](http://gruntjs.com/configuring-tasks/)指南中"动态构建文件对象"一节所描述的语法。*

除了支持那些`grunt.file.expand`方法之外，`options`对象还支持下面这些属性：

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

### grunt.file.match

针对一个或者多个文件路径来匹配一个或者多个匹配模式。返回一个特殊的数组，这个数组包含与指定的通配符模式任意匹配的所有文件路径。`patterns`和`filepaths`参数可以是一个单一的字符串或者也可以是一个字符串数组.如果匹配模式以`!`开头，就会从返回的数组从排除模式匹配的路径。模式会按指定的顺序进行处理，因此包含和排除文件的顺序是明显的。

    grunt.file.match([options, ] patterns, filepaths)
    
`options`对象也支持[minimatch库](https://github.com/isaacs/minimatch)提供的所有选项。例如：如果`options.matchBase`为true，即使模式中不带斜线，这个模式也会匹配包含斜线的基本名称。例如：`*.js`模式将匹配`path/to/file.js`文件路径。

### grunt.file.isMatch

这个方法与`grunt.file.match`方法包含同样的签名和逻辑，但是如果它匹配任意文件，就会简单的返回`ture`，否则返回`false`。

## 文件类型

### grunt.file.exists

给定的路径是否存在？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法会连接所有的参数并标准化返回的路径。

    grunt.file.exists(path1 [, path2 [, …]])
    
### grunt.file.isLink

给定的路径是否表示链接？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isLink(path1 [, path2 [, …]])
    
如果路径不存在它会返回false。

### gruntfile.isDir

给定的路径是否是一个目录？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isDir(path1 [, path2 [, …]])
    
如果路径不存在它也会返回false。

### grunt.file.isFile

给定的路径是否是一个文件？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isFile(path1 [,path2 [,...]])

如果给定路径不存在它也会返回false。

## 路径

### grunt.file.isPathAbsolute

给定文件路径是否是绝对路径？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isPathAbsolute(path1 [, path2 [, …]])

### grunt.file.arePathsEquivalent

所有指定的路径是否引用同一路径？返回布尔值。

    grunt.file.arePathsEquivalent(path1 [, path2 [, …]])
    
### grunt.file.doesPathContain

所有指定的子路径都是否属于指定的父路径？返回布尔值。

*注意：它并不会检查路径是否真实存在。*

    grunt.file.doesPathContain(ancestorPath, descendantPath1 [, descendantPath2 [, …]])
    
### grunt.file.isPathCwd

给定文件路径是否是CWD目录[Current Working Directory -> 当前工作目录]？返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isPathCwd(path1 [, path2 [, …]])
    
### grunt.file.isPathInCwd

给定的文件路径是否在CWD中的？注意：CWD并不在CWD中。返回一个布尔值。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

    grunt.file.isPathInCwd(path1 [, path2 [, …]])
    
### grunt.file.setBase

改变Grunt的当前工作目录(CWD)。默认情况下，所有的文件路径都是相对于Gruntfile所在目录的。就像`--base`命令行选项。

就像Node.js的[path.join](http://nodejs.org/docs/latest/api/path.html#path_path_join_path1_path2)方法，这个方法也会连接所有的参数并标准化返回的路径。

## 外部库

> 来自第三方的库

grunt.file.glob

[glob](https://github.com/isaacs/node-glob) - 文件通配符工具。

grunt.file.minimatch

[minimatch](https://github.com/isaacs/minimatch) - 文件匹配模式工具。

grunt.file.findup

[findup-sync](https://github.com/cowboy/node-findup-sync) - 向上搜索的文件匹配模式。
