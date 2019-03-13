function MerchantCompanyAgent1 (x,y,asset) {
    var merchantCompanyAgent1 = {};
    merchantCompanyAgent1.character;
    merchantCompanyAgent1.asset;
    merchantCompanyAgent1.originX;
    merchantCompanyAgent1.originY;    
    merchantCompanyAgent1.active;
    merchantCompanyAgent1.text;
    merchantCompanyAgent1.textLoaded;
    merchantCompanyAgent1.ready;
    merchantCompanyAgent1.particleController;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    merchantCompanyAgent1.query1;

    merchantCompanyAgent1.lastOption;
    merchantCompanyAgent1.option;
    merchantCompanyAgent1.optionOverride;
    merchantCompanyAgent1.lastMessage;
	merchantCompanyAgent1.interactGraphicController;
	
	merchantCompanyAgent1.assignText = function () {
		merchantCompanyAgent1.text = fileReader.read ("dialog/merchantCompanyAgent1.txt");
		merchantCompanyAgent1.ready = true;

		merchantCompanyAgent1.optionOverride = true;
		merchantCompanyAgent1.option = 1;
	}

    merchantCompanyAgent1.update = function () {

    	if(merchantCompanyAgent1.ready){
	        if(merchantCompanyAgent1.active == false && merchantCompanyAgent1.character.hitTestRectangle(merchantCompanyAgent1.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                merchantCompanyAgent1.active = true;
	                playerArray[0].canControl = false;
	            }

	            //show that the player can interact.
	            if(merchantCompanyAgent1.interactGraphicController == undefined){
	                merchantCompanyAgent1.interactGraphicController = InteractGraphicController(merchantCompanyAgent1.character.graphic.x,merchantCompanyAgent1.character.graphic.y-60);
	            }else{
	                //what if the npc moves?
	                merchantCompanyAgent1.interactGraphicController.updateLocation(merchantCompanyAgent1.character.graphic.x,merchantCompanyAgent1.character.graphic.y-60);
	                merchantCompanyAgent1.interactGraphicController.update();
	            }
	        }else{

	            //if the player goes out of range, destroy the interact graphic.
	            merchantCompanyAgent1.destroyInteractGraphic();
	        }
	        
	        //is the NPC being talked to?
	        if(merchantCompanyAgent1.active){
	            //interact graphic - BEGONE!
	            merchantCompanyAgent1.destroyInteractGraphic();
	            
	            //can we write new merchantCompanyAgent1.text?
	            if(!textBox.isShowing){

	                //we need to fill the textbox with stuff, but we have nothing yet!
	                if(merchantCompanyAgent1.tOA.length == 0){
	                	if(merchantCompanyAgent1.optionOverride){
	                		merchantCompanyAgent1.optionOverride = false;
	                	}else{
	                		merchantCompanyAgent1.option = textBox.selectedOption;
	                	}

	                	if(merchantCompanyAgent1.option == 1){
	                		var needsOptions = TextObject(merchantCompanyAgent1.text[0]);
							needsOptions.addOption(merchantCompanyAgent1.text[1],2);
							needsOptions.addOption(merchantCompanyAgent1.text[2],3);
							merchantCompanyAgent1.tOA.push(needsOptions);
	                	}else if(merchantCompanyAgent1.option == 2){
	                		playerArray[0].changeHealth(4);
	                		var needsOptions = TextObject(merchantCompanyAgent1.text[3]);
							needsOptions.addOption(merchantCompanyAgent1.text[4],3);
							needsOptions.addOption(merchantCompanyAgent1.text[5],3);
							merchantCompanyAgent1.tOA.push(needsOptions);
	                	}
	                }else{
	                    if(keyboard.getKeyStatus("e") != "pressed"){
	                        //We're gonna pop (shift) and get more diologue
	                        merchantCompanyAgent1.lastMessage = merchantCompanyAgent1.tOA.shift();
	                        textBox.addText(merchantCompanyAgent1.lastMessage);
	                    }
	                }
	            }
	        }
        }
        merchantCompanyAgent1.particleController.update();
    }

    merchantCompanyAgent1.destroyInteractGraphic = function(){
        if(merchantCompanyAgent1.interactGraphicController != undefined){
            merchantCompanyAgent1.interactGraphicController.destroy();
            merchantCompanyAgent1.interactGraphicController = null;
        }
    }

    merchantCompanyAgent1.endConversation = function (){
        merchantCompanyAgent1.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    merchantCompanyAgent1.showContent = function (){
        for(var i = 0; i < merchantCompanyAgent1.tOA.length; i++){
            alert(merchantCompanyAgent1.tOA[i].string);
            if(merchantCompanyAgent1.tOA[i].hasOptions){
                for(var j = 0; j < merchantCompanyAgent1.tOA[i].options.length; j++){
                    alert("option: " + merchantCompanyAgent1.tOA[i].options[j]);
                }
            }
        }
    }

    merchantCompanyAgent1.scroll = function(){
        if(scrollXOffset != 0){
            merchantCompanyAgent1.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            merchantCompanyAgent1.character.mY(scrollYOffset);
        }

        merchantCompanyAgent1.particleController.scroll();

        if(merchantCompanyAgent1.interactGraphicController != undefined){
            merchantCompanyAgent1.interactGraphicController.scroll();
        }
    }

    merchantCompanyAgent1.depth = function(){
    	merchantCompanyAgent1.particleController.depth();

        app.stage.setChildIndex(merchantCompanyAgent1.character.graphic,childNum);
        childNum++;
        if(merchantCompanyAgent1.interactGraphicController != undefined){
            merchantCompanyAgent1.interactGraphicController.depth();
        }
    }

    merchantCompanyAgent1.load = function(){
        merchantCompanyAgent1.character = Character(merchantCompanyAgent1.originX,merchantCompanyAgent1.originY,merchantCompanyAgent1.asset);
        NPCArray.push(merchantCompanyAgent1);
        merchantCompanyAgent1.particleController = ParticleController(merchantCompanyAgent1.character.graphic.x,merchantCompanyAgent1.character.graphic.y,merchantCompanyAgent1);
        merchantCompanyAgent1.active = false;
    }

    merchantCompanyAgent1.unload = function(){
        merchantCompanyAgent1.destroyInteractGraphic();
        merchantCompanyAgent1.particleController.unload();
        merchantCompanyAgent1.particleController = null;
        merchantCompanyAgent1.character.graphic.destroy();
        for(var i = 0; i < NPCArray.length; i++){
            if(NPCArray[i] == merchantCompanyAgent1){
                NPCArray.splice(i,1);
            }
        }
    }

    merchantCompanyAgent1.initialize = function () {
        merchantCompanyAgent1.active = false;
        merchantCompanyAgent1.asset = asset;
        merchantCompanyAgent1.originX = x;
        merchantCompanyAgent1.originY = y;
        merchantCompanyAgent1.ready = false;
        merchantCompanyAgent1.option = 0;
        merchantCompanyAgent1.optionOverride = false;

        merchantCompanyAgent1.toldTruth = false;
		merchantCompanyAgent1.marshDangerKnown = false;
		merchantCompanyAgent1.villageKnowledge = 0;
		merchantCompanyAgent1.enteredVillage = false;
		merchantCompanyAgent1.expectedCaravan = false;

        fileReader.requestFile ("dialog/merchantCompanyAgent1.txt", merchantCompanyAgent1.assignText);
        merchantCompanyAgent1.tOA = [];
        merchantCompanyAgent1.lastMessage = "";
    }();

    return merchantCompanyAgent1;
}