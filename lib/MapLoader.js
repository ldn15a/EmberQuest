var MapLoader = function () {
	var mapLoader = {};
	mapLoader.private = {};

	mapLoader.private.mapsPath;
	mapLoader.private.currentMapLoading;
	mapLoader.private.currentMapLoadingPath;
	mapLoader.private.areaObjects;
	mapLoader.private.currentAreaObjRef;
	mapLoader.private.objIDMap;

	mapLoader.loadMap = function (mapFileName, areaObjRef, loadMapCallBack) {
		mapLoader.private.currentMapLoading = mapFileName;
		mapLoader.private.currentMapLoadingPath = mapLoader.private.mapsPath + mapFileName + ".csv";

		var generateMapObjects = function () {
			var lines = fileReader.read(mapLoader.private.currentMapLoadingPath);

			for (var i = 0; i < lines.length; i++) {
				var rowCells = lines[i].match(/-?\d+/g);
				for (var j = 0; j < rowCells.length; j++) {
					if (mapLoader.private.objIDMap.has(rowCells[j])) {
						mapLoader.private.objIDMap.get(rowCells[j])((j * 64) + 32, (i * 64) + 32);
					}
					else {
						alert("WARNING: Tried to load object from map with unknown id: " + rowCells[j]);
						console.warn("WARNING: Tried to load object from map with unknown id: " + rowCells[j]);
					}
				}
			}

			loadMapCallBack();
		}

		if (!fileReader.hasRequestedFile(mapLoader.private.currentMapLoadingPath)) {
			fileReader.requestFile(mapLoader.private.currentMapLoadingPath, generateMapObjects);
			mapLoader.private.areaObjects.set(mapFileName, areaObjRef);
			mapLoader.private.currentAreaObjRef = areaObjRef;
		}
	}

	mapLoader.getMapsPath = function () {
		return mapLoader.private.mapsPath;
	}

	mapLoader.setMapsPath = function (newPath) {
		mapLoader.private.mapsPath = newPath;
	}

	mapLoader.private.makeBrick = function (x, y) {
		mapLoader.private.currentAreaObjRef.walls.push(Wall(x, y, wallAsset, false));
	}

	mapLoader.private.makePlatform = function (x, y) {
		mapLoader.private.currentAreaObjRef.walls.push(Wall(x, y, otherWallAsset, true));
	}

	mapLoader.private.makeMarshGrass = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_grass_tile, false));
	}

	mapLoader.private.makeMarshGrassMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_grass_mud_tile, false));
	}

	mapLoader.private.makeMarshMudGrass = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_mud_grass_tile, false));
	}

	mapLoader.private.makeMarshMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_mud_tile, false));
	}

	mapLoader.private.makeMarshMudWater = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_mud_water_tile, false));
	}

	mapLoader.private.makeMarshWaterMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_water_mud_tile, false));
	}

	mapLoader.private.makeMarshMudWaterMiddle = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_mud_water_middle_tile, false));
	}

	mapLoader.private.makeMarshWaterMudMiddle = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_water_mud_middle_tile, false));
	}

	mapLoader.private.makeMarshWater = function (x, y) {
		mapLoader.private.currentAreaObjRef.grasses.push(Wall(x, y, marsh_water_tile, false));
	}

	mapLoader.private.makePlayer = function (x, y) {
		mapLoader.private.currentAreaObjRef.players.push(Player(x, y, redFlameStillAsset));
	}

	mapLoader.private.makeNaia = function (x, y) {
		//	This is currently broken, using Naia constructor is also broken. Troy?....
		mapLoader.private.currentAreaObjRef.NPCs.push(NPC(x, y, redFlameStillAsset, "dialog/Naia1.txt"));
		console.warn("You tried creating an NPC, which will be supported but currently is not. Stay tuned for updates soon.");
	}

	mapLoader.private.makeGenericNPC = function (x, y) {
		mapLoader.private.currentAreaObjRef.NPCs.push(GenericNPC(x, y, redFlameStillAsset));
		console.warn ("You tried creating an NPC, which will be supported but currently is not. Stay tuned for updates soon.");
	}

	mapLoader.private.makeGenericNPCSpawner = function (x, y) {
		mapLoader.private.currentAreaObjRef.NPCs.push(GenericNPCSpawner(x, y, redFlameStillAsset));
	}

	mapLoader.private.initialize = function () {
		mapLoader.private.mapsPath = "./Maps/";
		mapLoader.private.currentMapLoading = "";
		mapLoader.private.currentMapLoadingPath = "";
		mapLoader.private.currentAreaObjRef = null;
		mapLoader.private.areaObjects = new Map();
		mapLoader.private.objIDMap = new Map();

		mapLoader.private.objIDMap.set("-1", function () { });

		//  Different Tiles 64 x 64
		mapLoader.private.objIDMap.set("0", mapLoader.private.makeBrick);
		mapLoader.private.objIDMap.set("1", mapLoader.private.makePlatform);
		mapLoader.private.objIDMap.set("2", mapLoader.private.makeMarshGrass);
		mapLoader.private.objIDMap.set("3", mapLoader.private.makeMarshGrassMud);
		mapLoader.private.objIDMap.set("4", mapLoader.private.makeMarshMudGrass);
		mapLoader.private.objIDMap.set("5", mapLoader.private.makeMarshMud);
		mapLoader.private.objIDMap.set("6", mapLoader.private.makeMarshMudWater);
		mapLoader.private.objIDMap.set("7", mapLoader.private.makeMarshWaterMud);
		mapLoader.private.objIDMap.set("8", mapLoader.private.makeMarshWaterMudMiddle);
		mapLoader.private.objIDMap.set("9", mapLoader.private.makeMarshMudWaterMiddle);
		mapLoader.private.objIDMap.set("10", mapLoader.private.makeMarshWater);

		//  NPCs
		mapLoader.private.objIDMap.set("11", mapLoader.private.makeNaia);
		mapLoader.private.objIDMap.set("12", mapLoader.private.makeGenericNPC);
		mapLoader.private.objIDMap.set("13", mapLoader.private.makeGenericNPCSpawner);

		//  Player
		mapLoader.private.objIDMap.set("14", mapLoader.private.makePlayer);
	}();

	return mapLoader;
}