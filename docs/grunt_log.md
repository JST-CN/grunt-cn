# grunt.log

输出信息到控制器。

查看[log库源文件](https://github.com/gruntjs/grunt/blob/master/lib/grunt/log.js)可以了解更多详细信息。

## The log API

Grunt输出看起来应该是一致的，甚至是漂亮的。因此，这里有大量的日志记录相关的方法和一些很有用的模式。所有的这些方法实际上记录的东西的都是可连接的。

*注意：所有`grunt.verbose`下可用的方法都酷似`grunt.log`方法，不同的是，如果指定`--verbose`命令行选项，那么它就只会记录日志信息。*

### grunt.log.write/grunt.verbose.write

输出指定的`msg`字符串信息，尾部不带换行符。

    grunt.log.write(msg);
    
### grunt.log.weiteln/grunt.verbose.writeln

输出指定的`msg`字符串信息，尾部带有换行符。

    grunt.log.writeln([msg]);
    
### grunt.log.error/grunt.verbose.error

如果忽略了`msg`字符串，它会输出红色的`ERROR`信息；否则输出`>> msg`并且尾部带有换行符。

    grunt.log.error([msg])
    
### grunt.log.errorlns/grunt.verbose.errorlns

使用`grunt.log.error`会输出一个错误日志信息，使用`grunt.log.wraptext`可以做到每80个文本就换行(即保证输出最大列数为80列)。

    grunt.log/errorlns(msg)
    
### grunt.log.ok/grunt.verbose.ok

如果忽略`msg`字符串，它会输出绿色的`OK`信息；否则输出`>> msg`并且尾部带有换行符。

    grunt.log.ok([msg])
    
### grunt.log.oklns/grunt.verbose.oklns

使用`grunt.log.ok`方法输出一个ok信息，使用`grunt.log.wraptext`可以做到每80个文本就换行。
    
    grunt.log.oklns(msg)
    
### grunt.log.subhead/grunt.verbose.subhead

以加粗的形式输出指定的`msg`字符串，尾部带有换行符。

    grunt.log.subhead(msg)
    
### grunt.log.writeflags/grunt.verbose.writeflags

输出一个`obj`属性列表(它是很好的调试标志)。

    grunt.log.writeflags(obj, prefix)
    
### grunt.log.debug/grunt.verbose.debug

输出一个调试信息，但是只在指定`--debug`命令行选项的情况下才会输出。

    grunt.log.debug(msg)
    
## Verbose and Notverbose

所有`grunt.verbose`下可用的日志记录方法的工作都酷似它们所对应的`grunt.log`方法，但是它们只在指定`--verbose`命令行选项的情况下才一样。还有一个对应"notverbose"适用于`grunt.log.notverbose`和`grunt.log.verbose.or`。实际上，`.or`属性也可以用于在`verbose`和`notverbose`两者之间有效的进行切换。

### grunt.verbose/grunt.log.verbose

这个对象包含`grunt.log`下的所有方法，但是只在指定`--verbose`命令行选项情况下它才会输出日志信息。

    grunt.verbose
    
### grunt.verbose.or/grunt.log.notverbose

这个对象也包含`grunt.log`下的所有方法，但是只在不指定`--verbose`命令行选项情况下它才会输出日志信息。

    grunt.verbose.or
    
## 工具方法

这些方法不会真正输出日志信息，它们只返回可以用于其他方法中的字符串。

### grunt.log.wordlist

返回一个逗号分割的`arr`数组项目。

    grunt.log.wordlist(arr [, options])
    
`options`对象可以使用以下属性，并且还可以设置它们默认值：

    var options = {
        // The separator string (can be colored).
        separator: ', ',
        // The array item color (specify false to not colorize).
        color: 'cyan',
    };

### grunt.log.uncolor

从字符串中移除所有的彩色信息，使它适用于测试`.length`属性或者可以输出到一个日志记录文件中。

    grunt.log.uncolor(str)
    
### grunt.log.wraptext

将`text`字符串包装为`width`指定宽度字符列并在尾部添加一个`\n`(换行符)，确保单词没有从中间分割，除非绝对必要的情况下才可以使用分割的单词。

    grunt.log.wraptext(width, text)

### grunt.log.table

将`texts`字符串数组包装为`widths`指定宽度的字符串列数。包装函数`grunt.log.wraptext`方法可以用于生成输出列。

    grunt.log.table(widths, texts)
    
## 示例

一个常见的模式，发生错误时，它只在指定`--verbose` mode OR选项的情况下输出日志信息。就像下面这样：

    grunt.registerTask('something', 'Do something interesting.', function(arg) {
        var msg = 'Doing something...';
        grunt.verbose.write(msg);
        try {
            doSomethingThatThrowsAnExceptionOnError(arg);
            // Success!
            grunt.verbose.ok();
        } catch(e) {
            // Something went wrong.
            grunt.verbose.or.write(msg).error().error(e.message);
            grunt.fail.warn('Something went wrong.');
        }
    });
    
关于以上代码的说明：

1. `grunt.verbose.write(msg)` 输出指定的信息(没有换行符)，但是只在指定`--verbose`选项的模式下才能正常工作；
2. `grunt.verbose.ok()` 输出绿色的OK信息，尾部带有换行符；
3. `grunt.verbose.or.write(msg).error().error(e.message)`做了好几件事情：
    1.  如果不在指定`--verbose`选项的模式下则`grunt.verbose.or.write(msg)`输出信息(没有换行符)，并且它会返回`norverbos对象；
    2.  `.error()` 输出红色的ERROR信息，尾部带有换行符，它也会返回`notverbose`对象；
    3. `.error(e.message);` 输出实际的错误信息(同时返回`notverbose`对象)；
4. `grunt.fail.warn('Something went wrong.');` 输出一个浅黄色的警告信息，可以使用出口代码`1`退出Grunt，除非指定了`--force`选项。

查看[grunt-contrib-*任务源码](https://github.com/gruntjs)可以看到更多的例子。
