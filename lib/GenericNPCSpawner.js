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

				genericNPCSpawner.npc = GenericNPC(genericNPCSpawner.originX, genericNPCSpawner.originY, genericNPCSpawner.asset);
				//genericNPCSpawner.moveDir;
				genericNPCSpawner.npc.load();
				console.log("Pikachu! Use thunderbolt!!!");
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