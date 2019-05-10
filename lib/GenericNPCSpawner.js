function GenericNPCSpawner (x, y, asset) {
	var genericNPCSpawner = {};
	genericNPCSpawner.originX;
	genericNPCSpawner.originY;
	genericNPCSpawner.asset;
	genericNPCSpawner.time;
	genericNPCSpawner.spawnTime;
	genericNPCSpawner.loaded;

	genericNPCSpawner.initialize = function () {
		genericNPCSpawner.originX = x;
		genericNPCSpawner.originY = y;
		genericNPCSpawner.asset = asset;
		genericNPCSpawner.time = 0;
		genericNPCSpawner.spawnTime = randomInt(100, 300);
		genericNPCSpawner.loaded = false;
		//console.log("SPAWNER");
	}();

	genericNPCSpawner.update = function () {
		if (genericNPCSpawner.loaded) {
			//console.log("time...");
			genericNPCSpawner.time++;
			if (genericNPCSpawner.time == genericNPCSpawner.spawnTime) {
				genericNPCSpawner.time = 0;
				genericNPCSpawner.spawnTime = randomInt(100, 300);

				var dir = randomInt(0,1);
				if(dir == 0){
					dir = -1;
				}
				var xOffset = app.view.width/2+dir*(app.view.width/2+randomInt(20,300));

				var gnpc = GenericNPC(xOffset, genericNPCSpawner.originY-300, genericNPCSpawner.asset);
				gnpc.load();
				gnpc.npc.generic_zeldaWalk = true;
				
        		gnpc.npc.generic_zeldaWalkDir = -dir;
				//genericNPCSpawner.moveDir;
				
				//console.log("NPC made.");
				//console.log("Pikachu! Use thunderbolt!!!");
			}
		}
	}

	genericNPCSpawner.load = function () {
		genericNPCSpawner.loaded = true;
		NPCArray.push(genericNPCSpawner);
		//console.log("GNPCS loaded.");
	}
	genericNPCSpawner.unload = function () {
		genericNPCSpawner.loaded = false;
	}

	genericNPCSpawner.depth = function (){
		//lol
	}
	genericNPCSpawner.scroll = function (){
		//lol
	}
	return genericNPCSpawner;
}