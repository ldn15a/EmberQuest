var InteractGraphic = function(x,y){
	var interactGraphic = {};
	interactGraphic.graphic;
	interactGraphic.spd;
	interactGraphic.yDir;
	interactGraphic.yOffset;
	interactGraphic.baseY;
	interactGraphic.t;
	interactGraphic.endTime;
	interactGraphic.startingY;

	interactGraphic.initialize = function(){

		interactGraphic.spd = 3;
		interactGraphic.yDir = -1;
		interactGraphic.endTime = 15;
		interactGraphic.t = 0;
		interactGraphic.yOffset = 0;

		interactGraphic.graphic = new PIXI.Graphics();
		interactGraphic.graphic.position.set(x,y);

		interactGraphic.baseY = interactGraphic.graphic.y;
		
		var width = 16;
		var height = 16;

		interactGraphic.graphic.beginFill(0xFFC0CB);

		interactGraphic.graphic.drawRect(-width/2,-height/2, width, height);
		interactGraphic.graphic.endFill();

		addChildToStage(interactGraphic.graphic);

	}();

	interactGraphic.update = function(){
		interactGraphic.t+=interactGraphic.yDir*interactGraphic.spd;
		interactGraphic.yOffset = interactGraphic.t;
		interactGraphic.graphic.y = interactGraphic.baseY + interactGraphic.yOffset;
		//console.clear();
		//console.log(interactGraphic.t);

		if(Math.abs(interactGraphic.t) > interactGraphic.endTime){
			interactGraphic.yDir *= -1;
		}
	}

	interactGraphic.scroll = function(){
		if(scrollXOffset != 0){
			interactGraphic.graphic.x+=scrollXOffset;
		}
		if(scrollYOffset != 0){
			interactGraphic.graphic.y+=scrollYOffset;
		}
	}

	interactGraphic.depth = function(){
		app.stage.setChildIndex(interactGraphic.graphic,childNum);
		childNum++;
	}

	interactGraphic.destroy = function(){
		interactGraphic.graphic.destroy();
	}

	return interactGraphic;
}