var FireParticle = function(x,y,master){
	var fireParticle = {};
	fireParticle.master;
	fireParticle.character;
	fireParticle.t;
	fireParticle.maxTime;

	fireParticle.initialize = function(){
		//console.log("SPARK!");
		fireParticle.master = master;

		var asset;
		var r = randomInt(1,4);
		if(fireParticle.master.name == "flameRed")
		{
		  if(r == 1){asset = redFlameParticleAsset1;}
		  else if(r == 2){asset = redFlameParticleAsset2;}
		  else if(r == 3){asset = redFlameParticleAsset3;}
		  else if(r == 4){asset = redFlameParticleAsset4;}
		}
		else if(fireParticle.master.name == "flameBlue")
		{
		  if(r == 1){asset = blueFlameParticleAsset1;}
		  else if(r == 2){asset = blueFlameParticleAsset2;}
		  else if(r == 3){asset = blueFlameParticleAsset3;}
		  else if(r == 4){asset = blueFlameParticleAsset4;}
		}else{
			asset = orvelAsset;
			console.warn("Tried to find asset name \"" + fireParticle.master.name + "\". Using default.");
		}

		var maxOffset = 20;
		var xOffset = randomInt(-maxOffset,maxOffset);
		var yOffset = randomInt(-maxOffset,maxOffset);

		fireParticle.character = Character(x+xOffset,y+yOffset-10,asset);

		fireParticle.t = 0;
		fireParticle.maxTime = 40;
	}();

	fireParticle.update = function(){
		fireParticle.character.graphic.y--;

		fireParticle.t++;

		fireParticle.character.graphic.alpha = (fireParticle.maxTime - fireParticle.t) / fireParticle.maxTime;

		if(fireParticle.t > fireParticle.maxTime){
			var c = 0;
			while(c < master.fireParticleArray.length){
				if(master.fireParticleArray[c] = fireParticle){
					master.fireParticleArray.splice(c,1);
					fireParticle.character.graphic.destroy();
					//console.log("SPARK DESTROYED");
					break;
				}
				c++;
			}
		}
	}

	fireParticle.scroll = function(){
		if(scrollXOffset != 0){
			fireParticle.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			fireParticle.character.mY(scrollYOffset);
		}
	}
	fireParticle.depth = function(){
		app.stage.setChildIndex(fireParticle.character.graphic,childNum);
		childNum++;
	}

	return fireParticle;
}