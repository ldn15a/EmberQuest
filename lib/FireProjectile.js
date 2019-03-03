var FireProjectile = function(x,y,dir,master,asset){
	var fireProjectile = {};
	fireProjectile.master;
	fireProjectile.dir;
	fireProjectile.xSpd;
	fireProjectile.character;
	fireProjectile.t;
	fireProjectile.maxTime;

	fireProjectile.jump;
	fireProjectile.airTime;
	fireProjectile.peakTime;
	fireProjectile.airDrag;
	fireProjectile.friction;

	fireProjectile.initialize = function(){
		//console.log("SPARK!");
		fireProjectile.master = master;
		fireProjectile.dir = dir;
		fireProjectile.xSpd = 9;

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
	}();

	fireProjectile.update = function(){
		if(!fireProjectile.character.moveX(fireProjectile.dir*fireProjectile.xSpd)){
			fireProjectile.dir*=-1;
			fireProjectile.peakTime = fireProjectile.airTime/fireProjectile.friction;
		}
		fireProjectile.character.graphic.rotation += fireProjectile.dir/2*Math.PI/6*fireProjectile.xSpd*fireProjectile.peakTime/fireProjectile.airDrag;
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

		if(fireProjectile.t > fireProjectile.maxTime){
			var c = 0;
			while(c < fireProjectileArray.length){
				if(fireProjectileArray[c] == fireProjectile){
					fireProjectileArray.splice(c,1);
					fireProjectile.character.graphic.destroy();
					//console.log("SPARK DESTROYED");
					break;
				}
				c++;
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