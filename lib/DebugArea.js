var DebugArea = function () {
	var area = {};
	area.name;
	area.objects = [];
	area.walls = [];
	area.players = [];
	area.NPCs = [];
	area.enemies = [];
	area.grasses = [];
	area.muds = [];
	area.waters = [];
	area.requested;
	area.ready;

	area.load = function(){
		area.requested = true;
		area.loadObjects();
	}

	area.objectsReady = function(){
		area.ready = true;
		area.objects = [area.walls, area.players, area.NPCs, area.enemies, area.grasses, area.muds, area.waters];
		area.loadObjects();
	}

	area.loadObjects = function () {
		//if the maploader is finished and we request, or we request and wait for the maploader to finish.
		if(area.requested && area.ready){

			area.requested = false;

			for (var i = 0; i < area.objects.length; i++) {
				for (var j = 0; j < area.objects[i].length; j++) {
					area.objects[i][j].load();
				}
			}
		}
	}

	area.loadMapObj = function (callback) {
		mapLoader.loadMap ("debugMap", area, callback);
	}

	area.initialize = function () {
		area.requested = false;
		area.ready = false;
		area.name = "DebugArea";
		mapLoader.loadMap ("debugMap", area, area.objectsReady);
	}();

	return area;
}