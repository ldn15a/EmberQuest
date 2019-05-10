var Area = function(){
	var area = {};
	area.debugArea;
	area.lightMarsh;
	area.deepMarsh;
	area.Grotto;
	area.village;
	area.bossRoom;
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
		area.lightMarsh = AreaTemplate("lightMarsh");
		area.deepMarsh = AreaTemplate("deepMarsh");
		area.Grotto = AreaTemplate("Grotto");
		area.village = AreaTemplate("village");
		area.bossRoom = AreaTemplate("bossRoom");
		//other areas.
	}

	area.areaName = function () {
		return area.currentArea.name;
	}


	area.loadArea = function (name) {
        audio.stopAll ();

		if(name == "debugMap"){
            area.currentArea = area.debugArea;
            audio.play ("villagePart1And2");
		}else if(name == "lightMarsh"){
            area.currentArea = area.lightMarsh;
            audio.play ("opening Area");
		}else if(name == "deepMarsh"){
            area.currentArea = area.deepMarsh;
            audio.play ("lightMarshAudio");
		}else if(name == "Grotto"){
            area.currentArea = area.Grotto;
            audio.play ("grotto");
		}else if(name == "village"){
            area.currentArea = area.village;
            audio.play ("villagePart1And2");
		}else if(name == "bossRoom"){
            area.currentArea = area.bossRoom;
            audio.play ("grotto");
		}else if(name != "lastArea"){
			console.error (name + " does not define a valid area. Valid areas are: 'lastArea' for death, and 'debugArea', 'lightMarsh'.");
		}


		if(name == "lastArea"){
			//only run if we died
			if(state == play){
				area.unload();
			}
			//go back in time
			npcVariables.copy(lastNPCVariables);
			area.loadArea(lastArea);
		}else{
			lastArea = name;
			lastNPCVariables.copy(npcVariables);
			if(state == play){
				area.unload();
			}
			area.currentArea.load();
			
			console.log(name + " loaded." + app.stage.children.length);

			var arrays = [backgroundArray, wallArray, playerArray, enemyArray, NPCArray, generatedObjectsArray, controllerArray];
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