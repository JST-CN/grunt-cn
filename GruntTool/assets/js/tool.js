(function(window){

	// package.json默认值
	var package = {

		name:'unnamed project',
		version:'alpha',
		devDependencies:{
			grunt:"~0.4.0"
		}

	};


	window.gruntFileGeneration = {};

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


	// 控制表单显隐
	$('#packageForm').on('change','input[type=checkbox]',function(){

		var $this = $(this);
		$('#'+this.id.replace('-checkbox','')).toggle($this.is(':checked'));

	});

});