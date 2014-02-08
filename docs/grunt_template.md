# grunt.template

可以使用Grunt提供的模板相关函数来手动的处理模板字符串。此外，`config.get`方法(许多任务都有用到这个方法)可以自动解析指定在`Gruntfile`中作为配置数据的`<% %>`风格的模板字符串。

### grunt.template.process

处理[Lo-Dash模板](http://lodash.com/docs/#template)字符串。`template`参数会以递归的方式进行处理，直到不再有需要处理的模板。

默认情况下数据对象就是项目完整的配置对象，但是如果设置了`options.data`，就会使用这个`options.data`中指定的数据，而不会使用项目完整的配置对象。默认的模板分隔符是`<% %>`，但是如果将`options.delimiters`设置为自定义的分隔符，模板就会使用自定义的分隔符替换默认分隔符。

	grunt.template.process(template [,options])

在模板内部，`grunt`对象是暴露的，因此你可以这样做`<%= grunt.template.tody('yyyy') %>`。*注意，如果数据对象也有一个名为`grunt`的属性，那么在模板里面就无法使用`grunt`系列的API。*

这里有一个例子，Grunt会以递归的方式处理到`baz`属性中的模板，知道不再有`<% %>`风格的模板需要处理。

	var obj = {
		foo: 'c',
		bar: 'b<%= foo %>d',
		baz: 'a<%= bar %>e'
	};
	grunt.template.process('<%= baz %>', {data: obj}) // 'abcde'

### grunt.template.setDelimiters

设置[Lo-Dash模板](http://lodash.com/docs/#template)分隔符为预定义的分隔符，以防你需要手动的调用`grunt.util._.template`方法来进行处理。默认情况下`config`中会使用`<% %>`风格的分隔符。

*你或许无需使用这个方法，因为你所使用的`grunt.template.process`方法会在内部使用这个方法进行处理。*
	
	grunt.template.setDelimiters(name)

### grunt.template.addDelimiters

给[Lo-Dash模板](http://lodash.com/docs/#template)添加一组命名分隔符。你或许无需使用这个方法，因为内置的分割符应该足以满足你的需求，但是你也可以随时添加`<% %>`或者`[% %]`风格的分隔符。

	grunt.template.addDelimiters(name, opener, closer)

## 帮助

### grunt.template.date

使用[dateformat库](https://github.com/felixge/node-dateformat)格式化一个日期。

	grunt.template.date(date, format)

这里有一个例子，指定的日期将被格式化为年-月-日的形式。

	grunt.template.date(847602000000, 'yyyy-mm-dd') // '1996-11-10'

### grunt.template.today

使用[dateformat库](https://github.com/felixge/node-dateformat)格式化当前日期。

	grunt.template.today(format)

这里有一个例子，当前日期会被格式化为一个用4位数字表示年份的格式。

	grunt.template.today('yyyy')  //'2014'

*(有人提醒我每年都更新一下日期相关的信息，因此在文档只会出现当前年份的日期信息)。*
