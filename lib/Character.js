var Character = function(x,y,asset){

	var character = {};
	character.asset;
	character.graphic;
	character.hitboxWidth;
	character.hitboxHeight;
	character.hasGraphic;

	character.setSprite = function(asset){
		if(character.hasGraphic){
			x = character.graphic.x;
			y = character.graphic.y;
			character.graphic.destroy();
		}
		character.asset = asset;
		character.graphic = new PIXI.Sprite(PIXI.Loader.shared.resources[character.asset.texture].texture);
	  	character.graphic.position.set(x,y);
	  	character.graphic.scale.x = character.asset.scaleX;
	  	character.graphic.scale.y = character.asset.scaleY;
	  	character.graphic.anchor.x = character.asset.anchorX;
	  	character.graphic.anchor.y = character.asset.anchorY;
	  	character.hitboxWidth = character.asset.hbW * character.graphic.width;
	  	character.hitboxHeight = character.asset.hbH * character.graphic.height;
	  	app.stage.addChild(character.graphic);
	  	character.hasGraphic = true;
	}

	character.initialize = function(){
		character.hasAsset = false;
		character.setSprite(asset);
	}();

	//NOT A THING I WROTE: THIS WAS FROM THE TUTORIAL
	character.hitTestRectangle = function(r1, r2) {

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

	character.mX = function(offset){
		character.graphic.x += offset;
		//console.log("mX");
		if(character.graphic.x % 1 != 0){
			if(character.graphic.x % 1 < 0.5){
				character.graphic.x -= character.graphic.x % 1;
			}else{
				character.graphic.x -= character.graphic.x % 1;
				character.graphic.x += 1;
			}
		}
	}

	character.mY = function(offset){
		character.graphic.y += offset;
		//console.log("mY");
		if(character.graphic.y % 1 != 0){
			if(character.graphic.y % 1 < 0.5){
				character.graphic.y -= character.graphic.y % 1;
			}else{
				character.graphic.y -= character.graphic.y % 1;
				character.graphic.y += 1;
			}
		}
	}

	character.hitsWall = function(){
		var hit = false;
		for(var i = 0;i < wallArray.length;i++){
			if(character.hitTestRectangle(character, wallArray[i].character)){
				hit = true;
			}
		}
		return hit;
	}

	character.hitsWallX = function(offset){
		if(offset != 0){
			character.mX(offset);
		}
		var hit = character.hitsWall();
		if(offset != 0){
			character.mX(-offset);
		}
		return hit;
	}

	character.hitsWallY = function(offset){
		if(offset != 0){
			character.mY(offset);
		}
		var hit = character.hitsWall();
		if(offset != 0){
			character.mY(-offset);
		}
		return hit;
	}

	character.moveX = function(offset){
		var noHit = true;
		character.mX(offset);
		if(character.hitsWall()){
			noHit = false;
			var distance = Math.abs(offset);
			if(distance == 1){
				character.mX(-offset);
				//console.log("small HIT X");
			}else{
				var c = 0;
				var dir = 1;
				if(offset < 0){
					dir = -1;
				}
				while(true){
					character.mX(-dir);
					if(!character.hitsWallY(0)){
						break;
					}
					c++;
					if(c > distance){
						break;
					}
				}
				//console.log("big HIT X");
			}
		}
		return noHit;
	}

	character.moveY = function(offset){
		var noHit = true;
		character.mY(offset);
		if(character.hitsWall()){
			noHit = false;
			var distance = Math.abs(offset);
			if(distance == 1){
				character.mY(-offset);
				//console.log("small HIT Y");
			}else{
				var c = 0;
				var dir = 1;
				if(offset < 0){
					dir = -1;
				}
				while(true){
					character.mY(-dir);
					if(!character.hitsWallY(0)){
						break;
					}
					c++;
					if(c > distance){
						break;
					}
				}
				//console.log("big HIT Y");
			}
		}
		return noHit;
	}

	character.move = function(xOffset,yOffset){
		character.moveX(xOffset);
		character.moveY(yOffset);
	}

	return character;
}