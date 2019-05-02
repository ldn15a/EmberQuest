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
			textFile = "Naia1";
		} else if (areaController.areaName() == "DebugArea") {
			textFile = "Naia2";
		}
		//console.log(textFile);
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