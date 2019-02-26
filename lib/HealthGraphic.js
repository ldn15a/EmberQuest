var HealthGraphic = function(x,y,mode){
	var healthGraphic = {};
	healthGraphic.graphic;
	healthGraphic.mode;

	healthGraphic.initialize = function(){

		healthGraphic.mode = mode;

		healthGraphic.graphic = new PIXI.Graphics();
		healthGraphic.graphic.position.set(x,y);
		healthGraphic.graphic.beginFill(0xFFC0CB);
		//healthGraphic.graphic.tint = (randomInt(0,255) << 16) + (randomInt(0,255) << 8) + randomInt(0,255);

		var width = 5;
		var height = 2;

		if(mode == 1){
			width = 7;
			height = 7;
		}

		healthGraphic.graphic.drawRect(-width,-height, width, height);
		healthGraphic.graphic.endFill();
		app.stage.addChild(healthGraphic.graphic);
	}

	healthGraphic.update = function(){
		//as of now, nothing cool
	}

	healthGraphic.render = function(){
		app.stage.setChildIndex(healthGraphic.graphic,childNum);
		childNum++;
	}

	healthGraphic.destroy = function(){
		healthGraphic.graphic.destroy();
	}

	return healthGraphic;
}