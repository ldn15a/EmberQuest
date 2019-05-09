var WetnessGraphic = function(x,y){
	var wetnessGraphic = {};
	wetnessGraphic.foreGroundGraphic;
	wetnessGraphic.backGroundGraphic;
	wetnessGraphic.x;
	wetnessGraphic.y;

	wetnessGraphic.update = function(){
		//lol
	}

	wetnessGraphic.updateVisuals = function(wetness){
		if(wetness != 0 && wetnessGraphic.backGroundGraphic == undefined){
			wetnessGraphic.backGroundGraphic = new PIXI.Graphics();
			wetnessGraphic.backGroundGraphic.position.set(wetnessGraphic.x, wetnessGraphic.y);

			var width = 24;
			var height = 216;
			wetnessGraphic.backGroundGraphic.beginFill(0x202020);
			wetnessGraphic.backGroundGraphic.drawRect(-4, 8, width+8, -height);
			wetnessGraphic.backGroundGraphic.endFill();

			addChildToStage(wetnessGraphic.backGroundGraphic);
		}else if(wetness == 0 && wetnessGraphic.backGroundGraphic != undefined){
			wetnessGraphic.backGroundGraphic.destroy();
			wetnessGraphic.backGroundGraphic = undefined;
		}

		if(wetnessGraphic.foreGroundGraphic != undefined){
			wetnessGraphic.foreGroundGraphic.destroy();
		}
		wetnessGraphic.foreGroundGraphic = new PIXI.Graphics();
		wetnessGraphic.foreGroundGraphic.position.set(wetnessGraphic.x, wetnessGraphic.y);

		var width = 24;
		var height = wetness*2;
		wetnessGraphic.foreGroundGraphic.beginFill(0x003AFF);
		wetnessGraphic.foreGroundGraphic.drawRect(0, 0, width, -height);
		wetnessGraphic.foreGroundGraphic.endFill();

		addChildToStage(wetnessGraphic.foreGroundGraphic);
	}

	wetnessGraphic.depth = function(){
		if(wetnessGraphic.backGroundGraphic != undefined){
			app.stage.setChildIndex(wetnessGraphic.backGroundGraphic,childNum);
			childNum++;
		}
		app.stage.setChildIndex(wetnessGraphic.foreGroundGraphic,childNum);
		childNum++;
	}

	wetnessGraphic.unload = function(){
		wetnessGraphic.foreGroundGraphic.destroy();
		if(wetnessGraphic.backGroundGraphic != undefined){
			wetnessGraphic.backGroundGraphic.destroy();
		}
	}

	wetnessGraphic.initialize = function(){

		wetnessGraphic.x = x;
		wetnessGraphic.y = y;
		wetnessGraphic.updateVisuals(0);
	}();

	return wetnessGraphic;
}