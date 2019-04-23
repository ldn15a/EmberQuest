function Naia (x, y, asset) {
	var naia = {};
	naia.originX;
	naia.originY;
	naia.asset;
	naia.npc;

	naia.initialize = function () {
		naia.originX = x;
		naia.originY = y;
		naia.asset = asset;
	}();

	naia.update = function () {
		//lol
		//Talking to yourself again I see...XD
	}

	naia.load = function () {
		var textFile;
		if (areaController.areaName() == "DebugArea2") {
			textFile = "dialogue/Naia1.txt";
		} else if (areaController.areaName() == "DebugArea") {
			textFile = "dialogue/Naia2.txt";
		}
		console.log(textFile);
        naia.npc = NPC(naia.originX,naia.originY,naia.asset,textFile);
        naia.npc.load();
    }

    naia.depth = function(){
    	//lol
    }

    naia.scroll = function(){
    	//lol
    }

    naia.unload = function(){
        naia.npc.unload();
    }
    return naia;
}