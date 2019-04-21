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

	area.loadObjects = function () {

		area.objects = [area.walls, area.players, area.NPCs, area.enemies, area.grasses, area.muds, area.waters];

		for (var i = 0; i < area.objects.length; i++) {
			for (var j = 0; j < area.objects[i].length; j++) {
				area.objects[i][j].load();
			}
		}
	}

	area.loadMapObj = function (callback) {
		mapLoader.loadMap ("debugMap", area, callback);
	}

	area.initialize = function () {
		area.name = "DebugArea";
		//mapLoader.loadMap("debugMap", area, area.loadObjects);
	}();

	return area;
}