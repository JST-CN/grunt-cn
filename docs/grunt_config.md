# grunt.config

访问定义在Gruntfile中项目特定的配置数据。

注意任何使用☃(unicode形式的雪人)标记的方法直接用在`grunt`对象上都是有效的，任何在任务内部使用☆(白色星星)标记的方法用`this`访问也是有效的。你只需要知道这些就行。

## 初始化配置数据

*注意下面的方法在`grunt`对象上如同在`grunt.initConfig`中都是可用的。*

### grunt.config.init

为当前项目初始化一个配置对象。指定的`configObject`可以在任务中使用，并且可以使用`grunt.config`来访问。几乎每个项目的Gruntfile都会调用这个方法。

	grunt.config.init(configObject)
	
注意任何指定在`<% %>`中模板字符串在配置数据检索完成之后都会被处理。

这里有一个例子包含了[grunt-contrib-jshint插件](https://github.com/gruntjs/grunt-contrib-jshint)的`jshint`任务中的简单的配置数据。

	grunt.config.init({
		jshint: {
			all: ['lin/*.js', 'test/*.js', 'Gruntfile.js']
		}
	});
	
查看[新手入门](http://www.gruntjs.com/)指南可以看到更多的配置相关的例子。

*这个方法还可以作为`grunt.initConfig`来使用。*

### 使用配置数据

下面的方法允许通过点号分割的字符串--像`pkg.author.name`或者通过属性名数组--像`['pkg','author', 'name']`来访问Grunt配置数据。

注意如果指定的属性名中包含一个`.`(点号)，就须使用一个斜线字符进行转义。例如: `concat.dist/built\\.js`。如果指定了一个数组部分，grunt将使用`grunt.config.escape`方法在内部进行转义处理。

### grunt.config

从项目的Grunt配置中获取或者设置一个值。这个方法时其他两个具体方法的别名；如果传递两个参数，则`grunt.config.set`被调用，否则调用`grunt.config.get`。

	grunt.config([prop [, value]]);
	
### grunt.config.get

从项目的grunt配置中获取一个值。如果指定`prop`，则返回该属性的值；如果没有定义该属性则返回`null`。如果没有指定`prop`，则返回一个完整的配置对象副本。模板字符串将使用`grunt.config.process`方法以递归的方式处理。

	grunt.config.get([prop]);
	
### grunt.config.process

处理一个值，当遇到这种情况时，它会在Grunt配置上下文环境中以递归方式展开`<% %>`模板(通过`grunt.template.process`方法实现)。这个方法会通过`grunt.config.get`来自动调用而不是`grunt.config.getRow`方法。

	grunt.config.process(value);
	
如果检索到任意的独立的`'<%= foo %>'`或者`'<%= foo.bar %>'`模板字符串，并且其中所指定的`foo`或者`foo.bar`属性是一个非字符串值(不是`null`或者`undefined`)，它会指向实际的值。结合grunt任务系统自动处理数组的功能，它是非常有用的。

### grunt.config.getRaw

从项目的grunt配置数据中获取一个原始值，而不是经过处理的`<% %>`模板字符串。如果指定了`prop`，返回该属性的值，或者如果该属性没有定义则返回`null`。如果没有指定`prop`属性，则返回一个完成的配置对象副本。

	grunt.config.getRaw([prop])

### grunt.config.set

在项目的Grunt配置中设置一个值。

	grunt.config.set(prop, value)
	
注意任何指定在`<% %>`模板字符串都只会在检索配置数据时处理。

### grunt.config.escape

忽略给定的`propString`中的`.`点号。这个方法这应该用于处理包含点号的属性名的情况。

    grunt.config.escape(propString);

## 载入配置数据

*注意下面列出的方法在任务内部的`this`对象中就是`this.requiresConfig`。*

### grunt.config.requires ☆

如果省略一个或者多个项目所需的配置属性, 或者属性值为`null`或者`undefined`当前任务就会失败。 可以指定一个或者多个字符串或者数组形式的配置属性。

	grunt.config.requires(prop [, prop [, …]])
	
*这个方法就是任务内部的`this.requiresConfig`。*