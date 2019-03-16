var Player = function(x,y,asset){
	var player = {};
	player.character;
	player.asset;
	player.originX;
	player.originY;
	player.canControl;
	player.moveDir;
	player.attackDir;
	player.spd;
	player.jump;
	player.jumpReset;
	player.airTime;
	player.peakTime;
	player.airDrag;
	player.useJumpingMechanic;
	player.fireRate;
	player.minimumFireRate;
	player.fireCooldownTimer;
	player.particleController;
	player.invulnerableTime;
	player.maxInvulnerability;
	player.friendly;

	player.healthParts;
	player.maxHealth;
	player.health;
	player.healthGraphicArray = [];
	player.healthRegenGraphic;
	player.attackDamage;

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
			if(player.canControl){
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
			if(globalY > 600){
				//this moves all entities 1600 pixels up
				player.character.graphic.y = -1800;
			}
		}else{
			var ydir = 0;
			if(keyboard.getKeyHardwareStatus("w")){
				ydir --;
			}

			if(keyboard.getKeyHardwareStatus("s")){
				ydir ++;
			}

			player.character.moveX(player.moveDir*player.spd);

			player.character.moveY(ydir*player.spd);
		}

		//regen Health
		if(player.healthRegenGraphic != undefined){
			player.healthRegenGraphic.update();
		}

		player.particleController.update();


		if(player.canControl){
			//shoot fire projectile
			//if you press a button then shoot if the time is zero
			if(keyboard.getKeyStatus("j") == "pressed" && player.fireCooldownTimer < player.fireRate - player.minimumFireRate){
				player.gainSingleHealthRegen();
				player.changeHealth(-2);
				FireProjectile(player.character.graphic.x,player.character.graphic.y+14,player.attackDir,player,true,player.attackDamage,redFlameMovingAsset);
				player.fireCooldownTimer = player.fireRate;
			}
		}
		if(player.fireCooldownTimer > 0){
			player.fireCooldownTimer--;
		}

		//remember last input
		player.lastDir = player.moveDir;

		player.checkIfDamaged();
	}

	player.checkIfDamaged = function(){
		if(player.invulnerableTime == 0){
			var c = 0;
			var highestDamage = 0;
			var attackInQuestion = null;
			//go through every generated object and find the most damaging thing that is colliding with us. Take that damage, and if that entity can be destroyed when it attacks, destroy it. Also gain i frames.
			while(c < generatedObjectsArray.length){
				//is the object an attack?
				if(generatedObjectsArray[c].attack != undefined && generatedObjectsArray[c].attack){
					//is this entity of the opposite nature? (i.e. if we are not friendly, and it is, then we take damage)
					if(generatedObjectsArray[c].friendly != undefined && generatedObjectsArray[c].friendly != player.friendly){
						//does the object have collision, and if so, are we colliding?
						if(generatedObjectsArray[c].character != undefined && generatedObjectsArray[c].character.graphic != undefined && player.character.hitTestRectangle(player.character, generatedObjectsArray[c].character)){
							//is the damage not null and greater than 0/our last highest damage?
							if(generatedObjectsArray[c].damage != undefined && Math.abs(generatedObjectsArray[c].damage) > highestDamage){
								highestDamage = generatedObjectsArray[c].damage;
								attackInQuestion = generatedObjectsArray[c];
							}
						}
					}
				}
				c++;
			}

			while(c < enemyArray.length){
				//is the object an attack?
				if(enemyArray[c].attack != undefined && enemyArray[c].attack){
					//is this entity of the opposite nature? (i.e. if we are not friendly, and it is, then we take damage)
					if(enemyArray[c].friendly != undefined && enemyArray[c].friendly != player.friendly){
						//does the object have collision, and if so, are we colliding?
						if(enemyArray[c].character != undefined && enemyArray[c].character.graphic != undefined && player.character.hitTestRectangle(player.character, enemyArray[c].character)){
							//is the damage not null and greater than 0/our last highest damage?
							if(enemyArray[c].damage != undefined && enemyArray[c].damage > highestDamage){
								highestDamage = enemyArray[c].damage;
								attackInQuestion = enemyArray[c];
							}
						}
					}
				}
				c++;
			}

			if(attackInQuestion != null){
				if(highestDamage > 0){
					player.invulnerableTime = player.maxInvulnerability;
				}
				player.changeHealth(-1*highestDamage);
				if(attackInQuestion.pierce != undefined && attackInQuestion.pierce == false){
					attackInQuestion.unload();
				}
				attackInQuestion = null;
			}
		}else{
			player.invulnerableTime--;
			if(player.invulnerableTime > 0){
				if(player.invulnerableTime % 3 == 0 || player.invulnerableTime % 4 == 0){
					player.character.graphic.alpha = .25;
				}else{
					player.character.graphic.alpha = 1;
				}
			}
		}
	}

	player.updateHealthGraphics = function(){

		player.destroyHealthGraphics();

		var xOffset = 30;
		var yOffset = 30;
		var c = player.health;
		var extraGraphic = 0;

		if(player.health < player.maxHealth && player.healthRegenGraphic != undefined){
			extraGraphic = 1;
		}

		var bigGraphics = (player.health+extraGraphic-1) / player.healthParts - (player.health+extraGraphic-1) / player.healthParts % 1;
		if(bigGraphics < 0){
			bigGraphics = 0;
		}
		c-=player.healthParts*bigGraphics;

		for(var i = 0; i < c; i++){
			player.healthGraphicArray[player.healthGraphicArray.length] = HealthGraphic(xOffset,yOffset,0);
			yOffset += 24;
		}

		if(player.health < player.maxHealth && player.healthRegenGraphic != undefined){
			player.healthRegenGraphic.startingY = yOffset - player.healthRegenGraphic.maxHeight;;
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

		//ensure that there's no shenanigans
		if(player.health >= player.maxHealth){
			player.loseSingleHealthRegen();
		}

		if(player.health > player.maxHealth){
			player.health = player.maxHealth;
		}else if(player.health <= 0){
			player.health = 0;
			player.loseSingleHealthRegen();
		}

		player.updateHealthGraphics();
	}

	player.gainSingleHealthRegen = function(){
		player.loseSingleHealthRegen();

		if(player.health > 0){

			var xOffset = 30;
			var yOffset = 30;
			var c = player.health;
			var bigGraphics = (player.health-1) / player.healthParts - (player.health-1) / player.healthParts % 1;
			if(bigGraphics < 0){
				bigGraphics = 0;
			}
			c-=player.healthParts*bigGraphics;

			for(var i = 0; i < c; i++){
				yOffset += 24;
			}

			player.healthRegenGraphic = HealthGraphic(xOffset,yOffset,2);
			player.healthRegenGraphic.endTime = player.fireRate;
		}
	}

	player.loseSingleHealthRegen = function(){
		if(player.healthRegenGraphic != undefined){
			player.healthRegenGraphic.destroy();
			player.healthRegenGraphic = null;
		}
	}

	player.load = function(){
		player.character = Character(player.originX,player.originY,player.asset);
		playerArray[playerArray.length] = player;
		player.canControl = true;
		player.particleController = ParticleController(player.character.graphic.x,player.character.graphic.y,player);
		player.updateHealthGraphics();
	}

	player.unload = function(){
		player.destroyHealthGraphics();
		player.particleController.free();
		player.character.graphic.destroy();
		for(var i = 0; i < playerArray.length; i++){
			if(playerArray[i] == player){
				playerArray.splice(i,1);
			}
		}
	}

	player.scroll = function(){
		if(scrollXOffset != 0){
			player.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			player.character.mY(scrollYOffset);
		}
		player.particleController.scroll();
	}

	player.depth = function(){
		for(var i = 0;i < player.healthGraphicArray.length;i++){
			player.healthGraphicArray[i].depth();
		}
		player.particleController.depth();
		

		app.stage.setChildIndex(player.character.graphic,childNum);
		childNum++;
	}

	player.initialize = function(){
		player.asset = asset;
		player.originX = x;
		player.originY = y;
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

		player.invulnerableTime = 0;
		player.maxInvulnerability = 60;
		player.friendly = true;

		player.fireRate = 120;
		player.minimumFireRate = 4;
		player.fireCooldownTimer = 0;
		player.attackDamage = 1;

		player.healthParts = 10;
		player.maxHealth = player.healthParts*3;
		player.health = player.maxHealth;
	}();

	return player;
}