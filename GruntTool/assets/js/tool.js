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
	$('#packageBtn').mousedown(function(){

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

		$(this).attr('href',"data:text/octet-stream," + encodeURIComponent(JSON.stringify(gruntFileGeneration.package,null,'\t')));

		return false;
	});

	// 获取Gruntfile
	$('#gruntfileBtn').mousedown(function(){

		var preText = 'module.exports = function(grunt){\n' +
				   '\tgrunt.initConfig(';
		var afterTaskText = ');\n\n'
		var tasks = {};
		var taskRegistration = '';
		var taskComponents = [];


		// 获取任务配置和任务注册
		gruntFileGeneration.pluginList.forEach(function(plugin){

			// 任务配置
			var thisTask = plugin.getTaskConfig();
			$.extend(tasks,thisTask);

			// 注册插件
			taskRegistration += '\t'+plugin.getTaskRegistration()+'\n';

			// 任务组成
			taskComponents.push(plugin.getTaskComponent());

		});

		$(this).attr('href',"data:text/octet-stream," + encodeURIComponent(preText+
				JSON.stringify(tasks,null,'\t').replace(/\n/g,'\n\t') +
				afterTaskText +
				taskRegistration +
				'\tgrunt.registerTask("default",' +
				JSON.stringify(taskComponents)) +
				');\n' +
				'});');
		
		/*console.log(preText);
		console.log(tasks);
		console.log(taskComponents)*/

	});

	// 初始化使用的插件列表
	gruntFileGeneration.usedPlugins = ['grunt-contrib-copy'];

	// 更新目标文件目录
	$('#projectDist').change(function(){

		gruntFileGeneration.distRootPath = $(this).val().replace(/\/?$/,'/');

	}).change();

	// 控制表单显隐
	$('#packageForm').on('change','input[type=checkbox]',function(){

		var $this = $(this),
			id = this.id.replace('-checkbox',''),
			isChecked = $this.is(':checked');

		$('#'+id).toggle(isChecked);
		if(isChecked){
			gruntFileGeneration.usedPlugins.push(id);
		}else{
			gruntFileGeneration.usedPlugins.splice(gruntFileGeneration.usedPlugins.indexOf(id),1);
		}

	});

	// 增行
	$('#gruntForm').on('click','.addline',function(e){

		var $line = $(this).parent();

		$line.find('.removeline').removeClass('hide');
		$line.clone(true).insertAfter($line);

		e.preventDefault();
	});

	// 减行
	$('#gruntForm').on('click','.removeline',function(e){

		var $line = $(this).parent(),
			$allRemove = $line.parent().find('.removeline'),
			lineCount = $allRemove.length;

		$line.remove();

		if(lineCount <= 2){
			$allRemove.addClass('hide');
		}

		e.preventDefault();
	});

	// 目标输入框路径跟随源文件输入框自动变化
	$('#gruntForm').on('change','.source',function(e){

		var $source = $(this),
			$dist = $source.parent().find('.dist');

		$dist.val(gruntFileGeneration.distRootPath + $source.val());

	});

});