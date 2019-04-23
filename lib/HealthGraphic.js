var HealthGraphic = function(x,y,mode){
	var healthGraphic = {};
	healthGraphic.graphic;
	healthGraphic.mode;
	healthGraphic.maxHeight;
	healthGraphic.t;
	healthGraphic.endTime;
	healthGraphic.startingY;

	healthGraphic.initialize = function(){

		healthGraphic.mode = mode;

		healthGraphic.graphic = new PIXI.Graphics();
		healthGraphic.graphic.position.set(x,y);

		var width = 16;
		var height = 16;

		if(mode == 1){
			width = 40;
			height = 40;
		}

		healthGraphic.maxHeight = height;

		healthGraphic.graphic.beginFill(0xFFC0CB);

		healthGraphic.graphic.drawRect(-width,-height, width, height);
		healthGraphic.graphic.endFill();
		
		if(healthGraphic.mode == 2){
			healthGraphic.t = 0;
			healthGraphic.endTime = 60;
			healthGraphic.graphic.y -= healthGraphic.maxHeight;
			healthGraphic.startingY = healthGraphic.graphic.y;
			healthGraphic.graphic.height = 0;
		}

		addChildToStage(healthGraphic.graphic);

	}();

	healthGraphic.update = function(){
		if(healthGraphic.mode == 2){
			healthGraphic.t++;

			healthGraphic.graphic.height = healthGraphic.t/healthGraphic.endTime*healthGraphic.maxHeight;
			healthGraphic.graphic.y = healthGraphic.startingY + healthGraphic.graphic.height;

			if(healthGraphic.t > healthGraphic.endTime){
				playerArray[0].loseSingleHealthRegen();
				playerArray[0].changeHealth(1);
			}
		}
	}

	healthGraphic.depth = function(){
		app.stage.setChildIndex(healthGraphic.graphic,childNum);
		childNum++;
	}

	healthGraphic.destroy = function(){
		app.stage.removeChild(healthGraphic.graphic);
		healthGraphic.graphic.destroy();
	}

	return healthGraphic;
}