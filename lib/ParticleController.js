//enemy creates a controller
var ParticleController = function(x,y,master){
	var particleController = {};
	particleController.master;
	particleController.fireParticleArray = [];
	particleController.fireParticleTimer;
	particleController.stop;
	particleController.x;
	particleController.y;
	particleController.name;

	particleController.initialize = function(){
		particleController.master = master;
		particleController.x = x;
		particleController.y = y;
		if(master.character != undefined){
			particleController.name = master.character.asset.name;
		}else{
			particleController.name = "";
		}
		particleController.fireParticleTimer = 0;
		particleController.stop = false;
	}();

	particleController.update = function(){
		if(!particleController.stop && master != undefined && master.character != undefined && master.character.graphic != undefined){
			particleController.x = master.character.graphic.x;
			particleController.y = master.character.graphic.y;
		}

		if(!particleController.stop || particleController.fireParticleArray.length > 0)
		{
			//fire particle creation
			if(!particleController.stop){
				particleController.fireParticleTimer++;
				if(particleController.fireParticleTimer > 3){
					particleController.fireParticleArray.push(FireParticle(particleController.x,particleController.y,particleController));
					particleController.fireParticleTimer = 0;
				}	
			}

			for(var i = 0;i < particleController.fireParticleArray.length;i++){
				particleController.fireParticleArray[i].update();
			}
		}
		else
		{
			particleController.unload();
		}
	}

	particleController.free = function(){
		controllerArray.push(particleController);
		particleController.stop = true;
	}

	particleController.unload = function(){
		for(var i = 0;i < particleController.fireParticleArray.length;i++){
			particleController.fireParticleArray[i].character.graphic.destroy();
		}
		fireParticleArray = [];
		var c = 0;
		while(c < controllerArray.length)
		{
			if(controllerArray[c] == particleController)
			{
				controllerArray.splice(c,1);
			    break;
			}
			c++;
		}
	}

	particleController.scroll = function(){
		if(scrollXOffset != 0){
			particleController.x+=scrollXOffset;
		}
		if(scrollYOffset != 0){
			particleController.y+=scrollYOffset;
		}
		for(var i = 0;i < particleController.fireParticleArray.length;i++){
			particleController.fireParticleArray[i].scroll();
		}
	}

	particleController.depth = function(){
		for(var i = 0;i < particleController.fireParticleArray.length;i++){
			particleController.fireParticleArray[i].depth();
		}
	}

	return particleController;
}