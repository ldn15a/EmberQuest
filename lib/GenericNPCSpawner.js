function GenericNPCSpawner (x, y, asset) {
	var genericNPCSpawner = {};
	genericNPCSpawner.originX;
	genericNPCSpawner.originY;
	genericNPCSpawner.asset;
	genericNPCSpawner.npc;
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
			genericNPCSpawner.time++;
			if (genericNPCSpawner.time == genericNPCSpawner.spawnTime) {
				genericNPCSpawner.time = 0;
				genericNPCSpawner.spawnTime = randomInt(100, 300);

				var dir = randomInt(0,1);
				if(dir == 0){
					dir = -1;
				}
				var xOffset = dir*(app.view.width/2+randomInt(30,60));

				genericNPCSpawner.gnpc = GenericNPC(genericNPCSpawner.originX-xOffset, genericNPCSpawner.originY, genericNPCSpawner.asset);
				genericNPCSpawner.gnpc.npc.generic_zeldaWalk = true;
				
        		genericNPCSpawner.gnpc.npc.generic_zeldaWalkDir = dir;
				//genericNPCSpawner.moveDir;
				genericNPCSpawner.gnpc.npc.load();
				//console.log("Pikachu! Use thunderbolt!!!");
			}
		}
	}

	genericNPCSpawner.load = function () {
		genericNPCSpawner.loaded = true;
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