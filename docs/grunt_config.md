#grunt.config

使用定义在Gruntfile中具体的项目配置数据。

注意在`grunt`对象中任何使用☃(unicode形式的雪人)标记的方法都是直接有效的，任何在任务内的`this`对象中使用☆(白色星星)标记的方法也是有效的。这些都是你需要知道的。

##初始化配置数据

*注意下面的方法在`grunt`对象中如同`grunt.initConfig`中一样都是可用的。*

###grunt.config.init

初始化当前项目的一个配置对象。任务所使用的指定的`configObject`可以使用`grunt.config`方法访问。几乎每一个项目的Gruntfile都将调用这个方法。

	grunt.config.init(configObject)
	
注意任何指定的`<% %>`模板字符串在配置数据解析之后都将被处理。

这里有一个[grunt-contrib-jshint插件](https://github.com/gruntjs/grunt-contrib-jshint)的`jshint`任务包含了简单的配置数据。

	grunt.config.init({
		jshint: {
			all: ['lin/*.js', 'test/*.js', 'Gruntfile.js']
		}
	});
	
查看[入门](http://www.gruntjs.com/)指南可以看到更多的配置的例子。

*这个方法如同`grunt.initConfig`一样也是有效的。*

###使用配置数据

下面的方法允许通过点号分割的字符串, 像`pkg.author.name`, 或者通过属性名数组, 像`['pkg','author', 'name']`来访问Grunt配置数据.

注意如果指定的属性名中包含一个`.`，它必须使用一个斜线字符进行转义。例如: `concat.dist/built\\.js`。如果指定了一个数组部分，grunt将使用`grunt.config.escape`方法在内部进行转义处理。

###grunt.config

从项目的grunt配置中获取或者设置一个值。这个方法作为其他方法的别名；如果传递两个参数，`grunt.config.set`被调用，另一方面`grunt.config.get`也被调用。

	grunt.config([prop [, value]]);
	
###grunt.config.get

从项目的grunt配置中获取一个值。如果指定`prop`，则返回该属性的值；如果没有定义该属性则返回`null`。如果没有指定`prop`，返回一个完整的配置对象副本。模板字符串将使用`grunt.config.process`方法进行递归处理。

	grunt.config.get([prop]);
	
###grunt.config.process

处理一个值，在grunt配置环境内递归展开`<% %>`模板(通过`grunt.template.process`方法)，当遇到这种情况时。这个方法通过`grunt.config.get`但不是`grunt.config.getRow`自动调用。

	grunt.config.process(value);
	
如果检索到任意的独立的`'<%= foo %>'`或者`'<%= foo.bar %>'`模板字符串，并且指定的`foo`或者`foo.bar`属性是一个非字符串值(不是`null`或者`undefined`)，它将指向实际的值。结合grunt任务系统自动处理数组的功能，它是非常有用的。

###grunt.config.getRaw

从项目的grunt配置中获取一个原始值，没有经过处理的`<% %>`模板字符串。如果指定了`prop`，返回该属性的值，或者如果该属性没有定义则返回`null`。如果没有指定`prop`，返回一个完成的配置对象副本。

	grunt.config.getRaw([prop])

###grunt.config.set

给项目的grunt配置设置一个值。

	grunt.config.set(prop, value)
	
注意任意指定的`<% %>`模板字符串只会在检索配置数据时处理。

###grunt.config.escape

忽略给定的`propString`中的`.`点号. 这应该用于包含点号的属性名.

    grunt.config.escape(propString);

##载入配置数据

*注意下面列出的方法在任务内部的`this`对象中如同`this.requiresConfig`一样也是有效的。*

###grunt.config.requires ☆

如果省略一个或者多个需要的配置属性, 为`null`或者`undefined`当前任务将失败. 配置属性可以指定一个或者多个字符串或者数组。

	grunt.config.requires(prop [, prop [, …]])
	
*这个方法在任务内部如同`this.requiresConfig`一样也是有效的。*