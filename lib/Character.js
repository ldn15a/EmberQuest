var Character = function (x, y, asset) {

	var character = {};
	character.asset;
	character.graphic;
	character.hitboxWidth;
	character.hitboxHeight;
	character.hasGraphic;
	character.moveDir;
	character.spd;
	character.jump;
	character.jumpReset;
	character.airTime;
	character.peakTime;
	character.airDrag;
	character.useJumpingMechanic;
	character.lastJumpInput;

	character.setSprite = function (asset) {
		if (character.hasGraphic) {
			x = character.graphic.x;
			y = character.graphic.y;
			character.graphic.destroy();
		}
		character.asset = asset;
		character.graphic = new PIXI.Sprite(PIXI.Loader.shared.resources[character.asset.texture].texture);
		character.graphic.position.set(x, y);
		character.graphic.scale.x = character.asset.scaleX;
		character.graphic.scale.y = character.asset.scaleY;
		character.graphic.anchor.x = character.asset.anchorX;
		character.graphic.anchor.y = character.asset.anchorY;
		character.hitboxWidth = character.asset.hbW * character.graphic.width;
		character.hitboxHeight = character.asset.hbH * character.graphic.height;
		addChildToStage(character.graphic);
		character.hasGraphic = true;
	}

	character.initialize = function () {
		character.hasAsset = false;
		if (asset != undefined) {
			character.setSprite(asset);
		}
		character.moveDir = 0;
		character.spd = 6;
		character.jump = 0;
		character.jumpReset = 0;
		character.airTime = 0;
		character.peakTime = 25;
		character.airDrag = 20;
		character.useJumpingMechanic = true;
		character.lastDir = 0;
		character.lastJumpInput = false;
	}();

	character.getPositionX = function() {
		return globalX - (app.view.width / 2 - character.graphic.x);
	}

	character.getPositionY = function() {
		return globalY - (app.view.height / 2 - character.graphic.y);
	}

	character.setPositionX = function(xPos) {
		character.graphic.x = xPos - globalX + app.view.width/2;
	}

	character.setPositionY = function(yPos) {
		character.graphic.y = yPos - globalY + app.view.height/2;
	}

	//NOT A THING I WROTE: THIS WAS FROM THE TUTORIAL
	character.hitTestRectangle = function (r1, r2) {

		//Define the variables we'll need to calculate
		let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

		//hit will determine whether there's a collision
		hit = false;

		//Find the half-widths and half-heights of each sprite
		var r1halfWidth = (r1.hitboxWidth) / 2;
		var r1halfHeight = (r1.hitboxHeight) / 2;
		var r2halfWidth = (r2.hitboxWidth) / 2;
		var r2halfHeight = (r2.hitboxHeight) / 2;

		//Find the center points of each sprite
		var r1centerX = r1.graphic.x + r1.graphic.anchor.x;
		var r1centerY = r1.graphic.y + r1.graphic.anchor.y;
		var r2centerX = r2.graphic.x + r2.graphic.anchor.x;
		var r2centerY = r2.graphic.y + r2.graphic.anchor.y;

		//Calculate the distance vector between the sprites
		vx = r1centerX - r2centerX;
		vy = r1centerY - r2centerY;

		//Figure out the combined half-widths and half-heights
		combinedHalfWidths = r1halfWidth + r2halfWidth;
		combinedHalfHeights = r1halfHeight + r2halfHeight;

		//Check for a collision on the x axis
		if (Math.abs(vx) < combinedHalfWidths) {

			//A collision might be occurring. Check for a collision on the y axis
			return Math.abs(vy) < combinedHalfHeights;
		}

		return false;
	};

	character.mX = function (offset) {
		character.graphic.x += offset;
		//console.log("mX");
		if (character.graphic.x % 1 != 0) {
			if (character.graphic.x % 1 < 0.5) {
				character.graphic.x -= character.graphic.x % 1;
			} else {
				character.graphic.x -= character.graphic.x % 1;
				character.graphic.x += 1;
			}
		}
	}

	character.mY = function (offset) {
		character.graphic.y += offset;
		//console.log("mY");
		if (character.graphic.y % 1 != 0) {
			if (character.graphic.y % 1 < 0.5) {
				character.graphic.y -= character.graphic.y % 1;
			} else {
				character.graphic.y -= character.graphic.y % 1;
				character.graphic.y += 1;
			}
		}
	}

	character.hitsWall = function(speed){
		var hit = false;
		var cannotHitPlatform = keyboard.getKeyHardwareStatus("s");
		var i = 0;
		while(true){
			if(i == wallArray.length){
				break;
			}
			if(wallArray[i].isPlatform){
				if(!cannotHitPlatform && speed >= 0){
					if(wallArray[i].character != undefined){
						if(character.hitTestRectangle(character, wallArray[i].character)){
							character.mY(-speed);
							if(!character.hitTestRectangle(character, wallArray[i].character)){
								hit = true;
							}
							character.mY(speed);
						}
					} else {
						console.warn("Trying a collision with a wall without a character object.");
					}
				}
			}else{
				if(wallArray[i].character != undefined){
					if(character.hitTestRectangle(character, wallArray[i].character)){
						hit = true;
					}
				}else{
					console.warn("Trying a collision with a wall without a character object.");
				}
			}
			i++;
		}
		return hit;
	}

	character.hitsWallX = function (offset) {
		if (offset != 0) {
			character.mX(offset);
		}
		var hit = character.hitsWall(offset);
		if(offset != 0){
			character.mX(-offset);
		}
		return hit;
	}

	character.hitsWallY = function (offset) {
		var platformHit = false;
		if(offset != 0){
			character.mY(offset);
		}
		var hit = character.hitsWall(offset);
		if(offset != 0){
			character.mY(-offset);
		}
		return hit;
	}

	character.moveX = function (offset) {
		var noHit = true;
		if (character.hitsWallX(offset)) {
			noHit = false;
			var distance = Math.abs(offset);
			if (distance != 1) {
				character.mX(offset);
				var c = 0;
				var dir = 1;
				if (offset < 0) {
					dir = -1;
				}
				while (true) {
					character.mX(-dir);
					if (!character.hitsWallX(0)) {
						break;
					}
					c++;
					if (c > distance) {
						break;
					}
				}
				//console.log("big HIT X");
			}
		} else {
			character.mX(offset);
		}
		return noHit;
	}

	character.moveY = function (offset) {
		var noHit = true;
		if (character.hitsWallY(offset)) {
			noHit = false;
			var distance = Math.abs(offset);
			if (distance != 1) {
				//character.mY(offset);
				var c = 0;
				var dir = 1;
				if (offset < 0) {
					dir = -1;
				}
				while (c < Math.abs(offset)) {
					if (character.hitsWallY(dir)) {
						break;
					}
					character.mY(dir);
					c++;
					if (c > distance) {
						break;
					}
				}
				//console.log("big HIT Y");
			}
		} else {
			character.mY(offset);
		}
		return noHit;
	}

	character.move = function (xOffset, yOffset) {
		character.moveX(xOffset);
		character.moveY(yOffset);
	}

	character.unload = function (){
		app.stage.removeChild(character.graphic);
		character.graphic.destroy();
	}

	character.movement = function (moveDirection, jumpInput) {
		character.moveDir = moveDirection;
		if(jumpInput == undefined){
			jumpInput = false;
			console.log("JumpInput not defined!");
		}

		if(character.moveDir != 0){

			//update the flame sprite if we're moving in a direction
			if(character.lastDir != character.moveDir){
				redFlameMovingAsset.scaleX = redFlameMovingAsset.defaultScaleX*character.moveDir;
				character.setSprite(redFlameMovingAsset);
			}

			character.moveX(character.moveDir*character.spd);

		}else if(character.asset != redFlameStillAsset){
			//if we're still, and we haven't updated to the still image, be still!!
			character.setSprite(redFlameStillAsset);
		}
		if(character.useJumpingMechanic){

			//check for character jumping or falling
			if(!character.lastJumpInput && jumpInput && !character.jump && character.hitsWallY(1)){
				character.jump = 1;
				character.airTime = -character.peakTime;
			}else if(!character.jump && !character.hitsWallY(1)){
				character.jump = 1;
				character.airTime = 0;
			}

			//if you let go, you start falling if you haven't started yet.
			if(character.lastJumpInput && !jumpInput && character.jump && character.airTime < 0){
				character.airTime = 0;
			}
		}

		//if we're jumping or falling
		if(character.jump){
			character.airTime++;
			var jumpDir = 1;
			if(character.airTime < 0){
				jumpDir = -1;
			}
			
			//terminal velocity
			if(character.airTime > character.peakTime){
				character.airTime = character.peakTime;
			}

			//move the character, also check if we hit the ground.
			if(!character.moveY(character.airTime*character.airTime*jumpDir/character.airDrag)){
				character.jump = 0;
				character.airTime = 0;
				//console.log(orvelObject.graphic.y);
			}
		}

		character.lastJumpInput = jumpInput;


		//DEBUG
		if(globalY > 600){
			//this moves all entities 1600 pixels up
			character.graphic.y = -1800;
		
		}
	}

	return character;
}