var ParallaxInstance = function(x,y,asset,scrollSpeed){
	var parallaxInstance = {};
	parallaxInstance.character;
	parallaxInstance.asset;
	parallaxInstance.originX;
	parallaxInstance.originY;
	parallaxInstance.scrollSpeed;

	parallaxInstance.initialize = function(){
		parallaxInstance.asset = asset;
		parallaxInstance.originX = x;
		parallaxInstance.originY = y;
		parallaxInstance.scrollSpeed = scrollSpeed;//0.4
	}();

	parallaxInstance.load = function(){
		parallaxInstance.character = Character(parallaxInstance.originX,parallaxInstance.originY,parallaxInstance.asset);
		backgroundArray.push(parallaxInstance);
	}

	parallaxInstance.unload = function(){
		parallaxInstance.character.unload();
	}

	parallaxInstance.scroll = function(){
		parallaxInstance.character.graphic.x = globalX * -parallaxInstance.scrollSpeed + parallaxInstance.originX;
	}
	
	parallaxInstance.depth = function(){
		app.stage.setChildIndex(parallaxInstance.character.graphic,childNum);
		childNum++;
	}

	return parallaxInstance;
}