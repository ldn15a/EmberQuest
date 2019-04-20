var Area = function(){
	var area = {};

	area.unload = function (updateLastArea) {
		if(updateLastArea){
			if(lastArea == undefined){
				lastArea = [last_wallArray, last_playerArray, last_enemyArray, last_controllerArray, last_generatedObjectsArray, last_NPCArray];
			}
			for (var i = 0; i < lastArea.length; i++) {
				lastArea[i] = undefined;
			}
		}
		var arrays = [wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

		//unload area objects, and set lastArea to the contents of the current area, and empty the current area.
		for (var i = 0; i < arrays.length; i++) {
			while (arrays[i].length > 0){
				arrays[i][0].unload ();
				if(updateLastArea){
					lastArea[i][lastArea.length] = arrays[i][0];
				}
				arrays[i].splice(0,1);
			}
		}

		globalX = 0;
		globalY = 0;
	}



	area.loadArea = function (areaName) {
		
		if(areaName == "debugArea"){
			if(debugArea == undefined){
				debugArea = DebugArea();
			}
			currentArea = debugArea;
		}else if(areaName == "lightMarsh"){
			if(lightMarsh == undefined){
				//lightMarsh = LightMarsh();
			}
			currentArea = lightMarsh;
		}

		
		if(areaName == "lastArea"){
			//only run if we died
			area.unload(false);
			for (var i = 0; i < lastArea.length; i++) {
				for (var j = 0; j < lastArea[i].length; j++) {
					lastArea[i][j].load();
				}
			}
		}else{
			area.unload(true);
			currentArea.load();
		}
	}

	return area;
}