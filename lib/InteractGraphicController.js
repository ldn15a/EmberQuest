var InteractGraphicController = function(x,y){
	var interactGraphicController = {};
	interactGraphicController.interactGraphic;

	interactGraphicController.initialize = function(){
		interactGraphicController.interactGraphic = InteractGraphic(x,y);
	}();

	interactGraphicController.update = function(){
		interactGraphicController.interactGraphic.update();
	}

	interactGraphicController.updateLocation = function(x,y){
		interactGraphicController.interactGraphic.graphic.x = x;
		interactGraphicController.interactGraphic.baseY = y;
	}

	interactGraphicController.scroll = function(){
		interactGraphicController.interactGraphic.scroll();
	}

	interactGraphicController.depth = function(){
		app.stage.setChildIndex(interactGraphicController.interactGraphic.graphic,childNum);
		childNum++;
	}

	interactGraphicController.destroy = function(x,y){
		interactGraphicController.interactGraphic.graphic.destroy();
		interactGraphicController.interactGraphic = null;
	}

	return interactGraphicController;
}