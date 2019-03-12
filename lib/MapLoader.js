var MapLoader = function () {
    var mapLoader = {};
    mapLoader.private = {};

    mapLoader.private.arrays;
    mapLoader.private.walls;
    mapLoader.private.players;
    mapLoader.private.npcs;
    mapLoader.private.enemies;

    mapLoader.readMap = function (mapPath, funct) {
        var mapLoaded = function () {
            var commands = fileReader.read(mapPath);

            for (var i = 0; i < commands.length; i++) {
                commands[i] = commands[i].split(" ");
            }

            for (var i = 0; i < commands.length; i++) {
                if (commands[i][1] == "Wall") {
                    mapLoader.private.walls.push (commands[i]);
                }
                else if (commands[i][1] == "Player") {
                    mapLoader.private.players.push (commands[i]);
                }
                else if (commands[i][1] == "Enemy") {
                    mapLoader.private.enemies.push (commands[i]);
                }
                else if (commands[i][1] == "npcs") {
                    mapLoader.private.npcs.push (commands[i]);
                }
            }

            mapLoader.private.arrays = [mapLoader.private.walls, mapLoader.private.players, mapLoader.private.npcs, mapLoader.private.enemies];

            if (funct != undefined && funct != null) {
                funct ();
            }
        }

        fileReader.requestFile (mapPath, mapLoaded);
    }

    mapLoader.translateCommandsToObject = function (arrayIndex) {
        if (mapLoader.private.arrays[arrayIndex] != undefined) {
            for (var i = 0; i < mapLoader.private.arrays[arrayIndex].length; i++) {
                if (arrayIndex == 0) {
                    if (i == 0) {
                        mapLoader.private.walls = [];
                    }
                    
                    if (mapLoader.private.arrays[arrayIndex][0][0] == "brick") {
                        mapLoader.private.walls.push (Wall (642, 386, wallAsset));//642,386
                    }
                }
            }
        }
    }

    mapLoader.loadMapObjects = function (objectName, funct) {
        var arrayLoopIndex = -1;

        if (objectName == "Wall") {
            mapLoader.translateCommandsToObject (0);

            for (var i = 0; i < mapLoader.private.walls.length; i++) {
                mapLoader.private.walls [i].load ();
                //this is put here so that objects will always appear in the same place, no matter how the screen has scrolled (if it can) even if the player enters from different locations, as this is changing their current x and y, not their "original" x and y, so they are reloaded properly.
                mapLoader.private.walls [i].character.graphic.x -= globalX;
                mapLoader.private.walls [i].character.graphic.y -= globalY;
                //alert (mapLoader.private.walls [i].originX + ", " + mapLoader.private.walls [i].originY);
            }
        }

        //Just to ensure that arrays holds the most up-to-date information.
        //I also changed the order of the individual arrays in "arrays". It used to be walls, players, enemies, npcs, but that conflicted with the order in area. So I switched enemies and npcs.
        mapLoader.private.arrays = [mapLoader.private.walls, mapLoader.private.players, mapLoader.private.npcs, mapLoader.private.enemies];

        if (funct != undefined && funct != null) {
            funct ();
        }
    }

    //I want a way to reference the arrays from mapLoader.
    mapLoader.returnArrays = function(){
    	return mapLoader.private.arrays;
    }

    mapLoader.initialize = function () {
        mapLoader.private.walls = [];
        mapLoader.private.players = [];
        mapLoader.private.enemies = [];
        mapLoader.private.npcs = [];
        mapLoader.private.arrays = [mapLoader.private.walls, mapLoader.private.players, mapLoader.private.npcs, mapLoader.private.enemies];
    }();

    return mapLoader;
}