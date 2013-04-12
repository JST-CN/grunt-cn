#配置任务

这个指南说明了如何在你的项目中使用一个Gruntfile配置任务。如果你不知道Gruntfile是什么，请阅读[Getting Stated](http://gruntjs.com/getting-started/)指南和参考[Sample Gruntfile](http://gruntjs.com/sample-gruntfile)。

##Grunt配置

在你的Gruntfile通过`grunt.initConfig`指定任务配置。这个配配置主要是基于命名任务属性，但是它可能包含任意的数据。只要这些属性不与你的任务需求项冲突，否则它们会被忽略。

同样，因为这是JavaScript，你不仅限于使用JSON；你可以在这里使用任何有效的JavaScript。如果有必要你可以使用编程的方式生成这个配置。

	grunt.initConfig({
		concat: {
			//这里时concat任务配置
		},
		uglify: {
			//这里是uglify任务配置
		},
		//其他的非任务指定属性
		my_property: 'whatever',
		my_src_files: ['foo/*.js', 'bar/*.js']
	});
	
##任务配置和目标

当运行一个任务时，Grunt会查找它的配置中的同名属性。多个任可以拥有多个配置，定义任意命名的"targets"。在下面的例子中，`concat`任务有`foo`和`bar`两个目标，而`uglify`任务仅仅只有一个`bar`目标。

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
	
指定像`grunt concat:foo`或`grunt concat:bar`两个任务和目标将只处理指定目标的配置，然而运行`grunt concat`将遍历所有的目标，并依次处理他们。注意如果一个任务使用[grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask)重命名过，Grunt将在配置对象中查找新的任务名称。

##选项

在一个任务配置里面，`options`属性可以被用来指定覆盖内置的默认值。此外，每个目标都可以有一个`options`属性用来指定具体的目标。目标级的选项将覆盖任务级的选项。

`options`对象是可选的，如果不需要它是可以省略的。

	grunt.initConfig({
		concat: {
			options: {
				//这里是任务级的选项，覆盖任务的默认值
			},
			foo: {
				options: {
					// 这里是"foo"目标的选项，覆盖任务级的选项
				}
			},
			bar: {
				// 没有指定选项，这个目标将使用任务级的选项
			}
		},
	});
	
##文件

因为大多数任务都是执行文件操作，Grunt有一个很抽象的声明哪个文件应该执行什么任务。这里有多种方式定义**src-dest**(资源目标)的文件劲射关系，提供不同程度的冗长和控制。任意多任务都会理解一以下格式，因此你可以任意选择最符合你需求的格式。

所有的文件格式都支持`src`和`dest`，而且"Compact"(精简)和"Files Array"(文件数组)格式还支持一些额外的属性：

+  `filter` 一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)或者一个函数通过匹配`src`文件路径并返回`true`或者`false`。
+  `nonull` 当没有找到匹配，返回一个包含模式自身的列表。否则，如果没有匹配则反回一个空列表。结合grunt的`--verbose`标志，这个选项可以帮助调试文件路径的问题。
+  `dot` 允许模式匹配句点开头的文件名，即使模式中没有包含一个明确的句点。
+  如果设置`matchBase`，模式将匹配包含斜线的文件路径中对应的没有斜线的名称，例如, a?b将匹配`/xyz/123/abc`路径，但不匹配`/xyz/abc/123`。
+  `expand` 处理一个动态的src-dest的文件映射，可以在"创建动态的文件对象"中查看更多的信息。
+  其他属性将传递到底层库中作为匹配项。查看[node-glob](https://github.com/isaacs/node-glob)和[minimatch](https://github.com/isaacs/minimatch)文档了解更多选项。

###精简格式

这种形式允许一个单一的**src-dest**(资源目标)映射每个目标。它常用于只读任务，像[grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)，需要一个单一的`src`属性，而不需要相关的`dest`键。这种格式还支持额外的src-dest文件映射属性。

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

###文件对象格式

这个形式支持多个src-dest映射每个目标，其中属性名称就是目标文件，其值就是源文件。使用这种方式可以指定任意数量的src-dest文件映射, 但是可能不能指定额外的映射属性。

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
	
###文件数组格式

这种形式支持多个src-dest文件映射目标，同时也允许在映射中使用额外的属性。
	
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
	
###旧格式

**dest-as-target**文件格式是之前使用的多任务和目标遗留下来的，目标文件路径实际上就是目标文件名。不幸的是，由于目标名称是文件路径，运行`grunt task:target`可能是不合适的。还有你不能给src-dest文件映射指定目标级的选项或者额外的属性。

考虑到这种格式已经弃用，应该合理的避免它。

	grunt.initConfig({
		concat: {
			'dest/a.js': ['src/aa.js', 'src/aaa.js'],
			'dest/b.js': ['src/bb.js', 'src/bbb.js']
		}
	});
	
###自定义过滤函数

`filter`属性可以给你目标文件一个更高级别的帮助信息。只需要使用一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats). 下面的模式仅仅过滤实际的文件:

	grunt.initConfig({
		clean: {
			foo: {
				src: ['tmp/**/*'],
				filter: 'isFile'
			}
		}
	});
	
或者你可以创建你自己的`filter`函数来匹配文件并返回`true`或者`false`。例如下面的例子将过滤一个空目录:

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
	
###匹配模式

通常不能的单独指定所有源文件的路径，因此Grunt也可以通过内置的[node-glob]()和[minimatch]()库支持文件名扩展(例如都知道的通配符)。

然而着不是一个全面的匹配模式教程，但是要了解一下文件路径:

+  `*`匹配除`/`之外的任意数量的字符
+  `?`匹配除`/`之外单一的字符
+  `**`匹配任意数量的字符包括`/`, 只要它是路径独有的一部分
+  `{}`允许一个逗号分割的"or"表达式列表
+  `!`在一个模式的开头将否定一个匹配

大多数人都需要知道`foo/**.js`将匹配所有位于`foo/`子目录中以`.js`结尾的文件，但是`foo/**/*.js`将匹配所有的位于`foo/`子目录和该目录所有子目录中的`.js`文件。

同样的，为了简化复杂的匹配模式，Grunt允许指定数组文件路径或者匹配模式。模式按顺序进行处理，带有`!`前缀的模式排除从返回结果中匹配的文件。结果集时唯一的。

实例：

	// 你可以指定的单独的文件
	{src: 'foo/this.js', dest: …}
	// 或者文件数组
	{src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: …}
	// 或者你可以使用一个匹配模式
	{src: 'foo/th*.js', dest: …}
	
	//单一的node-glob模式
	{src: 'foo/{a,b}*.js', dest: …}
	//也可以这样书写
	{src: ['foo/a*.js', 'foo/b*.js'], dest: …}
	
	//foo/目录中所有的.js文件，按字母排序
	{src: ['foo/*.js'], dest: …}
	//这里首先是bar.js，接下来是剩余文件，按字母排序
	{src: ['foo/bar.js', 'foo/*.js'], dest: …}
	
	//除了bar.js之外的所有文件，按字母排序
	{src: ['foo/*.js', '!foo/bar.js'], dest: …}
	//所有的文件按字母排序，但是bar.js在最后
	{src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: …}
	
	//在文件路径或者匹配模式中使用模板
	{src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
	//它们也可能引用其他地方定义的配置
	{src: ['foo/*.js', '<%= jshint.all.src %>'], dest: …}
	
在更多的通配模式信息请查看node-glob和minimatch文档

###动态的创建文件对象

当你希望处理多个单个文件时，一些附加的属性可以用于构建一个动态的文件列表。这些属性可以指定在'Compact'和'Files Array'两个文件映射格式中。

+  `expand` 设置`true`用来启用下面的选项：
+  `cwd` 匹配所有相对于`src`的路径(但不包括这个路径)。
+  `src` 相对于`cwd`的匹配模式。
+  `dest`指定目标路径前缀。
+  `ext` 用于替换所有存在于`dest`路径中的文件扩展名。
+  `flatten` 删除所有`dest`路径中生成的路径部分。
+  `rename` 调用这个函数匹配每一个	`src`文件(压缩之后的扩展名)。传递的`dest`和`src`路径匹配时，这个函数总是返回一个新的`dest`值。如果总是返回同一个`dest`，每个使用过的`src`都会添加到一个数组资源中。

在下面的例子中，`minify`任务将在相同的src-dest文件映射列表中查找`static_mappings`和`dynamic_mappings`两个目标，当让任务运行时，Grunt将自动展开`dynamic_mappings`的文件对象到4个单独的静态的src-dest文件映射中--假如能够找到4个文件。

可以结合静态的src-dest和动态的src-dest的文件地图指定。

	grunt.initConfig({
		minify: {
			static_mappings: {
				//由于这些src-dest文件映射是手动指定的，每次添加新的文件或者删除文件，Gruntfile都会自动更新。
				files: [
					{src: 'lib/a.js', dest: 'build/a.min.js'},
					{src: 'lib/b.js', dest: 'build/b.min.js'},
					{src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
					{src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'}
				]
			},
			dynamic_mappings: {
				// 当运行'minify'任务运行时Grunt将在"lib/"下搜索"**/*.js"，然后构建适当的src-dest文件映射，因此当新增和删除文件时你不需要更新Gruntfile。
				files: [
					expand: true, //启用动态扩展
					cwd: 'lib/', // src相对于这个路径进行匹配
					src: ['**/*.js'], //实际的匹配模式
					dest: 'build/',  //目标路径前缀
					ext: '.min.js' //目标路径的文件扩展名
				]
			}
		}
	});

###模板

当读取任务时使用`<% %>`分隔符指定的模板将从配置中扩展。模板将递归的方式展开直到没有其他的信息。

整个配置对象解决了上下文环境中的属性。此外，`grunt`和它的方法在模板中都是有效的。例如.`<%= grunt.template.today('yyyy-mm-dd') %>`。

+  `<%= prop.subprop %>`展开配置文件中`prop.subprop`的值，无论是什么类型。这样的模板不仅可以用于引用字符串值，也可以是数组或者其他的对象。
+  `<% %>`执行任意的内联JavaScript代码。这是有利于流程控制或者循环。

在下面的简单的`concat`任务配置中，运行`grunt concat:sample`将生成一个名为`build/abcde.js`的文件，通过标题中的`/* abcde */`连接所有匹配的`foo/*.js`+`bar/*.js`+`baz/*.js`文件。

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
		//用于任务配置模板的任意属性
		foo: 'c',
		bar: 'b<%= foo %>d',
		baz: 'a<%= bar %>e',
		qux: ['foo/*.js', 'bar/*.js']
	});
	
###引入外部的数据

在下面的Gruntfile中，项目的元数据从`package.json`文件中被引入到Grunt配置里，[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件的uglify任务被配置用于压缩源文件，同时使用元数据生成一个标题注释。

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