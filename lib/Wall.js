var Wall = function(x,y,asset,isPlatform){
	var wall = {};
	wall.character;
	wall.asset;
	wall.originX;
	wall.originY;
	wall.isPlatform;

	wall.initialize = function(){
		wall.asset = asset;
		wall.originX = x;
		wall.originY = y;
		wall.isPlatform = isPlatform;
	}();

	wall.load = function(){
		wall.character = Character(wall.originX,wall.originY,wall.asset);
		wallArray[wallArray.length] = wall;
	}

	wall.unload = function(){
		wall.character.graphic.destroy();
		for(var i = 0; i < wallArray.length; i++){
			if(wallArray[i] == wall){
				wallArray.splice(i,1);
			}
		}
	}

	wall.scroll = function(){
		if(scrollXOffset != 0){
			wall.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			wall.character.mY(scrollYOffset);
		}
	}
	
	wall.depth = function(){
		app.stage.setChildIndex(wall.character.graphic,childNum);
		childNum++;
	}

	return wall;
}