var DeathScreen = function(){
	var deathScreen = {};
	deathScreen.graphic;
	deathScreen.text;

	deathScreen.initialize = function(){
		deathScreen.t = 0;
		deathScreen.endTime = 120;
		deathScreen.graphic = new PIXI.Graphics();
		deathScreen.graphic.position.set(0, 0);
		
		var width = app.view.width +2;
		var height = app.view.height +2;

		deathScreen.graphic.beginFill(0xFF0F0F);

		deathScreen.graphic.drawRect(0,0, width, height);
		deathScreen.graphic.endFill();

		addChildToStage(deathScreen.graphic);

		deathScreen.text = new PIXI.Text('YOU DIED',{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff, align : 'center'});
		deathScreen.text.x = app.view.width/2;
		deathScreen.text.y = app.view.height/2;

		addChildToStage(deathScreen.text);

		NPCArray.push(deathScreen);
	}();

	deathScreen.update = function(){
		deathScreen.t++;
		if(deathScreen.t > deathScreen.endTime){
			areaController.loadArea("lastArea");
			//unload already happens
		}
	}

	deathScreen.depth = function(){
		app.stage.setChildIndex(deathScreen.graphic,childNum);
		childNum++;
		app.stage.setChildIndex(deathScreen.text,childNum);
		childNum++;
	}

	deathScreen.scroll = function(){

	}

	deathScreen.unload = function(){
		deathScreen.graphic.destroy();
		deathScreen.text.destroy();
	}

	return deathScreen;
}