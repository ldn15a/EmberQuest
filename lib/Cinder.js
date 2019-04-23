var Cinder = function(x,y){
	var cinder = {};
	cinder.character;
	cinder.mode;
	cinder.maxHeight;
	cinder.t;
	cinder.endTime;
	cinder.startingY;
	cinder.jump;
	cinder.airTime;
	cinder.airDrag;
	cinder.peakTime;
	cinder.friction;
	cinder.friendly;
	cinder.attack;
	cinder.damage;
	cinder.pierce;

	cinder.initialize = function(){

		cinder.t = 0;
		cinder.endTime = 240;
		cinder.friendly = false;
		cinder.attack = true;
		cinder.damage = -1;
		cinder.pierce = false;
		cinder.jump = 1;
		cinder.peakTime = randomInt(10,15);
		cinder.airTime = -cinder.peakTime;
		cinder.airDrag = 20;
		cinder.friction = 1;

		cinder.character = Character();
		cinder.character.graphic = new PIXI.Graphics();
		cinder.character.graphic.position.set(x,y);
		cinder.character.hitboxWidth = 1;
		cinder.character.hitboxHeight = 1;
		cinder.character.graphic.anchor = {};
		cinder.character.graphic.anchor.x = 0.5;
		cinder.character.graphic.anchor.y = 0.5;
		
		var width = 16;
		var height = 16;

		cinder.maxHeight = height;

		cinder.character.graphic.beginFill(0xFFC0CB);

		cinder.character.graphic.drawRect(-width,-height, width, height);
		cinder.character.graphic.endFill();
		
		addChildToStage(cinder.character.graphic);

		generatedObjectsArray.push(cinder);
	}();

	cinder.update = function(){
		cinder.character.graphic.pivot.x = -8;
		cinder.character.graphic.pivot.y = -8;

		cinder.character.graphic.rotation += Math.PI/8;
		if(cinder.character.graphic.rotation >= 2*Math.PI){
			cinder.character.graphic.rotation -= 2*Math.PI;
		}else if(cinder.character.graphic.rotation < 0){
			cinder.character.graphic.rotation += 2*Math.PI;
		}

		//if we're jumping or falling
		if(cinder.jump){
			cinder.airTime++;
			var jumpDir = 1;
			if(cinder.airTime < 0){
				jumpDir = -1;
			}

			//move the cinder, also check if we hit the ground.
			if(!cinder.character.moveY(cinder.airTime*cinder.airTime*jumpDir/cinder.airDrag)){
		
				cinder.peakTime = (cinder.airTime) / cinder.friction;
				
				cinder.airTime = -cinder.peakTime;
			}
		}

		cinder.t++;

		if(cinder.t > cinder.endTime - 60){
			if(cinder.t % 3 == 0 || cinder.t % 4 == 0){
				cinder.character.graphic.alpha = .25;
			}else{
				cinder.character.graphic.alpha = 1;
			}
		}

		if(cinder.t > cinder.endTime){
			cinder.unload();
		}
	}

	cinder.depth = function(){
		app.stage.setChildIndex(cinder.character.graphic,childNum);
		childNum++;
	}

	cinder.scroll = function(){
		if(scrollXOffset != 0){
			cinder.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			cinder.character.mY(scrollYOffset);
		}
	}

	cinder.unload = function(){
		cinder.character.unload();
	}

	return cinder;
}