if(!window.gruntFileGeneration) return;

function Plugin(opt){

	if(!this instanceof Plugin){
		return new Plugin(opt);
	}

	$.extend(this,opt);

}

Plugin.prototype = {

	getDependency:function(){

		var ret = {};

		if(!this._isBuiltIn && gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){
			ret[this._name] = this._version;
		}

		return ret;
	},
	getTaskRegistration:function(){
		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){
			return 'grunt.loadNpmTasks("'+this._name+'");';
		}else{
			return '';
		}
	},
	getTaskComponent:function(){
		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){
			return this._taskName;
		}else{
			return '';
		}
	}

};

gruntFileGeneration.pluginList = [new Plugin({

	_name:'grunt-contrib-copy',
	_taskName:'copy',
	_version:'',
	_isBuiltIn:true,
	getTaskConfig:function(){

		var $sourceInput = $('#staticSource');
		var $destInput = $('#destPath');
		var ret;

		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){

			ret = {
				copy:{
					default:{
						files:[{
							src:$sourceInput.val().split('\n'),
							dest:gruntFileGeneration.distRootPath + $destInput.val()
						}]
					}
				}
			}

		}else{
			ret = {};
		}



		return ret;

	}

}),new Plugin({

	_name:'grunt-contrib-jshint',
	_taskName:'jshint',
	_version:'~0.1.1',
	_isBuiltIn:false,
	getTaskConfig:function(){

		var $sourceInput = $('#staticSource');
		var $destInput = $('#destPath');

		var ret;
		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){

			ret = {
				jshint:{
					default:$sourceInput.val().split('\n')
				}
			}
		}else{
			ret = {};
		}

		return ret;

	},

}),new Plugin({

	_name:'grunt-contrib-uglify',
	_taskName:'uglify',
	_version:'~0.1.2',
	_isBuiltIn:false,
	getTaskConfig:function(){

		var $sourceInput = $('#grunt-contrib-uglify .source');
		var $destInput = $('#grunt-contrib-uglify .dist');

		var uglifyFileList = $sourceInput.map(function(index){

			var tempObj = {};

			tempObj[$destInput.eq(index).val()] = $(this).val();

			return tempObj;

		}).get();

		var ret;
		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){

			ret = {
				uglify:{
					default:uglifyFileList
				}
			}
		}else{
			ret = {};
		}

		return ret;
	}

}),new Plugin({

	_name:'grunt-contrib-cssmin',
	_taskName:'cssmin',
	_version:'~0.5.0',
	_isBuiltIn:false,
	getTaskConfig:function(){
		
		var $sourceInput = $('#grunt-contrib-cssmin .source');
		var $destInput = $('#grunt-contrib-cssmin .dist');

		var uglifyFileList = $sourceInput.map(function(index){

			var tempObj = {};

			tempObj[$destInput.eq(index).val()] = $(this).val();

			return tempObj;

		}).get();

		var ret;
		if(gruntFileGeneration.usedPlugins.indexOf(this._name) > -1){

			ret = {
				cssmin:{
					default:uglifyFileList
				}
			}
		}else{
			ret = {};
		}

		return ret;
	}

})];