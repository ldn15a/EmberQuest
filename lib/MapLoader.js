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
        var NPCNames = ["NPC", "Naia"];
        var xCord = NaN;
        var yCord = NaN;
        var repeatPosRegExp = /^repeatPos\ \((-\d+|\d+)\,\d+\,\d+\)$/;
        var repeatNegRegExp = /^repeatNeg\ \((-\d+|\d+)\,\d+\,\d+\)$/;
        var firstNumRegExp = /\(\-?\d+/;
        var secondNumRegExp = /\,\d+/;
        var thirdNumRegExp = /\d+\)/;
        var asset = "error";

        var repeat = function (commandWhole, repeatCommand, index) {
            var param1 = repeatCommand.match (firstNumRegExp).toString();
            var param2 = repeatCommand.match (secondNumRegExp).toString();
            var param3 = repeatCommand.match (thirdNumRegExp).toString();
            
            param1 = param1.substring (1, param1.length);
            param2 = param2.substring (1, 4);
            param3 = param3.substring (0, param3.length - 1);

            param1 = Number(param1);
            param2 = Number(param2);
            param3 = Number(param3);
            
            var commandTemplate = commandWhole;
            var newCommands = [];

            commandTemplate[index] = "";

            var offset = 0;

            if (repeatCommand.indexOf ("Pos") != -1) {
                for (var i = 0; i <= param2; i++) {
                    commandTemplate [index] = (Number(param1) + Number(offset)).toString();
                    var newCommand = [];
                    for(var j = 0; j < commandTemplate.length; j++){
                        newCommand.push(commandTemplate[j]);
                    }
                    newCommands.push(newCommand);
                    offset += param3;
                }
            }
            else {
                for (var i = 0; i <= param2; i++) {
                    commandTemplate [index] = (Number(param1) - Number(offset)).toString();
                    var newCommand = [];
                    for(var j = 0; j < commandTemplate.length; j++){
                        newCommand.push(commandTemplate[j]);
                    }
                    newCommands.push(newCommand);
                    offset += param3;
                }
            }

            for (var i = 0; i < newCommands.length; i++) {
                mapLoader.private.commands.push (newCommands[i]);
            }
        }

        var addedCommand = false;

        for (var i = 0; i < mapLoader.private.commands.length; i++) {
            addedCommand = false;

            if (mapLoader.private.commands[i].length > 2) {
                if (mapLoader.private.commands [i][1].trim() == "Wall") {
                    xCord = NaN;
                    yCord = NaN;
                    asset = "error";
                    errorMsgBody = "Wall on line " + (i + 1) + " gave the following error: ";
                    
                    try {
                        if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No X cordinate was provided";
                        if (!(xCord = Number(mapLoader.private.commands[i][2])) && xCord != 0)
                        {
                            if (mapLoader.private.commands [i][2].match (repeatNegRegExp) != null || mapLoader.private.commands[i][2].match (repeatPosRegExp) != null) {
                                repeat (mapLoader.private.commands[i] ,mapLoader.private.commands [i][2], 2);
                                addedCommand = true;
                            }
                            else {
                                if (mapLoader.private.commands [i][2].match (/^repeatNeg/) || mapLoader.private.commands [i][2].match (/^repeatPos/)) {
                                    throw mapLoader.private.commands[i][2] + " is not a valid X cordinate repeatNeg or repeatPos function";
                                }
                                else {
                                    throw mapLoader.private.commands[i][2] + " is not a valid X cordinate number";
                                }
                            }
                        }
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMsgBody + error);
                        console.error (errorMsgBeginning + errorMsgBody + error);
                    }
                    finally {
                        if (!addedCommand) {
                            try {
                                if (mapLoader.private.commands[i][3] == "" || mapLoader.private.commands[i][3] == undefined || mapLoader.private.commands[i][3] == null) throw " No Y cordinate was provided";
                                if (!(yCord = Number(mapLoader.private.commands[i][3])) && yCord != 0)
                                {
                                    if (mapLoader.private.commands [i][3].match (repeatNegRegExp) != null || mapLoader.private.commands[i][3].match (repeatPosRegExp) != null) {
                                        repeat (mapLoader.private.commands[i] ,mapLoader.private.commands [i][3], 3);
                                        addedCommand = true;
                                    }
                                    else {
                                        if (mapLoader.private.commands [i][3].match (/^repeatNeg/) || mapLoader.private.commands [i][3].match (/^repeatPos/)) {
                                            throw mapLoader.private.commands[i][3] + " is not a valid Y cordinate repeatNeg or repeatPos function";
                                        }
                                        else {
                                            throw mapLoader.private.commands[i][3] + " is not a valid Y cordinate number";
                                        }
                                    }
                                }
                            }
                            catch (error) {
                                alert (errorMsgBeginning + errorMsgBody + error);
                                console.error (errorMsgBeginning + errorMsgBody + error);
                            }
                            finally {
                                if (!addedCommand) {
                                    try {
                                        if (mapLoader.private.commands[i][0].trim() == "brick") {
                                            asset = wallAsset;
                                        }
                                        else {
                                            throw mapLoader.private.commands[i][0] + " does not list a valid Wall type. Valid options are: \"brick\"";
                                        }

                                        mapLoader.private.area.walls.push (Wall(xCord, yCord, asset));
                                    }
                                    catch (error) {
                                        alert(errorMsgBeginning + errorMsgBody + error);
                                        console.error(errorMsgBeginning + errorMsgBody + error);
                                    }
                                }
                            }
                        }
                    }
                }
                else if (NPCNames.includes(mapLoader.private.commands[i][0])) {
                    xCord = NaN;
                    yCord = NaN;
                    errorMsgBody = "NPC on line " + (i + 1) + " gave the following error: ";

                    try {

                        if (mapLoader.private.commands[i][1] == "" || mapLoader.private.commands[i][1] == undefined || mapLoader.private.commands[i][1] == null) throw " No X cordinate was provided";
                        if (!(xCord = Number(mapLoader.private.commands[i][1])) && xCord != 0) throw mapLoader.private.commands[i][1] + " is not a valid X cordinate number";
                        
                        try {
                            if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No Y cordinate was provided";
                            if (!(yCord = Number(mapLoader.private.commands[i][2]))  && yCord != 0) throw mapLoader.private.commands[i][2] + " is not a valid Y cordinate number";
        
                            if (NPCNames.indexOf (mapLoader.private.commands[i][0]) == 0 || NPCNames.indexOf (mapLoader.private.commands[i][0]) == 1) {
                                //  redStillFlameAsset should be saved in the class itself and not an argument
                                mapLoader.private.area.NPCs.push (TestNPC (xCord, yCord, redFlameStillAsset));
                            }
                            else if (NPCNames.indexOf (mapLoader.private.commands[i][0]) == 2) {
                                //  redStillFlameAsset should be saved in the class itself and not an argument
                                mapLoader.private.area.NPCs.push (GateKeeperNPC (xCord, yCord, redFlameStillAsset));
                            }
                            else if (NPCNames.indexOf (mapLoader.private.commands[i][0]) == 3) {
                                //  redStillFlameAsset should be saved in the class itself and not an argument
                                mapLoader.private.area.NPCs.push (Naia1 (xCord, yCord, redFlameStillAsset));
                            }
                            else if (NPCNames.indexOf (mapLoader.private.commands[i][0]) == 4) {
                                //  redStillFlameAsset should be saved in the class itself and not an argument
                                mapLoader.private.area.NPCs.push (Naia2 (xCord, yCord, redFlameStillAsset));
                            }
                            else {
                                alert ("CRITICAL ERROR: Report this incident to Lucas!\n\nERROR CODE: 23");
                            }
                        }
                        catch (error) {
                            alert (errorMsgBeginning + errorMsgBody + error);
                            console.error (errorMsgBeginning + errorMsgBody + error);
                        }
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMsgBody + error);
                        console.error (errorMsgBeginning + errorMsgBody + error);
                    }
                }
                else if (mapLoader.private.commands[i][0].trim() == "Player") {
                    xCord = NaN;
                    yCord = NaN;
                    errorMsgBody = "Player on line " + (i + 1) + " gave the following error: ";

                    try {

                        if (mapLoader.private.commands[i][1] == "" || mapLoader.private.commands[i][1] == undefined || mapLoader.private.commands[i][1] == null) throw " No X cordinate was provided";
                        if (!(xCord = Number(mapLoader.private.commands[i][1])) && xCord != 0) throw mapLoader.private.commands[i][1] + " is not a valid X cordinate number";
                        
                        try {
                            if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No Y cordinate was provided";
                            if (!(yCord = Number(mapLoader.private.commands[i][2])) && yCord != 0) throw mapLoader.private.commands[i][2] + " is not a valid Y cordinate number";
        
                            mapLoader.private.area.players.push (Player(xCord, yCord, redFlameStillAsset));
                        }
                        catch (error) {
                            alert (errorMsgBeginning + errorMsgBody + error);
                            console.error (errorMsgBeginning + errorMsgBody + error);
                        }
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMsgBody + error);
                        console.error (errorMsgBeginning + errorMsgBody + error);
                    }
                }
                else if (mapLoader.private.commands [i][0].trim() == "Enemy") {
                    xCord = NaN;
                    yCord = NaN;
                    errorMsgBody = "Enemy on line " + (i + 1) + " gave the following error: ";

                    try {

                        if (mapLoader.private.commands[i][1] == "" || mapLoader.private.commands[i][1] == undefined || mapLoader.private.commands[i][1] == null) throw " No X cordinate was provided";
                        if (!(xCord = Number(mapLoader.private.commands[i][1])) && xCord != 0) throw mapLoader.private.commands[i][1] + " is not a valid X cordinate number";
                        
                        try {
                            if (mapLoader.private.commands[i][2] == "" || mapLoader.private.commands[i][2] == undefined || mapLoader.private.commands[i][2] == null) throw " No Y cordinate was provided";
                            if (!(yCord = Number(mapLoader.private.commands[i][2])) && yCord != 0) throw mapLoader.private.commands[i][2] + " is not a valid Y cordinate number";
        
                            mapLoader.private.area.enemies.push (TestEnemy(xCord, yCord, blueFlameStillAsset));
                        }
                        catch (error) {
                            alert (errorMsgBeginning + errorMsgBody + error);
                            console.error (errorMsgBeginning + errorMsgBody + error);
                        }
                    }
                    catch (error) {
                        alert (errorMsgBeginning + errorMsgBody + error);
                        console.error (errorMsgBeginning + errorMsgBody + error);
                    }
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