var HealthGraphic = function(x,y,mode){
	var healthGraphic = {};
	healthGraphic.graphic;
	healthGraphic.mode;

	healthGraphic.initialize = function(){

		healthGraphic.mode = mode;

		healthGraphic.graphic = new PIXI.Graphics();
		healthGraphic.graphic.position.set(x,y);
		healthGraphic.graphic.beginFill(0xFFC0CB);
		
		var width = 16;
		var height = 16;

		if(mode == 1){
			width = 40;
			height = 40;
		}

		healthGraphic.graphic.drawRect(-width,-height, width, height);
		healthGraphic.graphic.endFill();
		addChildToStage(healthGraphic.graphic);

	}();

	healthGraphic.update = function(){
		//as of now, nothing cool
	}

	healthGraphic.depth = function(){
		app.stage.setChildIndex(healthGraphic.graphic,childNum);
		childNum++;
	}

	healthGraphic.destroy = function(){
		healthGraphic.graphic.destroy();
	}

	return healthGraphic;
}