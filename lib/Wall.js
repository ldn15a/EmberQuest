var Wall = function(x,y,asset){
	var wall = {};
	wall.character;

	wall.initialize = function(){
		wall.character = Character(x,y,asset);
		wallArray[wallArray.length] = wall;
	}();

	wall.render = function(){
		if(scrollXOffset != 0){
			wall.character.mX(scrollXOffset);
		}
		if(scrollYOffset != 0){
			wall.character.mY(scrollYOffset);
		}
		app.stage.setChildIndex(wall.character.graphic,childNum);
		childNum++;
	}

	return wall;
}