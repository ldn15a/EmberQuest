function GenericNPCSpawner (x,y,asset){
	var genericNPC = {};
	genericNPC.originX;
	genericNPC.originY;
	genericNPC.asset;
	genericNPC.npc;
	genericNPC.

	npc.initialize = function(){
		genericNPC.originX = x;
		genericNPC.originY = y;
		genericNPC.asset = asset;
	}();

	npc.load = function(){
		var textFile;
		if(currentArea.name == "DebugArea"){
			textFile = "dialog/genericNPC1.txt";
		}else if(currentArea.name == "DebugArea2"){
			textFile = "dialog/genericNPC2.txt";
		}
        genericNPC.npc = NPC(genericNPC.originX,genericNPC.originY,genericNPC.asset,textFile);
        //genericNPC.moveDir;
        genericNPC.npc.load();
    }
    npc.unload = function(){
        genericNPC.npc.unload();
    }
    return genericNPC;
}