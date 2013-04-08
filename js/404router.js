~function(location){
	var $404router = {};

	$404router._routerList = [];

	$404router.route = function(pattern,success,error){
		var path = location.pathname,
			valPattern = new RegExp(pattern.replace(/:\w+(?=$|\/)/g,'([\\w-\.]+)').replace('\/','\\\/')),
			keyMatches,valMatches,result={};
		keyMatches = pattern.match(/:\w+(?=$|\/)/g);
		valMatches = path.match(valPattern).slice(1);
		if(keyMatches.length !== valMatches.length){
			error(404);
		}else{
			for(var i=keyMatches.length;i--;){
				result[keyMatches[i].substr(1)] = valMatches[i];
			}
			success(result);
		}
	};
	
	window.$404router = $404router;

}(location);