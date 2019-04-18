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
		if (currentArea.name == "DebugArea") {
			textFile = "dialog/Naia1.txt";
		} else if (currentArea.name == "DebugArea2") {
			textFile = "dialog/Naia2.txt";
		}
        naia.npc = NPC(naia.originX,naia.originY,naia.asset,textFile);
        naia.npc.load();
    }

    npc.depth = function(){
    	//lol
    }

    npc.scroll = function(){
    	//lol
    }

    npc.unload = function(){
        naia.npc.unload();
    }
    return naia;
}