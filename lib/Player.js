var Player = function(x,y,asset){
	var player = {};
	player.character;
	player.dir;
	player.spd;
	player.jump;
	player.jumpReset;
	player.airTime;
	player.peakTime;
	player.airDrag;
	player.useJumpingMechanic;
	player.lastDisplaceX;
	player.lastDisplaceY;

	player.fireParticleTimer;
	player.fireParticleArray;

	player.fireRate;
	player.fireCooldownTimer;

	player.initialize = function(){
		player.character = Character(x,y,asset);
		playerArray[playerArray.length] = player;
		player.dir = 1;
		player.spd = 6;
		player.jump = 0;
		player.jumpReset = 0;
		player.airTime = 0;
		player.peakTime = 25;
		player.airDrag = 20;
		player.useJumpingMechanic = true;
		player.lastDisplaceX = 0;
		player.lastDisplaceY = 0;

		player.fireParticleTimer = 0;
		player.fireParticleArray = [];

		player.fireRate = 10;
		player.fireCooldownTimer = 0;
	}();

	player.update = function(){
		var displaceX = (RIGHT-LEFT);
		var displaceY = (DOWN-UP);

		if(displaceX != 0){
			player.dir = displaceX;
		}

		if(!player.useJumpingMechanic){
			if(displaceX != 0){
				player.character.moveX(displaceX*player.spd);
			}
			if(displaceY != 0){

				player.character.moveY(displaceY*player.spd);
			}
		}else{
			if(displaceX != 0){

				//update the flame sprite if we're moving in a direction
				if(player.lastDisplaceX != displaceX){
					//console.log("SPRITE UPDATE!");
					var dir;
					if(displaceX < 0){
						dir = -1;
					}else{
						dir = 1;
					}
					redFlameMovingAsset.scaleX = redFlameMovingAsset.defaultScaleX*dir;
					player.character.setSprite(redFlameMovingAsset);
				}

				player.character.moveX(displaceX*player.spd);

			}else if(player.character.asset != redFlameStillAsset){
				//if we're still, and we haven't updated to the still image, be still!!
				player.character.setSprite(redFlameStillAsset);
			}

			//check for player jumping or falling
			if(justPressedSPACE && !player.jump && player.character.hitsWallY(1)){
				player.jump = 1;
				player.airTime = -player.peakTime;
			}else if(!player.jump && !player.character.hitsWallY(1)){
				player.jump = 1;
				player.airTime = 0;
			}

			//if you let go, you start falling if you haven't started yet.
			if(letGoOfSPACE && player.jump && player.airTime < 0){
				player.airTime = 0;
			}

			//if we're jumping or falling
			if(player.jump){
				player.airTime++;
				var jumpDir = 1;
				if(player.airTime < 0){
					jumpDir = -1;
				}
				
				//terminal velocity
				if(player.airTime > player.peakTime){
					player.airTime = player.peakTime;
				}

				//move the player, also check if we hit the ground.
				if(!player.character.moveY(player.airTime*player.airTime*jumpDir/player.airDrag)){
					player.jump = 0;
					player.airTime = 0;
					//console.log(orvelObject.graphic.y);
				}
			}


			//DEBUG
			if(globalY > 800){
				//this moves all entities 1600 pixels up
				player.character.graphic.y = -1600;
			}
		}


		//fire particles
		player.fireParticleTimer++;
		if(player.fireParticleTimer > 3){
			player.fireParticleArray[player.fireParticleArray.length] = FireParticle(player.character.graphic.x,player.character.graphic.y,player);
			player.fireParticleTimer = 0;
		}

		for(var i = 0;i < player.fireParticleArray.length;i++){
			player.fireParticleArray[i].update();
		}

		//shoot fire projectile
		//if you press a button then shoot if the time is zero
		if(justPressedAttack && player.fireCooldownTimer == 0){
			fireProjectileArray[fireProjectileArray.length] = FireProjectile(player.character.graphic.x,player.character.graphic.y,player,redFlameMovingAsset);
			player.fireCooldownTimer = player.fireRate;
		}
		if(player.fireCooldownTimer > 0){
			player.fireCooldownTimer--;
		}

		//ensure that input is reset
		if(justPressedSPACE){
			justPressedSPACE = 0;
		}
		if(letGoOfSPACE){
			letGoOfSPACE = 0;
		}
		if(justPressedAttack){
			justPressedAttack = 0;
		}

		//remember last input
		player.lastDisplaceX = displaceX;
		player.lastDisplaceY = displaceY;
	}

	player.render = function(){
		if(scrollXOffset != 0){
			player.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			player.character.mY(scrollYOffset);
		}

		for(var i = 0;i < player.fireParticleArray.length;i++){
			player.fireParticleArray[i].render();
		}
		app.stage.setChildIndex(player.character.graphic,childNum);
		childNum++;
	}
	return player;
}