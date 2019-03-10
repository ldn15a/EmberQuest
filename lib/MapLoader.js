var MapLoader = function () {
    var mapLoader = {};
    mapLoader.private = {};

    mapLoader.private.walls;
    mapLoader.private.players;
    mapLoader.private.npcs;
    mapLoader.private.enemies;
    mapLoader.private.arrays;

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

            mapLoader.private.arrays = [mapLoader.private.walls, mapLoader.private.players, mapLoader.private.enemies, mapLoader.private.npcs];

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
                        mapLoader.private.walls.push (Wall (642, 386, wallAsset));
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
                alert (mapLoader.private.walls [i].originX + ", " + mapLoader.private.walls [i].originY);
            }
        }

        if (funct != undefined && funct != null) {
            funct ();
        }
    }

    mapLoader.initialize = function () {
        mapLoader.private.walls = [];
        mapLoader.private.players = [];
        mapLoader.private.enemies = [];
        mapLoader.private.npcs = [];
        mapLoader.private.arrays = [mapLoader.private.walls, mapLoader.private.players, mapLoader.private.enemies, mapLoader.private.npcs];
    }();

    return mapLoader;
}