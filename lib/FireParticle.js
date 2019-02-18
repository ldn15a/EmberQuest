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
		if(r == 1){asset = redFlameParticleAsset1;}
		else if(r == 2){asset = redFlameParticleAsset2;}
		else if(r == 3){asset = redFlameParticleAsset3;}
		else if(r == 4){asset = redFlameParticleAsset4;}

		var maxOffset = 20;
		var xOffset = randomInt(-maxOffset,maxOffset);
		var yOffset = randomInt(-maxOffset,maxOffset);

		fireParticle.character = Character(x+xOffset,y+yOffset-10,asset);

		//console.log(x+"|"+xOffset + " | " + y+"|"+yOffset);

		fireParticle.t = 0;
		fireParticle.maxTime = 30;
	}();

	fireParticle.update = function(){
		fireParticle.character.graphic.y--;

		fireParticle.t++;

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

	fireParticle.render = function(){
		app.stage.setChildIndex(fireParticle.character.graphic,childNum);
		childNum++;
	}

	return fireParticle;
}