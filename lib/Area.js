var Area = function(){
	var area = {};

	area.unload = function () {
		var arrays = [wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

		//unload area objects, and set lastArea to the contents of the current area, and empty the current area.
		for (var i = 0; i < arrays.length; i++) {
			for (var j = 0; j < arrays[i].length; j++) {
				arrays[i][j].unload ();
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
			area.unload();
			//go back in time
			npcVariables.copy(lastNPCVariables);
			area.loadArea(lastArea);
		}else{
			lastArea = areaName;
			lastNPCVariables.copy(npcVariables);
			area.unload();
			currentArea.load();
		}
	}

	return area;
}