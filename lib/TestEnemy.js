var TestEnemy = function(x,y,asset){
	var enemy = {};
	enemy.character;
	enemy.spd;
	enemy.jump;
	enemy.jumpReset;
	enemy.airTime;
	enemy.peakTime;
	enemy.airDrag;
	enemy.useJumpingMechanic;
	enemy.lastDisplaceX;
	enemy.lastDisplaceY;

	enemy.fireParticleTimer;
	enemy.fireParticleArray;

	enemy.initialize = function(){
		enemy.character = Character(x,y,asset);
		enemyArray[enemyArray.length] = enemy;
		enemy.spd = 6;
		enemy.jump = 0;
		enemy.jumpReset = 0;
		enemy.airTime = 0;
		enemy.peakTime = 25;
		enemy.airDrag = 20;
		enemy.useJumpingMechanic = true;
		enemy.lastDisplaceX = 0;
		enemy.lastDisplaceY = 0;

		enemy.fireParticleTimer = 0;
		enemy.fireParticleArray = [];
	}();

	enemy.update = function(){
		var displaceX;
		if(enemy.character.graphic.x < playerArray[0].character.graphic.x)
		{
			displaceX = 0.5;
		}
		else if(enemy.character.graphic.x > playerArray[0].character.graphic.x)
		{
			displaceX = -0.5;
		}
		else
		{
			dispalceX = 0;
		}
		var displaceY; //= (DOWN-UP);

		if(!enemy.useJumpingMechanic){
			if(displaceX != 0){
				enemy.character.moveX(displaceX*enemy.spd);
			}
			if(displaceY != 0){

				enemy.character.moveY(displaceY*enemy.spd);
			}
		}else{
			if(displaceX != 0){

				//update the flame sprite if we're moving in a direction
				if(enemy.lastDisplaceX != displaceX){
					//console.log("SPRITE UPDATE!");
					var dir;
					if(displaceX < 0){
						dir = -1;
					}else{
						dir = 1;
					}
					blueFlameMovingAsset.scaleX = blueFlameMovingAsset.defaultScaleX*dir;
					enemy.character.setSprite(blueFlameMovingAsset);
				}

				enemy.character.moveX(displaceX*enemy.spd);

			}else if(enemy.character.asset != blueFlameStillAsset){
				//if we're still, and we haven't updated to the still image, be still!!
				enemy.character.setSprite(blueFlameStillAsset);
			}

			//check for enemy jumping or falling
			if(justPressedSPACE && !enemy.jump && enemy.character.hitsWallY(1)){
				enemy.jump = 1;
				enemy.airTime = -enemy.peakTime;
			}else if(!enemy.jump && !enemy.character.hitsWallY(1)){
				enemy.jump = 1;
				enemy.airTime = 0;
			}

			//if you let go, you start falling if you haven't started yet.
			if(letGoOfSPACE && enemy.jump && enemy.airTime < 0){
				enemy.airTime = 0;
			}

			//if we're jumping or falling
			if(enemy.jump){
				enemy.airTime++;
				var dir = 1;
				if(enemy.airTime < 0){
					dir = -1;
				}
				
				//terminal velocity
				if(enemy.airTime > enemy.peakTime){
					enemy.airTime = enemy.peakTime;
				}

				//move the enemy, also check if we hit the ground.
				if(!enemy.character.moveY(enemy.airTime*enemy.airTime*dir/enemy.airDrag)){
					enemy.jump = 0;
					enemy.airTime = 0;
					//console.log(orvelObject.graphic.y);
				}
			}


			//DEBUG
			if(enemy.character.graphic.y > 1000){
				enemy.character.graphic.y = -100;
			}
		}


		//fire particles
		enemy.fireParticleTimer++;
		if(enemy.fireParticleTimer > 3){
			enemy.fireParticleArray[enemy.fireParticleArray.length] = FireParticle(enemy.character.graphic.x,enemy.character.graphic.y,enemy);
			enemy.fireParticleTimer = 0;
		}

		for(var i = 0;i < enemy.fireParticleArray.length;i++){
			enemy.fireParticleArray[i].update();
		}

		//ensure that input is reset
		if(justPressedSPACE){
			justPressedSPACE = 0;
		}
		if(letGoOfSPACE){
			letGoOfSPACE = 0;
		}

		//remember last input
		enemy.lastDisplaceX = displaceX;
		enemy.lastDisplaceY = displaceY;

		/*if(enemy.character.graphic.x != NaN){
			console.log(playerArray[0].character.graphic.x + " " + playerArray[0].character.graphic.y);
			console.log(enemy.character.graphic.x + " " + enemy.character.graphic.y);
		}*/
	}

	enemy.render = function(){
		for(var i = 0;i < enemy.fireParticleArray.length;i++){
			enemy.fireParticleArray[i].render();
		}
		app.stage.setChildIndex(enemy.character.graphic,childNum);
		childNum++;
	}
	return enemy;
}