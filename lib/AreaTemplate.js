var AreaTemplate = function (mapName) {
	var areaTemplate = {};
	areaTemplate.name;
	areaTemplate.objects = [];
	areaTemplate.walls = [];
	areaTemplate.players = [];
	areaTemplate.NPCs = [];
	areaTemplate.enemies = [];
	areaTemplate.grasses = [];
	areaTemplate.muds = [];
	areaTemplate.waters = [];
	areaTemplate.requested;
	areaTemplate.ready;

	areaTemplate.load = function(){
		areaTemplate.requested = true;
		areaTemplate.loadObjects();
	}

	areaTemplate.objectsReady = function(){
		areaTemplate.ready = true;
		areaTemplate.objects = [areaTemplate.walls, areaTemplate.players, areaTemplate.NPCs, areaTemplate.enemies, areaTemplate.grasses, areaTemplate.muds, areaTemplate.waters];
		areaTemplate.loadObjects();
	}

	areaTemplate.loadObjects = function () {
		//if the maploader is finished and we request, or we request and wait for the maploader to finish.
		if(areaTemplate.requested && areaTemplate.ready){

			areaTemplate.requested = false;

			for (var i = 0; i < areaTemplate.objects.length; i++) {
				for (var j = 0; j < areaTemplate.objects[i].length; j++) {
					areaTemplate.objects[i][j].load();
				}
			}
		}
		console.log(mapName+" objects loaded.");
	}

	areaTemplate.loadMapObj = function (callback) {
		mapLoader.loadMap ("debugMap", areaTemplate, callback);
	}

	areaTemplate.initialize = function () {
		areaTemplate.requested = false;
		areaTemplate.ready = false;
		areaTemplate.name = mapName;
		mapLoader.loadMap (mapName, areaTemplate, areaTemplate.objectsReady);
		console.log(mapName+" initialized.");
	}();

	return areaTemplate;
}