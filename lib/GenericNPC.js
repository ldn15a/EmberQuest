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
		/*if (areaController.areaName() == "debugMap") {
			textFile = "CheeryVillager";
		} else if (areaController.areaName() == "DebugArea2") {
			textFile = "genericNPC2";
		}*/
		var random = randomInt(0,6);
		if(random == 0){
			textFile = "CheeryVillager";
		}else if(random == 1){
			textFile = "AbsentMindedVillager";
		}else if(random == 2){
			textFile = "BitterVillager";
		}else if(random == 3){
			textFile = "HungryVillager";
		}else if(random == 4){
			textFile = "NostalgicVillager";
		}else if(random == 5){
			textFile = "OddVillager";
		}else if(random == 6){
			textFile = "WorriedNortherner";
		}
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
