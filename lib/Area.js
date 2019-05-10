var Area = function(){
	var area = {};
	area.debugArea;
	area.currentArea;

	area.unload = function () {
		console.log("U N L O A D " + app.stage.children.length);
		var arrays = [wallArray, playerArray, enemyArray, NPCArray, generatedObjectsArray, controllerArray];

		//unload area objects, and set lastArea to the contents of the current area, and empty the current area.
		for (var i = 0; i < arrays.length; i++) {
			for (var j = 0; j < arrays[i].length; j++) {
				arrays[i][j].unload ();
			}
			arrays[i].length = 0;
		}

		globalX = 0;
		globalY = 0;
	}

	area.prepareMaps = function () {
		area.debugArea = AreaTemplate("debugMap");
		//other areas.
	}

	area.areaName = function (asdf) {
		return area.currentArea.name;
	}


	area.loadArea = function (areaName) {
        audio.stopAll ();

		if(areaName == "debugMap"){
            area.currentArea = area.debugArea;
            audio.play ("villagePart1And2");
		}else if(areaName == "lightMarsh"){
            area.currentArea = area.lightMarsh;
            audio.play ("lightMarsh");
		}
		else if(areaName != "lastArea"){
			console.error (areaName + " does not define a valid area. Valid areas are: 'lastArea' for death, and 'debugArea', 'lightMarsh'.");
		}


		if(areaName == "lastArea"){
			//only run if we died
			if(state == play){
				area.unload();
			}
			//go back in time
			npcVariables.copy(lastNPCVariables);
			area.loadArea(lastArea);
		}else{
			lastArea = areaName;
			lastNPCVariables.copy(npcVariables);
			if(state == play){
				area.unload();
			}
			area.currentArea.load();
			
			console.log(areaName + " loaded." + app.stage.children.length);

			var arrays = [wallArray, playerArray, enemyArray, NPCArray, generatedObjectsArray, controllerArray];
			var c = 0;
			//unload area objects, and set lastArea to the contents of the current area, and empty the current area.
			for (var i = 0; i < arrays.length; i++) {
				for (var j = 0; j < arrays[i].length; j++) {
					c++;
				}
			}
			console.log("Objects: "+c);
		}
	}

	return area;
}