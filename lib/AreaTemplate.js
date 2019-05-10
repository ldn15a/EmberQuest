var AreaTemplate = function (mapName) {
	var areaTemplate = {};
	areaTemplate.private = {};

	areaTemplate.private.objects = [];
    
	areaTemplate.private.walls = [];
	areaTemplate.private.players = [];
	areaTemplate.private.NPCs = [];
	areaTemplate.private.enemies = [];
	areaTemplate.private.grasses = [];
	areaTemplate.private.muds = [];
    areaTemplate.private.waters = [];
    areaTemplate.private.banners = [];
    areaTemplate.private.bricks = [];
    areaTemplate.private.roofShingles = [];
    areaTemplate.private.bannerSlums = [];
    areaTemplate.private.platforms = [];
    areaTemplate.private.closeGates = [];
    areaTemplate.private.openGates = [];
    areaTemplate.private.treeStumps = [];
    areaTemplate.private.trueTrunks = [];
    areaTemplate.private.treeStrumpStack = [];
    areaTemplate.private.treeTrunksMiddle = [];
    areaTemplate.private.treeTops = [];
    areaTemplate.private.treeBranchBases = [];
    areaTemplate.private.treeBranchs = [];


	areaTemplate.requested;
	areaTemplate.ready;
	areaTemplate.name;

	areaTemplate.load = function(){
		areaTemplate.requested = true;
		areaTemplate.loadObjects();
	}

	areaTemplate.objectsReady = function(){
		areaTemplate.ready = true;
		areaTemplate.objects = [areaTemplate.private.walls, areaTemplate.private.players, areaTemplate.private.NPCs, areaTemplate.private.enemies, areaTemplate.private.grasses, areaTemplate.private.muds, areaTemplate.private.waters];
		areaTemplate.loadObjects();
	}

	areaTemplate.loadObjects = function () {
		//if the maploader is finished and we request, or we request and wait for the maploader to finish.
		if(areaTemplate.requested && areaTemplate.ready){

			areaTemplate.requested = false;

			for (var i = 0; i < areaTemplate.private.objects.length; i++) {
				for (var j = 0; j < areaTemplate.private.objects[i].length; j++) {
					areaTemplate.private.objects[i][j].load();
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