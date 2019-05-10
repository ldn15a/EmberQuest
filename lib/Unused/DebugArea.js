var DebugArea = function () {
    var area = {};
    area.private = {};
    area.private.name;
    
    area.private.objects = [];
    
	area.private.players = [];
	area.private.NPCs = [];
	area.private.enemies = [];
	area.private.grasses = [];
	area.private.muds = [];
    area.private.waters = [];
    area.private.banners = [];
    area.private.bricks = [];
    area.private.roofShingles = [];
    area.private.bannerSlums = [];
    area.private.platforms = [];
    area.private.closeGates = [];
    area.private.openGates = [];
    area.private.treeStumps = [];
    area.private.trueTrunks = [];
    area.private.treeStrumpStack = [];
    area.private.treeTrunksMiddle = [];
    area.private.treeTops = [];
    area.private.treeBranchBases = [];
    area.private.treeBranchs = [];

	area.requested;
    area.ready;
    area.name;

	area.load = function(){
		area.requested = true;
		area.loadObjects();
	}

	area.objectsReady = function(){
		area.ready = true;
        area.private.objects = [area.private.players, area.private.NPCs, area.private.enemies, area.private.grasses, area.private.muds, area.private.waters, area.private.banners, area.private.bricks, area.private.roofShingles, area.private.bannerSlums, area.private.platforms, area.private.closeGates, area.private.openGates, area.private.treeStumps, area.private.trueTrunks, area.private.treeStrumpStack, area.private.treeTrunksMiddle, area.private.treeTops, area.private.treeBranchBases, area.private.treeBranchs];
		area.loadObjects();
	}

	area.loadObjects = function () {
		//if the maploader is finished and we request, or we request and wait for the maploader to finish.
		if(area.requested && area.ready){

			area.requested = false;

			for (var i = 0; i < area.private.objects.length; i++) {
				for (var j = 0; j < area.private.objects[i].length; j++) {
					area.private.objects[i][j].load();
				}
			}
		}
		console.log("Debug Area Objects Loaded.");
	}

	area.loadMapObj = function (callback) {
		mapLoader.loadMap ("debugMap", area, callback);
	}

	area.initialize = function () {
		area.requested = false;
		area.ready = false;
		area.name = "DebugArea";
		mapLoader.loadMap ("debugMap", area, area.objectsReady);
		console.log("Debug Area initialized.");
	}();

	return area;
}