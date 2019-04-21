var FireProjectile = function(x,y,dir,master,friendly,damage,asset){
	var fireProjectile = {};
	fireProjectile.master;
	fireProjectile.dir;
	fireProjectile.xSpd;
	fireProjectile.character;
	fireProjectile.t;
	fireProjectile.maxTime;
	fireProjectile.friendly;
	fireProjectile.attack;
	fireProjectile.damage;
	fireProjectile.pierce;

	fireProjectile.jump;
	fireProjectile.airTime;
	fireProjectile.peakTime;
	fireProjectile.airDrag;
	fireProjectile.friction;

	fireProjectile.initialize = function(){
		//console.log("SPARK!");
		fireProjectile.master = master;
		fireProjectile.dir = dir;
		fireProjectile.friendly = friendly;
		fireProjectile.xSpd = 9;
		fireProjectile.damage = damage;
		if(damage > 0){
			fireProjectile.attack = true;
		}else{
			fireProjectile.attack = false;
		}
		fireProjectile.pierce = false;

		fireProjectile.jump = 1;
		fireProjectile.peakTime = 16;
		fireProjectile.airTime = -fireProjectile.peakTime;
		fireProjectile.airDrag = 20;
		fireProjectile.friction = 1.2;

		fireProjectile.character = Character(x,y,asset);

		fireProjectile.character.graphic.scale.x = fireProjectile.character.asset.scaleX/2 * fireProjectile.dir;
	  	fireProjectile.character.graphic.scale.y = fireProjectile.character.asset.scaleY/2;
	  	fireProjectile.character.hitboxWidth /= 2;
	  	fireProjectile.character.hitboxHeight /= 2;

		fireProjectile.t = 0;
		fireProjectile.maxTime = 240;

		generatedObjectsArray.push(fireProjectile);
	}();

	fireProjectile.update = function(){
		if(!fireProjectile.character.moveX(fireProjectile.dir*fireProjectile.xSpd)){
			fireProjectile.dir*=-1;
			//fireProjectile.peakTime = fireProjectile.airTime/fireProjectile.friction;
		}
		fireProjectile.character.graphic.rotation += fireProjectile.dir/2*Math.PI/2;
		if(fireProjectile.character.graphic.rotation >= 2*Math.PI){
			fireProjectile.character.graphic.rotation -= 2*Math.PI;
		}else if(fireProjectile.character.graphic.rotation < 0){
			fireProjectile.character.graphic.rotation += 2*Math.PI;
		}

		//if we're jumping or falling
		if(fireProjectile.jump){
			fireProjectile.airTime++;
			var jumpDir = 1;
			if(fireProjectile.airTime < 0){
				jumpDir = -1;
			}

			//move the fireProjectile, also check if we hit the ground.
			if(!fireProjectile.character.moveY(fireProjectile.airTime*fireProjectile.airTime*jumpDir/fireProjectile.airDrag)){
			
				if(jumpDir == 1){
					fireProjectile.peakTime = (fireProjectile.airTime) / fireProjectile.friction;
					
					fireProjectile.airTime = -fireProjectile.peakTime;
				}else if(fireProjectile.airTime < 0){
					fireProjectile.airTime = 0;
				}
			}
		}

		//should it die?
		fireProjectile.t++;

		if(fireProjectile.t > fireProjectile.maxTime || fireProjectile.peakTime < 6){
			fireProjectile.unload();
		}

		if(fireProjectile.t > fireProjectile.maxTime - 60){
			if(fireProjectile.t % 3 == 0 || fireProjectile.t % 4 == 0){
				fireProjectile.character.graphic.alpha = .25;
			}else{
				fireProjectile.character.graphic.alpha = 1;
			}
		}
	}

	fireProjectile.unload = function(){
        fireProjectile.character.graphic.destroy();
    }

	fireProjectile.scroll = function(){
		if(scrollXOffset != 0){
			fireProjectile.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			fireProjectile.character.mY(scrollYOffset);
		}
	}
	
	fireProjectile.depth = function(){
		app.stage.setChildIndex(fireProjectile.character.graphic,childNum);
		childNum++;
	}

	

	return fireProjectile;
}