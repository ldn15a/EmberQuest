var Player = function(x,y,asset){
    var player = {};
    player.private = {};

	player.character;
	player.asset;
	player.originX;
	player.originY;
	player.canControl;
	player.moveDir;
	player.attackDir;
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

	player.wetness;
	player.wetnessMax;
	player.wetnessGraphic;

    player.private.items;

	player.update = function(){
		
		//debug
		if(keyboard.getKeyStatus("i") == "pressed"){
			player.changeHealth(1);
		}

		if(keyboard.getKeyStatus("o") == "pressed"){
			player.changeHealth(-1);
		}

		if(player.canControl){
			//movement
			moveDir = 0;

			if(keyboard.getKeyHardwareStatus("a")){
				moveDir --;
			}

			if(keyboard.getKeyHardwareStatus("d")){
				moveDir ++;
			}

			if(moveDir != 0){
				player.attackDir = moveDir;
			}

			var jumpInput = keyboard.getKeyHardwareStatus(" ");
			if(keyboard.getKeyStatus(" ") == "pressed" && player.character.checkIfJumping()){
				audio.forcePlay("jump");
			}

			player.character.movement(moveDir, jumpInput);
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
		player.wetnessControl();
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

	player.wetnessControl = function(){
		if(player.character != undefined && player.character.wetness > 0){
			player.wetness += player.character.wetness;
			while(player.wetness >= player.wetnessMax){
				player.wetness -= player.wetnessMax;
				player.changeHealth(-1);
			}
		}else if(player.wetness > 0){
			player.wetness-=2;
			if(player.wetness < 0){
				player.wetness = 0;
			}
		}
		if(player.wetnessGraphic != undefined){
			player.wetnessGraphic.updateVisuals(player.wetness);
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
			player.healthGraphicArray[i] = null;
		}
		player.healthGraphicArray.length = 0;
	}

	player.changeHealth = function(offset){
		player.health += offset;
		if(offset < 0){
			audio.forcePlay("dmg");
		}else if(offset > 0){
			audio.forcePlay("gainingHealth");
		}

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

		if(player.health <= 0){
			audio.forcePlay("heroDeath");
			areaController.loadArea("lastArea");
		}
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
		player.wetnessGraphic = WetnessGraphic(8,app.view.height-8);
		player.health = player.maxHealth;
		player.updateHealthGraphics();
	}

	player.unload = function(){
		player.destroyHealthGraphics();
		player.wetnessGraphic.unload();
		player.particleController.free();
		player.character.unload();
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
		player.wetnessGraphic.depth();

		app.stage.setChildIndex(player.character.graphic,childNum);
		childNum++;
	}

	player.initialize = function(){
		player.asset = asset;
		player.originX = x;
		player.originY = y;
		player.attackDir = 1;

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

		player.wetness = 0;
        player.wetnessMax = 100;
        
        player.private.items = Inventory ();
	}();

	return player;
}