#grunt.template

模板字符串可以使用提供的模板函数手动的处理. 此外, config.get方法自动解析Gruntfile里面指定的配置数据中的`<% %>`风格的模板字符串.

###grunt.template.process

处理一个[Lo-Dash模板](http://lodash.com/docs/#template)字符串. `template`参数将递归的处理直到没有更多的模板需要处理.

默认的数据对象是完整的配置对象, 但是如果设置`options.data`, 则不是该配置对象. 默认模板分隔符是`<% %>`, 但是如果`options.delimiters`设置了自定义的分隔符名称, 这些模板分隔符将会被替换(默认分隔符会被替换).

	grunt.template.process(template [,options])

模板内部, `grunt`对象是暴露的, 因此你可以这样做`<%= grunt.template.tody('yyyy') %>`. *注意, 如果数据对象已经有了`grunt`属性, 在模板内将无法访问`grunt`API*.

这里有一个例子, `baz`属性将递归的处理, 直到没有更多的`<% %>`模板要处理.

	var obj = {
		foo: 'c',
		bar: 'b<%= foo %>d',
		baz: 'a<%= bar %>e'
	};
	grunt.template.process('<%= baz %>', {data: obj}) // 'abcde'

###grunt.template.setDelimiters

设置[Lo-Dash模板](http://lodash.com/docs/#template)分隔符为预定义的, 以便你的`grunt.util._.template`需要手动的调用. `config`分隔符`<% %>`是默认包含的.

*你或许不需要使用这个方法, 因为你将使用`grunt.template.process`在内部使用这个方法*.
	
	grunt.template.setDelimiters(name)

###grunt.template.addDelimiters

添加一组命名[Lo-Dash模板](http://lodash.com/docs/#template)分隔符. 你或许不需要使用这个方法, 因为内置的分割符应该足以使用, 但是你可以随时添加`<% %>`或者`[% %]`风格的分隔符.

	grunt.template.addDelimiters(name, opener, closer)

##帮助

###grunt.template.date

使用[dateformat库](https://github.com/felixge/node-dateformat)格式化一个日期.

	grunt.template.date(date, format)

这里有一个例子, 一个指定的日期将被格式化为月/日/年.

	grunt.template.date(847602000000, 'yyyy-mm-dd') // '1996-11-10'

###grunt.template.today

使用[dateformat库](https://github.com/felixge/node-dateformat)格式化今天的日期.

	grunt.template.today(format)

这里有一个例子, 今天的日期将被格式化为一个4位数的年份.

	grunt.template.today('yyyy')  //'2013'

*(有人提醒我每年更新这个日期, 因此这个文档只出现当前年份的日期)*.