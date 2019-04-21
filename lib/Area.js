var Area = function(){
	var area = {};
	area.debugArea;
	area.currentArea;

	area.unload = function () {
		console.log("U N L O A D");
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

	area.prepareMaps = function () {
		area.debugArea = DebugArea();
		//other areas.
	}

	area.areaName = function () {
		return area.currentArea.name;
	}


	area.loadArea = function (areaName) {

		if(areaName == "debugArea"){
			if(area.debugArea == undefined){
				area.debugArea = DebugArea();
			}
			area.currentArea = area.debugArea;
		}else if(areaName == "lightMarsh"){
			if(area.lightMarsh == undefined){
				//lightMarsh = LightMarsh();
			}
			area.currentArea = area.lightMarsh;
		}
		else {
			console.error (areaName + " does not define a valid area. Valid areas are: 'debugArea', 'lightMarsh'.");
		}


		if(areaName == "lastArea"){
			//only run if we died
			if(state == play){
				console.log("Give me 2 number 9's...");
				area.unload();
			}
			//go back in time
			npcVariables.copy(lastNPCVariables);
			area.loadArea(lastArea);
		}else{
			lastArea = areaName;
			lastNPCVariables.copy(npcVariables);
			console.log("Lucas, can you please punch Troy right now?");
			if(state == play){
				area.unload();
			}
			area.currentArea.load();
		}
	}

	return area;
}