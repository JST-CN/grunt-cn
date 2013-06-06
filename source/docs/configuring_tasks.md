#配置任务

这个指南解释了如何使用一个Gruntfile给你的项目配置任务. 如果你不知道Gruntfile是什么, 请先阅读[入门](http://gruntjs.com/getting-started/)文档并检出一个[简单的Gruntfile](http://gruntjs.com/sample-gruntfile/).

##Grunt配置

任务配置通过`grunt.initConfig`方法被指定在你的Gruntfile中. 这个配置主要是依据任务命名属性, 也可以包含任意的数据. 但这些属性不能与你的任务所需要的属性想冲突, 否则它将被忽略.

此外, 由于这本质上就是JavaScript, 因此你不仅限于使用JSON; 你可以在这里使用任何有效的JavaScript. 必要的情况下, 你甚至可以以编程的方式生成配置.

    grunt.initConfig({
        concat: {
            //这里是concat任务的配置信息
        },
        uglify: {
            //这里是uglify任务的配置信息
        },
        //任意非任务特定属性
        my_property: 'whatever',
        my_src_file: ['foo/*.js', 'bar/*.js']
    });
    
##任务配置和目标

当运行一个任务时, Grunt会依据同名属性来查找它的配置. 多个任务可以拥有多个配置, 可以使用任意的命名'目标'来定义. 在下面的例子中, `concat`任务有`foo`和`bar`两个目标, 而`uglify`任务仅仅只有一个`bar`目标.

    grunt.initConfig({
        concat: {
            foo: {
                // 这里是concat任务'foo'目标的选项和文件
            },
            bar: {
                // 这里是concat任务'bar'目标的选择和文件
            }
        },
        uglify: {
            bar: {
                // 这里是uglify任务'bar'目标的选项和文件
            }
        }
    });
    
指定像`grunt concat:foo`或者`grunt concat:bar`的任务和目标将只处理指定的目标配置, 而运行`grunt concat`将遍历所有的目标并分别处理它们. 注意, 如果一个任务使用[grunt.renameTask](https://github.com/gruntjs/grunt/wiki/grunt#wiki-grunt-renameTask)重命名过, Grunt将在配置对象中查找新的任务名称属性.

##options

在任务配置中, `options`属性可以用来指定覆盖内置属性默认的值. 此外, 每一个目标中更具体的目标都可以拥有一个`options`属性. 目标级的选项将会覆盖任务级的选项.

`options`对象是可选, 如果不需要, 则可以省略它.

    grunt.initConfig({
        concat: {
            options: {
                // 这里是任务级的Options, 覆盖任务的默认值 
            },
            foo: {
                options: {
                    // 这里是'foo'目标的options, 它会覆盖任务级的options.
                }
            },
            bar: {
                // 没有指定options, 这个目标将使用任务级的options
            }
        }
    });
    
##文件

由于大多的任务都是执行文件操作, Grunt有一个强大的抽象声明说明任务应该操作哪些文件. 这里有好几种定义**src-dest**(源文件-目标文件)文件映射的方式, 都提供了不同程度的描述和控制操作. 任何多任务都能理解下面的格式, 所以你只需要选择满足你需求的格式.

所有的文件格式都支持`src`和`dest`属性, 此外"Compact"和"Files Array"格式还支持一些额外的属性:

+ `filter` 它通过接受任意一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats)或者一个函数来匹配`src`文件路径并返回`true`或者`false`.

+ `nonul` 当一个匹配没有被检测到时, 它返回一个包含模式自身的列表. 否则, 如果没有任何匹配项时它返回一个空列表. 结合Grunt的`--verbore`标志, 这个选项可以帮助用来调试文件路径的问题.

+ `dot` 它允许模式使用句点匹配文件名的开始部分, 即使模式并不明确文件名开头部分是否有句点.

+ `matchBase` 如果设置这个属性, 缺少斜线的模式(意味着模式中不能使用斜线进行文件路径的匹配)将不会匹配包含在斜线中的文件名. 例如, a?b将匹配`/xyz/123/acb`但不匹配`/xyz/acb/123`. 

+ `expand` 处理动态的src-dest文件映射, 更多的信息请查看"构建动态的文件对象".

+ 其他的属性将以匹配项的形式传递给底层的库. 在[node-glob](https://github.com/isaacs/node-glob)和[minimatch](https://github.com/isaacs/minimatch)文档中可以查看更多的属性选项.

###简洁格式

这种形式允许每个目标对应一个单独的**src-dest**文件映射. 通常情况下它被用于只读任务, 比如[grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint), 它只需要一个独立的`src`属性, 并没有相关的`dest`键. 这种格式还支持给每个文件映射附加其他属性.

    grunt.initConfig({
        jshint: {
            foo: {
                src: ['src/aa.js', 'src/aaa.js']
            }
        },
        concat: {
            bar: {
                src: ['src/bb.js', 'src/bbb.js'],
                dest: 'dest/b.js'
            }
        }
    });
    
###文件对象格式

这种形式支持每个任务目标对应多个文件映射, 属性名就是目标文件, 源文件就是它的值. 可以使用这种方式指定数个src-dest文件映射, 但是不能够给每个映射指定附加的属性.

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

这种形式支持每个任务目标对应多个src-dest文件映射, 同时也允许每个映射拥有附加副属性:

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
                    {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
                    {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'}
                ]
            }
        }
    });
    
###旧格式

**dest-as-target**文件格式在存在多任务和目标形式之前是一个过渡形式, 目标文件路径实际上就是目标名称. 遗憾的是, 目标名称就是文件路径, 运行`grunt task:target`可能是不合适的. 此外, 你不能指定一个目标级的options或者附加属性给每个src-dest文件映射.

    grunt.initConfig({
        concat: {
            'dest/a.js': ['src/aa.js', 'src/aaa.js'],
            'dest/b.js': ['src/bb.js', 'src/bbb.js']
        }
    });
    
###自定义过滤函数

`filter`属性可以给你的目标文件提供一个更高级别的详细帮助. 只需要使用一个有效的[fs.Stats方法名](http://nodejs.org/docs/latest/api/fs.html#fs_class_fs_stats). 下面的配置仅仅清理一个与模式匹配的真实文件:

    grunt.initConfig({
        clean: {
            foo: {
                src: ['temp/**/*'],
                filter: 'isFile'
            }
        }
    });
    
或者创建你自己的`filter`函数根据该文件是否匹配返回`true`或者`false`. 下面的例子将仅仅清理一个空目录:

    grunt.initConfig({
        clean: {
            foo: {
                src: ['temp/**/*'],
                filter: function(filepath){
                    return (grunt.file.isDir(filepath) && require('fs').readdirSync(filepath).length === 0);
                }
            }
        }
    });
    
###匹配模式

通常分别指定所有源文件路径的是不切实际的, 因此Grunt支持通过内置的[node-glob](https://github.com/isaacs/node-glob)和[minimatch](https://github.com/isaacs/minimatch)库来展开文件名(众所周知的匹配模式).

当然这并不是一个综合的匹配模式教程, 你只需要直到文它们在文件路径中如何使用:

+ `*`匹配任意数量的字符, 但不匹配`/`
+ `?`匹配单个字符, 但不匹配`/`
+ `**`匹配任意数量的字符, 包括`/`, 只要它是路径中唯一的一部分
+ `{}`允许一个逗号分割的列表或者表达式
+ `!`在模式的开头用于否定一个模式(即排除与模式匹配的信息)

大多的人只需要知道`foo/*.js`将匹配位于`foo/`目录下的所有的`.js`结尾的文件, 而`foo/**/*js`将匹配`foo/`目录以及其子目录中所有以`.js`结尾的文件.

此外, 为了简化原本复杂的匹配模式, Grunt允许指定一个数组形式的文件路径或者一个匹配模式. 模式处理的过程中, 带有`!`前缀模式不包含结果集中与模式相配的文件. 结果集是唯一的.

示例:

    //可以指定单个文件
    {src: 'foo/this.js', dest: …}
    //或者指定一个文件数组
    {src: ['foo/this.js', 'foo/that.js', 'foo/the-other.js'], dest: …}
    //或者使用一个匹配模式
    {src: 'foo/th*.js', dest: …}
    
    //一个独立的node-glob模式
    {src: 'foo/{a,b}*.js', dest: …}
    //也可以这样编写
    {src: ['foo/a*.js', 'foo/b*.js'], dest: …}
    
    //foo目录中所有的.js文件, 按字母排序
    {src: ['foo/*js'], dest: …}
    //这里首先是bar.js, 接着是剩下的.js文件按字母排序
    {src: ['foo/bar.js', 'foo/*.js'], dest: …}
    
    //除bar.js之外的所有的.js文件, 按字母排序
    {src: ['foo/*.js', '!foo/bar.js'], dest: …}
    //所有.js文件按字母排序, 但是bar.js在最后.
    {src: ['foo/*.js', '!foo/bar.js', 'foo/bar.js'], dest: …}
    
    //模板也可以用于文件路径或者匹配模式中
    {src: ['src/<%= basename %>.js'], dest: 'build/<%= basename %>.min.js'}
    //它们也可以引用在配置中定义的其他文件列表
    {src: ['foo/*.js', '<%= jshint.all.src %>'], dest: …}
    
可以在[node-glob](https://github.com/isaacs/node-glob)和[minimatch](https://github.com/isaacs/minimatch)文档中查看更多的关于匹配模式的语法.

###构建动态文件对象

当你希望处理一些单数的文件时, 这里有一些附加的属性可以用来构建一个动态的文件. 这些属性可能可以同时制定在`Compact`和`Files Array`映射格式中.

+ `expand` 设置`true`用于启用下面的选项:
+ `cwd` 相对于向前路径想匹配的所有`src`路径(但不包括当前路径.)
+ `src` 模式用于匹配相对于`cwd`的路径.
+ `dest` 目标文件路径前缀.
+ `ext` 使用这个属性值替换生成的`dest`路径中所有实际存在文件的扩展名.
+ `flatten` 从生成的`dest`路径中移除所有的路径部分.
+ `rename` 对每个匹配的`src`文件调用这个函数(然后重命名扩展名以及进行压缩处理). 传递`dest`和匹配的`src`路径给它, 这个函数应该返回一个新的`dest`值. 如果相同的`dest`返回不止一次, 每个使用它的`src`来源都将被添加到一个数组中.

在下面的示例中, 当任务运行时, 由于Grunt将自动展开`dynamic_mappings`文件对象从4个独立的静态src-dest文件映射中, 假设4个文件都能找的找到, `minify`任务将在`static_mappings`和`dynamic_mappings`目标中查找相同的src-dest文件映射.

可以指定任意结合的静态src-dest和动态的src-dest文件映射.

    grunt.initConfig({
        minify: {
            static_mappings: {
                //由于这里的src-dest文件映射时手动指定的, 每一次新的文件添加或者删除文件时, Gruntfile都需要更新
                files: [
                    {src: 'lib/a.js', dest: 'build/a.min.js'},
                    {src: 'lib/b.js', dest: 'build/b.min.js'},
                    {src: 'lib/subdir/c.js', dest: 'build/subdir/c.min.js'},
                    {src: 'lib/subdir/d.js', dest: 'build/subdir/d.min.js'}
                ]
            },
            dynamic_mappings: {
                //当'minify'任务运行时Grunt将自动在"lib/"下搜索"**/*.js", 然后构建适当的src-dest文件映射, 因此你不需要在文件添加或者移除时更新Gruntfile
                files: [
                    {
                        expand: true, //启用动态扩展
                        cwd: 'lib/', //批匹配相对lib目录的src来源
                        src: '**/*.js', //实际的匹配模式
                        dest: 'build/', 目标路径前缀
                        ext: '.min.js' 目标文件路径中文件的扩展名.
                    }
                ]
            }
        }
    });
    
###模板

使用`<% %>`分隔符指定的模板在任务从它们的配置中读取到时将自动展开. 模板被递归的展开直到配置中不再存在遗留的模板信息.

整个配置对象配置对象的属性在上下文环境中都是不冲突的. 此外, `grunt`以及它的方法在模板中都是有效的, 例如: `<%= grunt.template.today('yyyy-mm-dd') %>`.

+ `<%= prop.subprop %>` 将会展开配置信息中的`prop.subprop`的值, 不管是什么类型. 像这样的模板不仅可以用来引用字符串值, 还可以引用数组或者其他的对象.
+ `<% %>`执行内联的JavaScript代码, 对于控制流或者循环来说是有利的.

下面提供了一个`concat`任务范例, 运行`grunt concat:sample`时将通过banner中的`/* abcde */`连同`foo/*.js`+`bar/*.js`+`bar/*.js`匹配的所有文件来生成一个名为`build/abcde.js`的文件.

    grunt.initConfig({
        concat: {
            sample: {
                options: {
                    banner: '/* <%= baz %> */\n' // '/* abcde */\n'
                },
                src: ['<%= qux %>', 'baz/*.js'], // [['foo/*js', 'bar/*.js'], 'baz/*.js']
                dest: 'build/<%= baz %>.js'
            }
        },
        //用于任务配置模板的任意属性
        foo: 'c',
        bar: 'b<%= foo %>d', //'bcd'
        baz: 'a<%= bar %>e', //'abcde'
        qux: ['foo/*.js', 'bar/*.js']
    });
    
##引入外部数据

在接下来的Gruntfile中, 项目的元数据从`package.json`文件中引入到Grunt配置中, [grunt-contrib-uglify插件](http://github.com/gruntjs/grunt-contrib-uglify)的`uglify`任务被配置用于压缩一个源文件以及使用该元数据动态的生成一个banner注释.

Grunt有`grunt.file.readJSON`和`grunt.file.readYAML`两个方法用于引入JSON和YAML数据.

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });





