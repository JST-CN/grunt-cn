(function(window){

	// 支持的插件列表
	var pluginList = [{

		_name:'grunt-contrib-copy',
		_taskName:'copy',
		_version:'',
		getDependency:function(){

			// Copy是内置任务，不需要依赖
			// return {};

			return {
				test:'0.0.1'
			}

		},
		getTaskConfig:function(){

			var $sourceInput = $('#staticSource');
			var $destInput = $('#destPath');

			var ret = {
				copy:{
					default:{
						files:[{
							src:$sourceInput.val().split('\n'),
							dest:$destInput.val()
						}]
					}
				}
			}

			return ret;

		},
		getTaskRegistration:function(){
			return 'grunt.loadNpmTasks("'+this._name+'");';
		},
		getTaskComponent:function(){
			return this._taskName;
		}

	}];

	// package.json默认值
	var package = {

		name:'unnamed project',
		version:'alpha',
		devDependencies:{
			grunt:"~0.4.0"
		}

	};


	window.gruntFileGeneration = {};

	gruntFileGeneration.pluginList = pluginList;
	gruntFileGeneration.package = package;

})(window);


$(function(){

	// 获取package.json
	$('#packageBtn').click(function(){

		// 填充基本信息
		var projectName = $('#projectname').val();
		var projectVersion = $('#projectVersion').val();
		var projectDescription = $('#projectDescription').val();

		if(projectName){
			gruntFileGeneration.package.name = projectName;
		}
		if(projectVersion){
			gruntFileGeneration.package.version = projectVersion;
		}
		gruntFileGeneration.package.description = projectDescription;

		// 获取依赖
		gruntFileGeneration.pluginList.forEach(function(plugin){

			var thisDependency = plugin.getDependency();
			$.extend(gruntFileGeneration.package.devDependencies,thisDependency);

		});
		console.log(gruntFileGeneration.package);

		return false;
	});

	// 获取Gruntfile
	$('#gruntfileBtn').click(function(){

		var preText = '';
		var tasks = {};
		var taskRegistration = '';
		var taskComponents = [];

		// 获取任务配置和任务注册
		gruntFileGeneration.pluginList.forEach(function(plugin){

			// 任务配置
			var thisTask = plugin.getTaskConfig();
			$.extend(tasks,thisTask);

			// 注册插件
			taskRegistration += plugin.getTaskRegistration();

			// 任务组成
			taskComponents.push(plugin.getTaskComponent());

		});

		console.log(preText);
		console.log(tasks);
		console.log(taskComponents)

	});

});