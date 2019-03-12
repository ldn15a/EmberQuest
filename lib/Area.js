var Area = function(objects){
	var area = {};

	area.load = function(zone){
		for(var i = 0; i < zone.objects.length; i++){
			for(var j = 0; j < zone.objects[i].length; j++){
				//console.log(i+"|"+j);
				//if(zone.objects[i][j].character != undefined && zone.objects[i][j].character.asset != undefined){
				//	console.log(zone.objects[i][j].character.asset.name);
				//}
				zone.objects[i][j].load();
			}
		}
	}

	area.unload = function(){
		unload();
	}

	return area;
}