#grunt.log

输出信息到控制器

查看[og lib source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/log.js)了解更多信息

##The log API

Grunt输出看起来应该一致, 甚至是漂亮的. 因此, 有大量的日志记录方法和一些有用的模式. 所有的方法实际上记录的东西的都是链式的.

*注意: 所有的`grunt.verbose`下有效的方法都酷似`grunt.log`方法, 但是如果指定`--verbose`命令行选项仅仅只记录日志.*

###grunt.log.write/grunt.verbose.write

记录指定的`msg`字符串, 尾部没有换行符.

    grunt.log.write(msg);
    
###grunt.log.weiteln/grunt.verbose.writeln

记录指定的`msg`字符串, 尾部带有换行符.

    grunt.log.writeln([msg]);
    
###grunt.log.error/grunt.verbose.error

如果省略`msg`字符串, 记录红色的`ERROR`日志, 否则记录`>> msg`, 尾部带有换行符.

    grunt.log.error([msg])
    
###grunt.log.errorlns/grunt.verbose.errorlns

使用`grunt.log.error`记录一个错误日志, 使用`grunt.log.wraptext`每80个文本就换行.

    grunt.log/errorlns(msg)
    
###grunt.log.ok/grunt.verbose.ok

如果省略`msg`字符串, 记录绿色的`OK`日志, 否则记录`>> msg`, 尾部带有换行符.

    grunt.log.ok([msg])
    
###grunt.log.oklns/grunt.verbose.oklns

使用`grunt.log.ok`记录一个ok信息, 使用`grunt.log.wraptext`每80个文本就换行.
    
    grunt.log.oklns(msg)
    
###grunt.log.subhead/grunt.verbose.subhead

记录指定的`msg`字符串并**加粗**, 尾部带有换行符

    grunt.log.subhead(msg)
    
###grunt.log.writeflags/grunt.verbose.writeflags

记录一个`obj`属性列表(很好的调试标志)

    grunt.log.writeflags(obj, prefix)
    
###grunt.log.debug/grunt.verbose.debug

记录一个调试信息, 但是仅仅是指定`--debug`命令行选项的情况下

    grunt.log.debug(msg)
    
##Verbose and Notverbose

`grunt.verbose`下的有效日志记录方法的工作都酷似它们所对应的`grunt.log`, 但是仅仅指定`--verbose`命令行选项的情况下才记录. 还有一个对应"notverbose"适用于`grunt.log.notverbose`和`grunt.log.verbose.or`. 实际上, `.or`属性也可以用于`verbose`和`notverbose`之间有效的切换两者.

###grunt.verbose/grunt.log.verbose

这个对象包含所有的`grunt.log`方法, 但是仅仅在指定`--verbose`命令行选项情况下才是.

    grunt.verbose
    
###grunt.verbose.or/grunt.log.notverbose

这个对象包含所有的`grunt.log`方法, 但是仅仅在指定`--verbose`命令行选项情况下才是.

    grunt.verbose.or
    
##工具方法

这些方法实际上不记录日志, 它们只返回字符串可以用于其他方法使用.

###grunt.log.wordlist

返回一个逗号分割的`arr`数组项目.

    grunt.log.wordlist(arr [, options])
    
`options`对象可能有以下属性和默认值:

    var options = {
        // The separator string (can be colored).
        separator: ', ',
        // The array item color (specify false to not colorize).
        color: 'cyan',
    };

###grunt.log.uncolor

从字符串中移除所有的颜色信息, 使它适合测试`.length`或者可能记录到一个日志文件中.

    grunt.log.uncolor(str)
    
###grunt.log.wraptext

包装`text`字符串为`width`字符并带有`\n`, 确保单词没有从中间分割, 除非绝对必要的情况

    grunt.log.wraptext(width, text)

###grunt.log.table

包装`texts`字符串数组为`widths`宽度的字符串列数. `grunt.log.wraptext`的包装方法可以用于在列中生成输出.

    grunt.log.table(widths, texts)
    
##示例

一个通用模式, 只在`--verbose`模式或(OR)中记录日志, 如果发生一个错误, 就像这样:

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
    
上面代码的解释:

1. `grunt.verbose.write(msg)`记录message(没有换行符), 但是只在`--verbose`模式下.
2. `grunt.verbose.ok()`记录绿色的OK, 带有换行符
3. `grunt.verbose.or.write(msg).error().error(e.message)`做了几件事情:
    1.  如果不在`--verbose`模式下`grunt.verbose.or.write(msg)`记录message(没有换行符)并返回`norverbos对象.
    2.  `.error()`记录红色的ERROR, 带有换行符, 并且返回`notverbose`对象
    3. `.error(e.message);`记录实际的错误信息(返回`notverbose`对象)
4. `grunt.fail.warn('Something went wrong.');`记录嫩黄色的警告信息. 使用出口代码1退出grunt, 除非指定`--force`.

看看[grunt-contrib-*任务源码](https://github.com/gruntjs)中有更多的例子.