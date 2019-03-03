var Player = function(x,y,asset){
	var player = {};
	player.character;
	player.moveDir;
	player.attackDir;
	player.spd;
	player.jump;
	player.jumpReset;
	player.airTime;
	player.peakTime;
	player.airDrag;
	player.useJumpingMechanic;
	player.lastDir;

	player.fireParticleTimer;
	player.fireParticleArray;

	player.fireRate;
	player.fireCooldownTimer;

	player.healthParts;
	player.maxHealth;
	player.health;
	player.healthGraphicArray = [];

	player.update = function(){

		if(keyboard.getKeyStatus("i") == "pressed"){
			player.changeHealth(1);		
		}

		if(keyboard.getKeyStatus("o") == "pressed"){
			player.changeHealth(-1);
		}

		player.moveDir = 0;

		if(keyboard.getKeyHardwareStatus("a")){
			player.moveDir --;
		}

		if(keyboard.getKeyHardwareStatus("d")){
			player.moveDir ++;
		}

		if(player.moveDir != 0){
			player.attackDir = player.moveDir;
		}

		if(player.useJumpingMechanic){
			if(player.moveDir != 0){

				//update the flame sprite if we're moving in a direction
				if(player.lastDir != player.moveDir){
					redFlameMovingAsset.scaleX = redFlameMovingAsset.defaultScaleX*player.moveDir;
					player.character.setSprite(redFlameMovingAsset);
				}

				player.character.moveX(player.moveDir*player.spd);

			}else if(player.character.asset != redFlameStillAsset){
				//if we're still, and we haven't updated to the still image, be still!!
				player.character.setSprite(redFlameStillAsset);
			}

			//check for player jumping or falling
			if(keyboard.getKeyStatus(" ") == "pressed" && !player.jump && player.character.hitsWallY(1)){
				player.jump = 1;
				player.airTime = -player.peakTime;
			}else if(!player.jump && !player.character.hitsWallY(1)){
				player.jump = 1;
				player.airTime = 0;
			}

			//if you let go, you start falling if you haven't started yet.
			if(keyboard.getKeyStatus(" ") == "released" && player.jump && player.airTime < 0){
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
		if(keyboard.getKeyStatus("j") == "pressed" && player.fireCooldownTimer == 0){
			fireProjectileArray[fireProjectileArray.length] = FireProjectile(player.character.graphic.x,player.character.graphic.y,player.attackDir,player,redFlameMovingAsset);
			player.fireCooldownTimer = player.fireRate;
		}
		if(player.fireCooldownTimer > 0){
			player.fireCooldownTimer--;
		}

		//remember last input
		player.lastDir = player.moveDir;
	}

	player.render = function(){
		if(scrollXOffset != 0){
			player.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			player.character.mY(scrollYOffset);
		}

		for(var i = 0;i < player.healthGraphicArray.length;i++){
			player.healthGraphicArray[i].render();
		}

		for(var i = 0;i < player.fireParticleArray.length;i++){
			player.fireParticleArray[i].render();
		}
		app.stage.setChildIndex(player.character.graphic,childNum);
		childNum++;
	}

	player.updateHealthGraphics = function(){

		player.destroyHealthGraphics();

		var xOffset = 30;
		var yOffset = 30;
		var c = player.health;
		var bigGraphics = (player.health-1) / player.healthParts - (player.health-1) / player.healthParts % 1;
		if(bigGraphics < 0){
			bigGraphics = 0;
		}
		c-=player.healthParts*bigGraphics;

		for(var i = 0; i < c; i++){
			player.healthGraphicArray[player.healthGraphicArray.length] = HealthGraphic(xOffset,yOffset,0);
			yOffset += 24;
		}

		for(var i = 0; i < bigGraphics; i++){
			xOffset += 56;
			yOffset = 54;

			player.healthGraphicArray[player.healthGraphicArray.length] = HealthGraphic(xOffset,yOffset,1);
		}

	}

	player.destroyHealthGraphics = function(){
		for(var i = 0; i < player.healthGraphicArray.length; i++){
			player.healthGraphicArray[i].destroy();
		}
		//destroy array
		player.healthGraphicArray.length = 0;
	}

	player.changeHealth = function(offset){
		player.health += offset;

		if(player.health > player.maxHealth){
			player.health = player.maxHealth;
		}else if(player.health <= 0){
			player.health = 0;
		}

		player.updateHealthGraphics();
		
		var text;
		if(offset > 0){
			text = "increased ";
		}else{
			text = "decreased ";
		}
	}

	player.initialize = function(){
		player.character = Character(x,y,asset);
		playerArray[playerArray.length] = player;
		player.moveDir = 0;
		player.attackDir = 1;
		player.spd = 6;
		player.jump = 0;
		player.jumpReset = 0;
		player.airTime = 0;
		player.peakTime = 25;
		player.airDrag = 20;
		player.useJumpingMechanic = true;
		player.lastDir = 0;

		player.fireParticleTimer = 0;
		player.fireParticleArray = [];

		player.fireRate = 60;
		player.fireCooldownTimer = 0;

		player.healthParts = 10;
		player.maxHealth = player.healthParts*3;
		player.health = player.maxHealth;
		player.updateHealthGraphics();
	}();

	return player;
}