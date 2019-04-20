var Platform = function(x,y,asset){
	var platform = {};
	platform.character;
	platform.asset;
	platform.originX;
	platform.originY;

	platform.initialize = function(){
		platform.asset = asset;
		platform.originX = x;
		platform.originY = y;
	}();

	platform.load = function(){
		platform.character = Character(platform.originX,platform.originY,platform.asset);
		platformArray[platformArray.length] = platform;
	}

	platform.unload = function(){
		platform.character.graphic.destroy();
	}

	platform.scroll = function(){
		if(scrollXOffset != 0){
			platform.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			platform.character.mY(scrollYOffset);
		}
	}
	
	platform.depth = function(){
		app.stage.setChildIndex(platform.character.graphic,childNum);
		childNum++;
	}

	return platform;
}