var MapLoader = function () {
    var mapLoader = {};
    mapLoader.private = {};
    
    mapLoader.private.commands;
    mapLoader.private.area;
    mapLoader.private.mapPath;

    mapLoader.loadMap = function (mapPath, areaRef, loadMapCallBack) {
        mapLoader.private.mapPath = mapPath;
        mapLoader.private.area = areaRef;
        mapLoader.private.getCommands ([mapLoader.private.translateCommandsToObjects, loadMapCallBack]);
    }

    mapLoader.private.getCommands = function (getCommandsCallBacks) {
        var getCommandsFromMapFile = function () {
            mapLoader.private.commands = fileReader.read(mapLoader.private.mapPath);

            for (var i = 0; i < mapLoader.private.commands.length; i++) {
                mapLoader.private.commands[i] = mapLoader.private.commands[i].split (", ");
            }

            for (var i = 0; i < getCommandsCallBacks.length; i++) {
                if (getCommandsCallBacks[i] != undefined && getCommandsCallBacks[i] != null) {
                    getCommandsCallBacks[i] ();
                }
            }
        }

        fileReader.requestFile (mapLoader.private.mapPath, getCommandsFromMapFile);
    }

    mapLoader.private.translateCommandsToObjects = function () {
        var errorMsgBeginning = "ERROR: Bad map file found at: " + mapLoader.private.mapPath + ".";
        var errorMsgBody = "";
        var NPCNames = ["John"];
        var xCord = NaN;
        var yCord = NaN;
        var asset = "error";

        for (var i = 0; i < mapLoader.private.commands.length; i++) {

            if (mapLoader.private.commands [i][1] == "Wall") {
                xCord = NaN;
                yCord = NaN;
                asset = "error";
                errorMsgBody = "Wall on line " + (i + 1) + " gave the following error: ";
                
                try {

                    if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No X cordinate was provided";
                    if (!(xCord = Number(mapLoader.private.commands[i][2]))) throw mapLoader.private.commands[i][2] + " is not a valid X cordinate number";
                    
                    try {
                        if (mapLoader.private.commands[i][3] == "" || mapLoader.private.commands[i][3] == undefined || mapLoader.private.commands[i][3] == null) throw " No Y cordinate was provided";
                        if (!(yCord = Number(mapLoader.private.commands[i][3]))) throw mapLoader.private.commands[i][3] + " is not a valid Y cordinate number";
                        
                        try {
                            if (mapLoader.private.commands[i][0] == "brick") {
                                asset = wallAsset;
                            }
                            else {
                                throw mapLoader.private.commands[i][0] + " does not list a valid Wall type. Valid options are: \"brick\"";
                            }
                            
                            mapLoader.private.area.walls.push (Wall(xCord, yCord, asset));
                        }
                        catch (error) {
                            alert(errorMsgBeginning + errorMagBody + error);
                            console.error(errorMsgBeginning + errorMagBody + error);
                        }
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMagBody + error);
                        console.error (errorMsgBeginning + errorMagBody + error);
                    }
                }
                catch (error) {
                    alert (errorMsgBeginning + errorMagBody + error);
                    console.error (errorMsgBeginning + errorMagBody + error);
                }
            }
            else if (NPCNames.includes(mapLoader.private.commands[i][0])) {
                xCord = NaN;
                yCord = NaN;
                errorMsgBody = "NPC on line " + (i + 1) + " gave the following error: ";

                try {

                    if (mapLoader.private.commands[i][1] == "" || mapLoader.private.commands[i][1] == undefined || mapLoader.private.commands[i][1] == null) throw " No X cordinate was provided";
                    if (!(xCord = Number(mapLoader.private.commands[i][1]))) throw mapLoader.private.commands[i][1] + " is not a valid X cordinate number";
                    
                    try {
                        if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No Y cordinate was provided";
                        if (!(yCord = Number(mapLoader.private.commands[i][2]))) throw mapLoader.private.commands[i][2] + " is not a valid Y cordinate number";
    
                        mapLoader.private.area.walls.push (TestNPC(xCord, yCord, redFlameStillAsset));
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMagBody + error);
                        console.error (errorMsgBeginning + errorMagBody + error);
                    }
                }
                catch (error) {
                    alert (errorMsgBeginning + errorMagBody + error);
                    console.error (errorMsgBeginning + errorMagBody + error);
                }
            }
            else if (mapLoader.private.commands[i][0] == "Player") {
                xCord = NaN;
                yCord = NaN;
                errorMsgBody = "Player on line " + (i + 1) + " gave the following error: ";

                try {

                    if (mapLoader.private.commands[i][1] == "" || mapLoader.private.commands[i][1] == undefined || mapLoader.private.commands[i][1] == null) throw " No X cordinate was provided";
                    if (!(xCord = Number(mapLoader.private.commands[i][1]))) throw mapLoader.private.commands[i][1] + " is not a valid X cordinate number";
                    
                    try {
                        if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No Y cordinate was provided";
                        if (!(yCord = Number(mapLoader.private.commands[i][2]))) throw mapLoader.private.commands[i][2] + " is not a valid Y cordinate number";
    
                        mapLoader.private.area.walls.push (Player(xCord, yCord, redFlameStillAsset));
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMagBody + error);
                        console.error (errorMsgBeginning + errorMagBody + error);
                    }
                }
                catch (error) {
                    alert (errorMsgBeginning + errorMagBody + error);
                    console.error (errorMsgBeginning + errorMagBody + error);
                }
            }
        }
    }

    mapLoader.private.initialize = function () {
        mapLoader.private.commands = [];
        mapLoader.private.area = null;
        mapLoader.private.mapPath = null;
    }();

    return mapLoader;
}