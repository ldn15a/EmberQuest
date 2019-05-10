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
            var lines = fileReader.readFile(mapLoader.private.currentMapLoadingPath);

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

        mapLoader.private.areaObjects.set(mapFileName, areaObjRef);
        mapLoader.private.currentAreaObjRef = areaObjRef;
        generateMapObjects();
	}

	mapLoader.getMapsPath = function () {
		return mapLoader.private.mapsPath;
	}

	mapLoader.setMapsPath = function (newPath) {
		mapLoader.private.mapsPath = newPath;
	}

	mapLoader.private.makeBrick = function (x, y, version) {
        if (version == 1) {
            mapLoader.private.currentAreaObjRef.bricks.push( Wall (x, y, wallAsset, false, false));
        }
        else if (version == 2) {
            mapLoader.private.currentAreaObjRef.bricks.push( Wall (x, y, brick_tile_bord, false, false));
        }
        else if (version == 3) {
            mapLoader.private.currentAreaObjRef.bricks.push (Wall (x, y, brick_tile, false, false));
        }
        else if (version == 4) {
            mapLoader.private.currentAreaObjRef.bricks.push (Wall (x, y, brick_tile2, false, false));
        }
        else {
            console.error ("You tried making a brick wall of version " + version + " which does not exist. Please use a version betwene 1 - 4");
            console.info ("1 - Generic yellow brick\n2 - Brick with border\n3 - Brick plain\n4 - Brick with diamond pattern");
        }
	}

	mapLoader.private.makePlatform = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.walls.push(Wall(x, y, otherWallAsset, true, false));
	}

	mapLoader.private.makeMarshGrass = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_grass_tile, false, false));
	}

	mapLoader.private.makeMarshGrassMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_grass_mud_tile, false, false));
	}

	mapLoader.private.makeMarshMudGrass = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_mud_grass_tile, false, false));
	}

	mapLoader.private.makeMarshMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.muds.push(Wall(x, y, marsh_mud_tile, false, 1));
	}

	mapLoader.private.makeMarshMudWater = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_mud_water_tile, false, 10));
	}

	mapLoader.private.makeMarshWaterMud = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_water_mud_tile, false, 10));
	}

	mapLoader.private.makeMarshMudWaterMiddle = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_mud_water_middle_tile, false, 10));
	}

	mapLoader.private.makeMarshWaterMudMiddle = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_water_mud_middle_tile, false, false));
	}

	mapLoader.private.makeMarshWater = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.grasses.push(Wall(x, y, marsh_water_tile, false, 10));
    }

	mapLoader.private.makePlayer = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.players.push(Player(x, y, redFlameStillAsset));
	}

	mapLoader.private.makeNaia = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.NPCs.push(Naia(x, y, redFlameStillAsset));
	}

	mapLoader.private.makeGenericNPC = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.NPCs.push(GenericNPC(x, y, redFlameStillAsset));
	}

	mapLoader.private.makeGenericNPCSpawner = function (x, y) {
		mapLoader.private.currentAreaObjRef.private.NPCs.push(GenericNPCSpawner(x, y, redFlameStillAsset));
	}

	mapLoader.private.initialize = function () {
		mapLoader.private.mapsPath = "Maps/";
		mapLoader.private.currentMapLoading = "";
		mapLoader.private.currentMapLoadingPath = "";
		mapLoader.private.currentAreaObjRef = null;
		mapLoader.private.areaObjects = new Map();
		mapLoader.private.objIDMap = new Map();

        mapLoader.private.objIDMap.set("-1", function () {});
        
        /*
        Row 1: Grass, Mud, Mud/Grass, Water Edge, Water Curve, Water Middle, Closed Gate, Open Gate, Branch Base, Branch
        Row 2: Roof Tile, One True Trunk, Platform, Brick, Patterned Brick, Bordered Brick, Branch (again?), Tree Trunk Base, Tree Trunk Middle, Tree Top
        
        0	1	2	3	4	5	16	17	18	19
        20	25	27	28	29	30	32	35	36	37
        */

		//  Tiles 64 x 64
		mapLoader.private.objIDMap.set("0", mapLoader.private.makeMarshGrass);
		mapLoader.private.objIDMap.set("1", mapLoader.private.makeMarshMud);
		mapLoader.private.objIDMap.set("2", mapLoader.private.makeMarshGrassMud);
		mapLoader.private.objIDMap.set("3", mapLoader.private.makeMarshMudWater);
		mapLoader.private.objIDMap.set("4", mapLoader.private.makeMarshWaterMudMiddle);
        mapLoader.private.objIDMap.set("5", mapLoader.private.makeMarshWater);
        mapLoader.private.objIDMap.set("20", mapLoader.private.makeRoofTile);
        mapLoader.private.objIDMap.set("28", mapLoader.private.makeBrick);
        mapLoader.private.objIDMap.set("29", mapLoader.private.makePatternedBrick);
        mapLoader.private.objIDMap.set("30", mapLoader.private.makeBorderedBrick);


        // Thin Tiles x 64
        mapLoader.private.objIDMap.set("27", mapLoader.private.makePlatform);

		//  NPCs
		mapLoader.private.objIDMap.set("11", mapLoader.private.makeNaia);
		mapLoader.private.objIDMap.set("12", mapLoader.private.makeGenericNPC);
		mapLoader.private.objIDMap.set("13", mapLoader.private.makeGenericNPCSpawner);

		//  Player
        mapLoader.private.objIDMap.set("14", mapLoader.private.makePlayer);
        
        // Other
        mapLoader.private.objIDMap.set("16", mapLoader.private.makeCloseGate);
		mapLoader.private.objIDMap.set("17", mapLoader.private.makeOpenGate);
		mapLoader.private.objIDMap.set("18", mapLoader.private.makeBranchBase);
        mapLoader.private.objIDMap.set("19", mapLoader.private.makeBranch);
        mapLoader.private.objIDMap.set("32", mapLoader.private.makeBranch);
        mapLoader.private.objIDMap.set("25", mapLoader.private.makeTrueTrunk);
        mapLoader.private.objIDMap.set("35", mapLoader.private.makeTreeTrunkBase);
        mapLoader.private.objIDMap.set("36", mapLoader.private.makeTreeTrunkMiddle);
        mapLoader.private.objIDMap.set("37", mapLoader.private.makeTreeTop);
	}();

	return mapLoader;
}