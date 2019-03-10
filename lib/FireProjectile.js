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
		fireProjectile.peakTime = 15;
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

		console.log(fireProjectile.damage + "|" + fireProjectile.attack);
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
		
				fireProjectile.peakTime = (fireProjectile.airTime) / fireProjectile.friction;
				
				fireProjectile.airTime = -fireProjectile.peakTime;
			}
		}

		//should it die?
		fireProjectile.t++;

		if(fireProjectile.t > fireProjectile.maxTime || fireProjectile.peakTime < 6){
			var c = 0;
			while(c < generatedObjectsArray.length){
				if(generatedObjectsArray[c] == fireProjectile){
					generatedObjectsArray.splice(c,1);
					fireProjectile.character.graphic.destroy();
					//console.log("SPARK DESTROYED");
					break;
				}
				c++;
			}
		}
	}

	fireProjectile.unload = function(){
        fireProjectile.character.graphic.destroy();
        for(var i = 0; i < generatedObjectsArray.length; i++){
            if(generatedObjectsArray[i] == fireProjectile){
                generatedObjectsArray.splice(i,1);
            }
        }
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