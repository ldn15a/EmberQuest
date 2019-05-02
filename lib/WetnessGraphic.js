var WetnessGraphic = function(x,y){
	var wetnessGraphic = {};
	wetnessGraphic.graphic;
	wetnessGraphic.x;
	wetnessGraphic.y;

	wetnessGraphic.initialize = function(){

		wetnessGraphic.x = x;
		wetnessGraphic.y = y;
		wetnessGraphic.updateVisuals(0);
	}();

	wetnessGraphic.update = function(){
		//lol
	}

	wetnessGraphic.updateVisuals = function(wetness){
		wetnessGraphic.graphic = new PIXI.Graphics();
		wetnessGraphic.graphic.position.set(x,y);

		var width = 16;
		var height = 1*wetness;

		wetnessGraphic.graphic.beginFill(0x0000AA);

		wetnessGraphic.graphic.drawRect(wetnessGraphic.x-width/2, wetnessGraphic.y, wetnessGraphic.x+width/2, wetnessGraphic.y-height);
		wetnessGraphic.graphic.endFill();

		addChildToStage(wetnessGraphic.graphic);
	}

	wetnessGraphic.scroll = function(){
		if(scrollXOffset != 0){
			wetnessGraphic.graphic.x+=scrollXOffset;
		}
		if(scrollYOffset != 0){
			wetnessGraphic.graphic.y+=scrollYOffset;
		}
	}

	wetnessGraphic.depth = function(){
		app.stage.setChildIndex(wetnessGraphic.graphic,childNum);
		childNum++;
	}

	wetnessGraphic.unload = function(){
		wetnessGraphic.graphic.destroy();
	}

	return wetnessGraphic;
}