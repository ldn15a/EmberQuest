var Miniboss = function(x,y){
	var miniboss = {};
	miniboss.character;
	miniboss.spd;
	miniboss.jump;
	miniboss.jumpReset;
	miniboss.airTime;
	miniboss.peakTime;
	miniboss.airDrag;
	miniboss.useJumpingMechanic;
	miniboss.lastDisplaceX;
	miniboss.lastDisplaceY;
	miniboss.asset;
	miniboss.originX;
	miniboss.originY;
	miniboss.sightX;
	miniboss.invulnerableTime;
	miniboss.maxInvulnerability;
	miniboss.health;
	miniboss.maxHealth;
	miniboss.friendly;
	miniboss.attack;
	miniboss.damage;
	miniboss.pierce;

	miniboss.minibossJumps;

	miniboss.particleController;

	miniboss.initialize = function(){
		miniboss.asset = asset;
		miniboss.originX = x;
		miniboss.originY = y;
		miniboss.spd = 6;
		miniboss.jump = 0;
		miniboss.jumpReset = 0;
		miniboss.airTime = 0;
		miniboss.peakTime = 25;
		miniboss.airDrag = 20;
		miniboss.useJumpingMechanic = true;
		miniboss.lastDisplaceX = 0;
		miniboss.lastDisplaceY = 0;
		miniboss.sightX = 240;
		miniboss.invulnerableTime = 0;
		miniboss.maxInvulnerability = 30;
		miniboss.maxHealth = 15;
		miniboss.health = miniboss.maxHealth;
		miniboss.friendly = false;
		miniboss.attack = true;
		miniboss.damage = 10;
		miniboss.pierce = true;

		miniboss.minibossJumps = false;
	}();

	miniboss.update = function(){

		var displaceX;
		if(miniboss.character.graphic.x < playerArray[0].character.graphic.x && playerArray[0].character.graphic.x - miniboss.character.graphic.x <= miniboss.sightX) //miniboss doesn't follow the player unless they're in range
		{
			displaceX = 1;
		}
		else if(miniboss.character.graphic.x > playerArray[0].character.graphic.x && miniboss.character.graphic.x - playerArray[0].character.graphic.x <= miniboss.sightX)
		{
			displaceX = -1;
		}
		else
		{
			displaceX = 0;
		}

		//stun if damaged.
		if(miniboss.invulnerableTime > 0){
			displaceX = 0;
		}

		var displaceY = 0; //= (DOWN-UP);

		if(miniboss.character.hitsWallX(displaceX*miniboss.spd))
		{
			miniboss.minibossJumps = true;
		}else{
			miniboss.minibossJumps = false;
		}

		miniboss.character.movement(displaceX,miniboss.minibossJumps);

		

		//update particleController
		miniboss.particleController.update();

		//have we taken damage?
		miniboss.checkIfDamaged();
	}

	miniboss.checkIfDamaged = function(){
		if(miniboss.invulnerableTime == 0){
			var c = 0;
			var highestDamage = 0;
			var attackInQuestion = null;
			//go through every generated object and find the most damaging thing that is colliding with us. Take that damage, and if that entity can be destroyed when it attacks, destroy it. Also gain i frames.
			while(c < generatedObjectsArray.length){
				//is the object an attack?
				if(generatedObjectsArray[c].attack != undefined && generatedObjectsArray[c].attack){
					//is this entity of the opposite nature? (i.e. if we are not friendly, and it is, then we take damage)
					if(generatedObjectsArray[c].friendly != undefined && generatedObjectsArray[c].friendly != miniboss.friendly){
						//does the object have collision, and if so, are we colliding?
						if(generatedObjectsArray[c].character != undefined && generatedObjectsArray[c].character.graphic != undefined && miniboss.character.hitTestRectangle(miniboss.character, generatedObjectsArray[c].character)){
							//is the damage not null and greater than 0/our last highest damage?
							if(generatedObjectsArray[c].damage != undefined && generatedObjectsArray[c].damage > highestDamage){
								highestDamage = generatedObjectsArray[c].damage;
								attackInQuestion = generatedObjectsArray[c];
							}
						}
					}
				}
				c++;
			}
			if(attackInQuestion != null){
				miniboss.invulnerableTime = miniboss.maxInvulnerability;
				miniboss.changeHealth(-1*highestDamage);
				if(attackInQuestion.pierce != undefined && attackInQuestion.pierce == false){
					attackInQuestion.unload();
				}
				attackInQuestion = null;
			}
		}else{
			miniboss.invulnerableTime--;
			if(miniboss.invulnerableTime > 0){
				if(miniboss.invulnerableTime % 3 == 0 || miniboss.invulnerableTime % 4 == 0){
					miniboss.character.graphic.alpha = .25;
				}else{
					miniboss.character.graphic.alpha = 1;
				}
			}
		}
	}

	miniboss.changeHealth = function(offset){
		miniboss.health += offset;

		if(miniboss.health > miniboss.maxHealth){
			miniboss.health = miniboss.maxHealth;
		}else if(miniboss.health <= 0){
			miniboss.health = 0;
			for(var i = 0; i < 10; i++){
				Cinder(miniboss.character.graphic.x,miniboss.character.graphic.y);
			}
			//die if we lose all health
			miniboss.unload();
		}
	}

	miniboss.load = function(){
		miniboss.character = Character(miniboss.originX,miniboss.originY,miniboss.asset);
		miniboss.character.graphic.scale.x*=3;
		miniboss.character.graphic.scale.y*=3;
		miniboss.character.spd = 3;
		enemyArray.push(miniboss);
		miniboss.particleController = ParticleController(miniboss.character.graphic.x,miniboss.character.graphic.y,miniboss);
	}

	miniboss.unload = function(){

		miniboss.character.unload();
	}

	miniboss.scroll = function(){
		if(scrollXOffset != 0){
			miniboss.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			miniboss.character.mY(scrollYOffset);
		}
		
		miniboss.particleController.scroll();
		
	}

	miniboss.depth = function(){
		miniboss.particleController.depth();

		app.stage.setChildIndex(miniboss.character.graphic,childNum);
		childNum++;
	}

	return miniboss;
}