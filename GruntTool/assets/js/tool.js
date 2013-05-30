//package.json && Gruntfile.js
$(function(){

	// package.json
	var	package = {};
		package.devDependencies = {};
		//grunt依赖
		package.devDependencies['grunt'] = '~0.4.0';
	
	//载入任务插件
	var loadTask = 'grunt.loadNpmTasks("grunt-contrib-copy");\n';

	var taskPlugin = [];
		
	//插件版本
	var pluginVersion = {
		jshint: '~0.1.1',
		uglify: '~0.5.0',
		csslint: '~0.1.1',
		cssmin: '~0.1.2'
	};

	//package.json
	$('#packageForm').on('change', 'input', function(){

		var $this = $(this);

		//插件选择
		if($this.is('[type=checkbox]')){

			if($this.prop('checked')){

				package.devDependencies['grunt-contrib-'+$this.val()] = pluginVersion[$this.val()];
				taskPlugin.push($this.val());

				$('#'+$this.val()).removeClass('hide');

			}else{

				package.devDependencies['grunt-contrib-' + $this.val()] = undefined;
				taskPlugin.splice(taskPlugin.indexOf($this.val()), 1);

				console.log(package.devDependencies);

				$('#'+$this.val()).addClass('hide');

			}

		}

		//项目信息
		if($this.is('[type=text]')){

			if($this.val()){

				package[$this.prop('name')] = $this.val();

			}else{

				package[$this.prop('name')] = undefined;

			}

		}

	});

	$('#packageBtn').on('click', function(){
		alert(JSON.stringify(package, null, 4));
	});

	//Gruntfile.js
	var staticSource = [],
		destPath = '',
		jshintSourcePath = [],
		csslintSourcePath = [],
		uglifyDestPath = [],
		uglifySourcePath = [],
		cssminDestPath = [],
		cssminSourcePath = [];

	var gruntStr = 'module.exports = function(grunt){\n' +
				   '\tgrunt.initConfig({\n' +
				   '\t\tpkg: grunt.file.readJSON("package.json"),\n';
    var gruntConfigStr = '';

	$('#gruntForm').on('change', function(){
		var $form = $(this);

		if($('#staticSource').val()){
			staticSource.push($('#staticSource').val());
		}

		if($('#destPath').val()){
			destPath = $('#destPath').val();
		}

		if($('#jshintSourcePath').val()){
			jshintSourcePath = $('#jshintSourcePath').val();
		}

		if($('#cssSourcePath').val()){
			cssSourcePath = $('#cssSourcePath').val();
		}

		$form.find('[name=jsdest]').each(function(){
			var _parents = $(this).parents('.controls');
			if(_parents.find('[name=jsdest]').val()){
				uglifyDestPath.push(_parents.find('[name=jsdest]').val());
			}

			if(_parents.find('[name=jssrc]').val()){
			uglifySourcePath.push(_parents.find('[name=jssrc]').val());
			}
		});

		$form.find('[name=cssdest]').each(function(){
			var _parents = $(this).parents('.controls');
			if(_parents.find('[name=cssdest]').val()){
				uglifyDestPath.push(_parents.find('[name=cssdest]').val());
			}

			if(_parents.find('[name=csssrc]').val()){
			uglifySourcePath.push(_parents.find('[name=csssrc]').val());
			}
		});

	});

	$('#gruntfileBtn').on('click', function(e){
		e.preventDefault();

		var registerTask = 'grunt.registerTask("grunt", [copy,' + taskPlugin +']);\n' +
					   '};';

		taskPlugin.forEach(function(item){
			loadTask += '\tgrunt.loadNpmTasks("grunt-contrib-"' + item + ');\n';
		});

		//if($('#staticSource').val() && $('#destPath').val()){
			gruntStr += '\t\tcopy:{\n' +
						'\t\t\tmain: [\n' +
						'\t\t\t\t{src: [' + staticSource + '],\n' +
						'\t\t\t\tdest: ' + destPath + '\n' +
						'\t\t\t]\n' +
						'\t\t}' + gruntConfigStr + '\n' +
						'\t};\n' +
						'\t' + loadTask + '\n' +
						'\n' +
						'\t' + registerTask;
		//}//else{
			//alert('此项必填');
		//}

		console.log(gruntStr);
	});



});

//DOM
$(function(){

	$('.plus-uglify').on('click',function(e){
		$(this).parent().clone(true).insertAfter($(this).parent());
		$(this).parents('#uglify').find('.del-uglify').removeClass('hide');
		$(this).parents('#uglify').find('.del-uglify').first().addClass('hide');

		e.preventDefault();
	});

	$('.del-uglify').on('click',function(e){
		var $this = $(this),
			$parent = $this.parent();

		$parent.remove();
		e.preventDefault();
	});

	$('.plus-cssmin').on('click',function(e){
		$(this).parent().clone(true).insertAfter($(this).parent());
		$(this).parents('#cssmin').find('.del-cssmin').removeClass('hide');
		$(this).parents('#cssmin').find('.del-cssmin').first().addClass('hide');

		e.preventDefault();
	});

	$('.del-cssmin').on('click',function(e){
		var $this = $(this),
			$parent = $this.parent();

		$parent.remove();
		e.preventDefault();
	});

});