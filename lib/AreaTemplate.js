var AreaTemplate = function (mapName) {
	var areaTemplate = {};
	areaTemplate.private = {};

	areaTemplate.private.objects = [];
    
    areaTemplate.private.background = [];
	areaTemplate.private.walls = [];
	areaTemplate.private.players = [];
	areaTemplate.private.NPCs = [];
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
    areaTemplate.private.treeStumpStack = [];
    areaTemplate.private.treeTrunksMiddle = [];
    areaTemplate.private.treeTops = [];
    areaTemplate.private.treeBranchBases = [];
    areaTemplate.private.treeBranchs = [];
    areaTemplate.private.flameStatues = [];
    areaTemplate.private.prisonCells = [];
    areaTemplate.private.waterWraiths = [];
    areaTemplate.private.doorwayGenerals = [];


	areaTemplate.requested;
	areaTemplate.ready;
	areaTemplate.name;

	areaTemplate.load = function(){
		areaTemplate.requested = true;
		areaTemplate.loadObjects();
	}

	areaTemplate.objectsReady = function(){
		areaTemplate.ready = true;
		areaTemplate.private.objects = [areaTemplate.private.background,
								areaTemplate.private.walls,
								areaTemplate.private.players,
								areaTemplate.private.NPCs,
								areaTemplate.private.grasses,
								areaTemplate.private.muds,
                                areaTemplate.private.waters,
                                areaTemplate.private.banners,
                                areaTemplate.private.bricks,
                                areaTemplate.private.roofShingles,
                                areaTemplate.private.bannerSlums,
                                areaTemplate.private.platforms,
                                areaTemplate.private.closeGates,
                                areaTemplate.private.openGates,
                                areaTemplate.private.treeStumps,
                                areaTemplate.private.trueTrunks,
                                areaTemplate.private.treeStumpStack,
                                areaTemplate.private.treeTrunksMiddle,
                                areaTemplate.private.treeTops,
                                areaTemplate.private.treeBranchBases,
                                areaTemplate.private.treeBranchs,
                                areaTemplate.private.flameStatues,
                                areaTemplate.private.prisonCells,
                                areaTemplate.private.waterWraiths,
                                areaTemplate.private.doorwayGenerals];
		areaTemplate.loadObjects();
	}

	areaTemplate.getBackground = function () {
		if(areaTemplate.name == "debugMap"){
			//in progress marsh_background
		}
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
	}

	areaTemplate.loadMapObj = function (callback) {
		mapLoader.loadMap (areaTemplate.name, areaTemplate, callback);
	}

	areaTemplate.initialize = function () {
		areaTemplate.requested = false;
		areaTemplate.ready = false;
		areaTemplate.name = mapName;
		mapLoader.loadMap (areaTemplate.name, areaTemplate, areaTemplate.objectsReady);
	}();

	return areaTemplate;
}