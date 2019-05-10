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
		if (areaController.areaName() == "debugMap") {
			textFile = "CheeryVillager";
		} else if (areaController.areaName() == "DebugArea2") {
			textFile = "genericNPC2";
		}
		/*var random = randomInt(0,4);
		if(random == 0){
			
		}*/
		//console.log(textFile);
		genericNPC.npc = NPC(genericNPC.originX, genericNPC.originY, genericNPC.asset, textFile);
		//genericNPC.moveDir;
		genericNPC.npc.load();
	}
	genericNPC.unload = function () {
		genericNPC.npc.unload();
	}
	return genericNPC;
}
