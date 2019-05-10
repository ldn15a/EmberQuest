var LoadingZone = function(x,y,isInteractable,area){
	var loadingZone = {};
	loadingZone.originX;
	loadingZone.originY;
	loadingZone.isInteractable;
	loadingZone.interactGraphicController
	loadingZone.width;
	loadingZone.area;

	loadingZone.initialize = function(){
		loadingZone.originX = x;
		loadingZone.originY = y;
		loadingZone.isInteractable = isInteractable;
		loadingZone.width = 32;
		loadingZone.area = area;
	}();

	loadingZone.update = function(){
		if(playerArray[0] != undefined && playerArray[0].character != undefined){
			//are we in range?
			//console.log(playerArray[0].character.getPositionX()+"|"+loadingZone.originX);
			if(playerArray[0].character.getPositionX() >= loadingZone.originX-loadingZone.width && playerArray[0].character.getPositionX() <= loadingZone.originX+loadingZone.width){
				//console.log("IN RANGE");
				if(loadingZone.isInteractable){
					if (keyboard.getKeyStatus("e") == "pressed") {
						//do the thing
						areaController.loadArea(area);
					}else{
						if(loadingZone.interactGraphicController == undefined){
                            loadingZone.interactGraphicController = InteractGraphicController(playerArray[0].character.graphic.x, playerArray[0].character.graphic.y - 60);
                        } else {
	                        //what if the npc moves?
                            loadingZone.interactGraphicController.updateLocation(playerArray[0].character.graphic.x, playerArray[0].character.graphic.y - 60);
                            loadingZone.interactGraphicController.update();
                        }
                    }
				}else{
					//do the thing
					areaController.loadArea(area);
				}
			}else{
	            //if the player goes out of range, destroy the interact graphic.
                loadingZone.destroyInteractGraphic();
            }
		}
	}

	loadingZone.destroyInteractGraphic = function(){
        if(loadingZone.interactGraphicController != undefined){
            loadingZone.interactGraphicController.destroy();
            loadingZone.interactGraphicController = null;
        }
    }

	loadingZone.scroll = function(){
		
	}

	loadingZone.depth = function(){
		
	}

	loadingZone.load = function(){
		controllerArray.push(loadingZone);
	}

	loadingZone.unload = function(){
		loadingZone.destroyInteractGraphic();
	}

	return loadingZone;
}