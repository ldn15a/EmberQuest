function GenericNPC (x, y, asset) {
	var genericNPC = {};
	genericNPC.originX;
	genericNPC.originY;
	genericNPC.asset;
	genericNPC.npc;
	
	genericNPC.initialize = function () {
		genericNPC.originX = x;
		genericNPC.originY = y;
		genericNPC.asset = asset;
		//console.log("GENERICNPC");
	}();

	genericNPC.load = function () {
		var textFile;
		if (currentArea.name == "DebugArea") {
			textFile = "dialogue/CheeryVillager.txt";
		} else if (currentArea.name == "DebugArea2") {
			textFile = "dialogue/genericNPC2.txt";
		}
		genericNPC.npc = NPC(genericNPC.originX, genericNPC.originY, genericNPC.asset, textFile);
		//genericNPC.moveDir;
		genericNPC.npc.load();
	}
	genericNPC.unload = function () {
		genericNPC.npc.unload();
	}
	return genericNPC;
}
