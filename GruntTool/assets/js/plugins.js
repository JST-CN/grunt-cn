if(!window.gruntFileGeneration) return;

gruntFileGeneration.pluginList = [{

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

},{

	_name:'grunt-contrib-jshint',
	_taskName:'jshint',
	_version:'~0.1.1',
	getDependency:function(){

		// Copy是内置任务，不需要依赖
		// return {};
		var ret = {};

		ret[this._name] = this._version;

		return ret;

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