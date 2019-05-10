var AreaTemplate = function (mapName) {
	var areaTemplate = {};
	areaTemplate.private = {};

	areaTemplate.private.objects = [];
    
    areaTemplate.private.background = [];
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
    areaTemplate.private.treeStumpStack = [];
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
		areaTemplate.private.objects = [areaTemplate.private.background,
								areaTemplate.private.walls,
								areaTemplate.private.players,
								areaTemplate.private.NPCs,
								areaTemplate.private.enemies,
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
                                areaTemplate.private.treeBranchs];
		areaTemplate.loadObjects();
	}

	areaTemplate.getBackground = function () {
		if(areaTemplate.name == "debugMap"){
			//in progress
		}
	}

	areaTemplate.loadObjects = function () {
		//if the maploader is finished and we request, or we request and wait for the maploader to finish.
		if(areaTemplate.requested && areaTemplate.ready){

			areaTemplate.requested = false;
			console.log ("FIRST: objects length: "+areaTemplate.private.objects.length);
			for (var i = 0; i < areaTemplate.private.objects.length; i++) {
				console.log ("BEFORE: objects length: "+areaTemplate.private.objects.length);
				console.log ("BEFORE: objects["+i+"] length: "+areaTemplate.private.objects[i].length);
				for (var j = 0; j < areaTemplate.private.objects[i].length; j++) {
					console.log ("AFTER: objects["+i+"] length: "+areaTemplate.private.objects[i].length);
					areaTemplate.private.objects[i][j].load();
					console.log("Loaded object.");
				}
				console.log ("AFTER: objects["+i+"] length: "+areaTemplate.private.objects[i].length);
			}
		}
		console.log(areaTemplate.name+" objects loaded.");
	}

	areaTemplate.loadMapObj = function (callback) {
		mapLoader.loadMap (areaTemplate.name, areaTemplate, callback);
	}

	areaTemplate.initialize = function () {
		areaTemplate.requested = false;
		areaTemplate.ready = false;
		areaTemplate.name = mapName;
		console.log(areaTemplate.name+" about to loadMap.");
		mapLoader.loadMap (areaTemplate.name, areaTemplate, areaTemplate.objectsReady);
		console.log(areaTemplate.name+" initialized.");
	}();

	return areaTemplate;
}