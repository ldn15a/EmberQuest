var Area = function(objects){
	var area = {};

	area.load = function(zone){
		for(var i = 0; i < zone.objects.length; i++){
			for(var j = 0; j < zone.objects[i].length; j++){
				zone.objects[i][j].load();
			}
		}
	}

	area.unload = function(){
		unload();
	}

	return area;
}