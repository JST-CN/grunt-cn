#Configuring tasks

这个指南说明了如何在你的项目中使用一个Gruntfile配置任务。如果你不知道Gruntfile是什么，你可以阅读Getting Stated指南和参考Sample Gruntfile。

##Grunt配置

在你的Gruntfile中通过`grunt.initConfig`方法处理任务配置额详细信息。这个配置多数都在命名任务属性之下，它可以包含任意的数据。同样的这些属性和你的任务需求属性不能冲突，否则它们会被忽略。

同样，因为这是一个JavaScript，你不仅限于使用JSON；你可以在这里使用任何通过验证的JavaScript。如果有必要你可以使用等价的方式生成这个配置。

	grunt.initConfig({
		concat: {
			//这里包含任务配置
		},
		uglify: {
			//这里配置uglify任务
		},
		//任意非任务相关的属性
		my_property: 'whatever',
		my_src_files: ['foo/*.js', 'bar/*.js']
	});
	
##任务配置和目标

当运行一个任务时，Grunt的配置看起来和其下面的属性同名。多个任可以拥有多个配置，使用任意的"targets"命名定义。在下面的例子中，`concat`任务有`foo`和`bar`两个目标，而`uglify`任务仅仅只有一个`bar`目标。

	grunt.initConfig({
		concat: {
			foo: {
				// 这里是concat任务的foo目标的选项和文件
			},
			bar: {
				// 这里是concat任务的bar目标的选项和文件
			}
		},
		uglify: {
			bar: {
				// 这里是uglify任务目标的选项和文件
			}
		}
	});
	
指定一个类似`grunt concat:foo`或者`grunt concat:bar`的任务和目标将立即处理配置中的具体目标，然而运行`grunt concat`将迭代所有的目标，依次处理他们。注意可如果一个任务需要重命名可以在grunt.renameTask中处理，Grunt将在配置对象中使用一个新的任务名称处理相关属性。

##选项

在一个任务配置中，`options`属性可以可以通过指定覆盖内置的defaults。每个目标都可以有一个`options`属性用来添加指定的目标。目标级的options将覆盖任务级的options。

`options`对象是可选的，如果不需要它是可以省略的。

	grunt.initConfig({
		concat: {
			// 任务级配置
		},
		foo: {
			options: {
				// 'foo'目标任务配置，会覆盖任务级的配置
			}
		},
		bar: {
			// 没有指定options, 将使用任务级的options
		}
	});
	
##文件

因为大多数任务执行文件进行操作，当一个操作一个任务文件时Grunt有一个强大的概念进行解析。这里有多种方式定义**src-dest**(目标资源)的文件地图，视图改变冗长的任务和控制。下面的形式可以理解多数的任务，因此你可以选择任意你需要的最好的格式。

所有的文件格式都支持`src`和`dest`，而且"Compact"和"Files Array"格式还支持一些新增的属性：

+  `filter`验证传递给fs.Starts method name或者一个函数文件路径并返回其中的`true`或者`false`。
+  `nonull`当没有找到一个匹配，返回其自身包含的列表。另一方面，如果没有匹配则反回一个空列表。结合grunt的`--verbose`表示，这个选项可以帮主调试文件路径的问题。
+  `dot`允许开始阶段匹配文件名的模式，与明确的指定在某个阶段的模式类似。
+  如果设置`matchBase`，如果包含语法matchBase将匹配对应的基础文件的路径语法模式，例如, a?b将匹配`/xyz/123/abc`路径，但不匹配`/xyz/abc/123`。
+  `expand`将处理一个动态的src-dest的文件地图，可以在"创建动态的文件对象"中查看更多的信息。
+  其他的属性将作为匹配选项传递到下面的选项中。可以在node-glob和minimatch中查看更多的文档选项。

###简洁的格式

这种形式允许一个单一的src-dest文件地图目标。它大多数情况下都只是只读的任务，类似grunt-contrib-jshint，哪里需要一个单一的`src`属性，而没有`dest`健相关联。这种形式总是支持新增属性给src-dest文件地图。

	grunt.initConfig({
		jshint: {
			foo: {
				src: ['src/aa.js', 'src/aaa.js']
			}
		},
		concat: {
			bar: {
				src: ['src/bb.js', 'src/bbb.js'],
				dest: dest/b.js'
			}
		}
	});

###对象文件格式

这个形式支持多个src-dest文件地图目标，属性名声明在目标文件中，其值就是文件资源。这种方式需要指定对个src-dest文件地图, 但是添加属性可能不会指向地图。

	grunt.initConfig({
		concat: {
			foo: {
				files: {
					'dest/a.js': ['src/aa.js', 'src/aaa.js'],
					'dest/a1.js': ['src/aa1.js', 'src/aaa1.js']
				}
			},
			bar: {
				files: {
					'dest/b.js': ['src/bb.js', 'src/bbb.js'],
					'dest/b1.js': ['src/bb1.js', 'src/bbb1.js']
				}
			}
		}
	});
	
###数组文件格式

这种形式支持对个src-dest文件地图目标，它总是允许添加属性到地图中。
	
	grunt.initConfig({
		concat: {
			foo: {
				files: [
					{src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
					{src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'}
				]
			},
			bar: {
				files: [
					{src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b.js'},
					{src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1.js'}
				]
			}	
		}
	});
	
###较早的格式

**dest-as-target**文件格式是从之前的多任务过渡和继续使用的形式，目标文件路径是实际的目标文件名。不幸的是，由于目标名称是文件路径，运行`grunt task:target`可能是不合适的。同样的是你不能指定目标级的选项或者添加属性到src-dest文件地图。

考虑到这种格式是不推荐的，应该合理的避免它。

	grunt.initConfig({
		concat: {
			'dest/a.js': ['src/aa.js', 'src/aaa.js'],
			'dest/b.js': ['src/bb.js', 'src/bbb.js']
		}
	});
	
###自定义过滤函数

`filter`属性可以给你的目标文件一个较详细的信息。简单的使用一个通过验证的fs.Statsmethod name. 如果下面的模式匹配一个实际的文件将对他进行清理:

	grunt.initConfig({
		clean: {
			foo: {
				src: ['tmp/**/*'],
				filter: 'isFile'
			}
		}
	});
	
或者你可以创建你自己的`filter`函数并且返回`true`或者`false`当文件匹配时。例如下面将清理一个空目录:

	grunt.initConfig({
		clean: {
			foo: {
				src: ['tmp/**/*'],
				filter: function(filepath){
					return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
				}
			}
		}
	});
	
###通用模式

通常不能的单独指定左右资源的文件路径，因此Grunt支持通过使用内置的grunt-glob和minimatch库来扩展文件名(我们所熟悉的通配符)

然而它并不是一个通用的综合教程，来了解一下文件路径:

+  `*`匹配除`/`之外的任意数量的字符
+  `?`匹配除`/`之外单一的字符
+  `**`匹配任意数量的字符包括`/`, 只要它仅仅是路径的一部分
+  `{}`允许在'or'表达式中使用一个逗号分割的列表
+  `!`在一个模式的开始将否定一个匹配

大多数人都会知道`foo/**.js`将匹配所有位于`foo/`字母中以`.js`结尾的文件，但是`foo/**/*.js`将匹配所有的位于`foo/`子目录和该目录所有子目录中的`.js`文件。

同样的，为了简化其他方面的复杂的通配模式，Grunt允许指定数组文件路径或者通配符模式。模式按顺序进行处理，带有`!`前缀的模式排除从返回结果中匹配的文件。返回的结果是独特的。

实例：

	// 你可以指定的单独的文件
	{src: 'foo/this.js', dest: …}
	// 或者文件数组
	{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: …}
	// 或者你可以使用一个通配符
	{src: 'foo/th*.js', dest: …}
	
	//单一的node通配
	{src: 'foo/{a,b}*.js', dest: …}
	//也可以这样书写
	{src: ['foo/a*.js', 'foo/b*.js'], dest: …}
	
	//所有的.js文件，foo/中依次输出
	{src: ['foo/*.js'], dest: …}
	//这里首先是bar.js，接下来是其他的文件，依次输出
	{src: ['foo/bar.js', 'foo/*.js'], dest: …}
	
	//除了bar.js之外的所有文件顺序
	{src: ['foo/*.js', '!foo/bar.js'], dest: …}
	//所有的文件顺序，但是bar.js在最后
	{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: …}
	
	//在文件路径或者通配模式中使用模板
	{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
	//它们也可能引用配置中定义的文件列表
	{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: …}
	
在更多的通配模式信息请查看node-glob和minimatch文档

###动态的创建文件对象

当你希望传递更多的独特的文件时，可以添加少量的属性用于构建一个动态的文件列表。这些属性可以通过在'Compact'和'Files Array'中指定文件替地图的形式处理。

+  `expand`设置`true`用来启用下面的选项：
+  `cwd` 所有的`src`匹配与此相关(但不包含当前路径)的路径。
+  `src`模式去匹配`cwd`相关的。
+  `dest`指定目标路径前缀。
+  `ext`用于替换`dest`路径中生成的任意扩展名。
+  `flatten`替换从`dest`路径中生成的路径部分。
+  `rename`该函数被所有的`src`中匹配的文件调用(重命名和整理之后的扩展)。传递`dest`和匹配的`src`路径，这个函数总是返回一个新的`dest`值。如果相同的`dest`不止返回一次，每个`src`用来将它添加到它的源文件的一个数组中。

在下面的例子中，`minify`任务将在src-dest文件地图的`static_mapping`和`dynamic_mapping`目标中查找相同的列表，假设能找到4个文件，Grunt将自动展开`dynamic_mappings`文件对象到4个独特的静态`static`的src-dest文件地图中--当任务运行时。

可以结合静态的src-dest和动态的src-dest的文件地图指定。

	grunt.initConfig({
		minify: {
			static_mappings: {
				//由于这些src-dest文件地图是手动指定的，每次添加新的文件或者删除文件，Gruntfile都会自动更新。
				files: [
					{src: 'lib/a.js', dest: 'build/a.min.js'},
					{src: 'lib/b.js', dest: 'build/b.min.js'},
					{src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
					{src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'}
				]
			},
			dynamic_mappings: {
				// 当运行'minify'任务运行时Grunt将在"lib/"下搜索"**/*.js"，然后构建适当的src-dest文件地图，因此你不需要更新Gruntfile当新增和删除文件时。
				files: [
					expand: true,
					cwd: 'lib/',
					src: ['**/*.js'],
					dest: 'build/',
					ext: '.min.js'
				]
			}
		}
	});

###模板

当任务从配置中读取任务时使用`<% %>`定界符指定的模板将自动展开。模板将依次展开直到没有更多的信息。

在这些所有的配置文件已经解决了上下文中的一些属性。此外，`grunt`和它的方法在模板中都是可用的。例如.`<%= grunt.template.today('yyyy-mm-dd') %>`。

+  `<%= prop.subprop %>`展开配置文件中`prop.subprop`的值，无论时什么类型。这里的模板可以用于引用不仅限于字符串值，也可以是数组或者其他的对象。
+  `<% %>`执行任意的内联JavaScript代码。这是有利于流程控制或者循环。

在下面的简单的`concat`任务配置中，运行`grunt concat:sample`将生成一个名为`build/abcde.js`的文件，通过banner中的`/* abcde */`连接所有匹配的`foo/*.js`+`bar/*.js`+`baz/*.js`文件。

	grunt.initConfig({
		concat: {
			sample: {
				options: {
					banner: '/* <%- baz %> */\n'
				},
				src: ['<%= qux %>', 'baz/*.js'],
				dest: 'build/<%= baz %>.js'
			}
		},
		//任意属性都用于任务配置的模板
		foo: 'c',
		bar: 'b<%= foo %>d',
		baz: 'a<%= bar %>e',
		qux: ['foo/*.js', 'bar/*.js']
	});
	
###引入外部的数据

在下面的Gruntfile中，项目的元数据从`package.json`文件中引入到Grunt配置里，grunt-contrib-uglify插件的uglify任务被配置用于合并源文件，同时使用元数据生成一个标注注释。

Grunt有`grunt.file.readJSON`和`grunt.file.readYAML`方法用于引入JSON和YAML数据。

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		}
	});