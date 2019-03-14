function Naia1 (x,y,asset) {
    var naia1 = {};
    naia1.character;
    naia1.asset;
    naia1.originX;
    naia1.originY;    
    naia1.active;
    naia1.text;
    naia1.textLoaded;
    naia1.ready;
    naia1.particleController;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    naia1.query1;

    naia1.lastOption;
    naia1.option;
    naia1.optionOverride;
    naia1.lastMessage;
	naia1.interactGraphicController;
	
	naia1.assignText = function () {
		naia1.text = fileReader.read ("dialog/Naia1.txt");
		naia1.ready = true;

		naia1.optionOverride = true;
		naia1.option = 1;
	}

    naia1.update = function () {

    	if(naia1.ready){
	        if(naia1.active == false && naia1.character.hitTestRectangle(naia1.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                naia1.active = true;
	                playerArray[0].canControl = false;
	            }

	            //show that the player can interact.
	            if(naia1.interactGraphicController == undefined){
	                naia1.interactGraphicController = InteractGraphicController(naia1.character.graphic.x,naia1.character.graphic.y-60);
	            }else{
	                //what if the npc moves?
	                naia1.interactGraphicController.updateLocation(naia1.character.graphic.x,naia1.character.graphic.y-60);
	                naia1.interactGraphicController.update();
	            }
	        }else{

	            //if the player goes out of range, destroy the interact graphic.
	            naia1.destroyInteractGraphic();
	        }
	        
	        //is the NPC being talked to?
	        if(naia1.active){
	            //interact graphic - BEGONE!
	            naia1.destroyInteractGraphic();

	            overrideCamera = true;
	            cameraTarget = naia1;
	            
	            //can we write new naia1.text?
	            if(!textBox.isShowing){

	                //we need to fill the textbox with stuff, but we have nothing yet!
	                if(naia1.tOA.length == 0){
	                	if(naia1.optionOverride){
	                		naia1.optionOverride = false;
	                	}else{
	                		naia1.option = textBox.selectedOption;
	                	}

	                	if(naia1.option == 1){
	                		var needsOptions = TextObject(naia1.text[0]);
							needsOptions.addOption(naia1.text[1],2);
							needsOptions.addOption(naia1.text[2],3);
							needsOptions.addOption(naia1.text[3],4);
							needsOptions.addOption(naia1.text[4],5);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 2){
	                		var needsOptions = TextObject(naia1.text[5]);
							needsOptions.addOption(naia1.text[6],6);
							needsOptions.addOption(naia1.text[7],7);
							needsOptions.addOption(naia1.text[8],9);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 3){
	                		var needsOptions = TextObject(naia1.text[9]);
							needsOptions.addOption(naia1.text[10],10);
							needsOptions.addOption(naia1.text[11],11);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 4){
	                		var needsOptions = TextObject(naia1.text[12]);
							needsOptions.addOption(naia1.text[13],2);
							needsOptions.addOption(naia1.text[14],3);
							needsOptions.addOption(naia1.text[15],12);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 5){
	                		var needsOptions = TextObject(naia1.text[16]);
							needsOptions.addOption(naia1.text[17],2);
							needsOptions.addOption(naia1.text[18],4);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 6){
	                		naiaBase.marshDangerKnown = true;
	                		var needsOptions = TextObject(naia1.text[19]);
	                		if(naiaBase.villageKnowledge == 0){
								needsOptions.addOption(naia1.text[20],7);
							}else if(naiaBase.villageKnowledge == 1){
								needsOptions.addOption(naia1.text[21],8);
							}
							needsOptions.addOption(naia1.text[22],9);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 7){
	                		naiaBase.villageKnowledge = 1;
	                		var needsOptions = TextObject(naia1.text[23]);
	                		if(!naiaBase.marshDangerKnown){
								needsOptions.addOption(naia1.text[24],6);
							}else{
								needsOptions.addOption(naia1.text[25],8);
							}
							needsOptions.addOption(naia1.text[26],9);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 8){
	                		naiaBase.villageKnowledge = 2;
	                		var needsOptions = TextObject(naia1.text[27]);
	                		if(!naiaBase.marshDangerKnown){
								needsOptions.addOption(naia1.text[28],6);
							}
							needsOptions.addOption(naia1.text[29],9);
							naia1.tOA.push(needsOptions);
	                	}else if(naia1.option == 9){
	                		//conversation ends due to no options or special events
							naia1.tOA.push(TextObject(naia1.text[30]));
	                	}else if(naia1.option == 10){
	                		naiaBase.enteredVillage = true;
	                		naiaBase.expectedCaravan = true;
	                		//conversation ends due to no options or special events
							naia1.tOA.push(TextObject(naia1.text[31]));
	                	}else if(naia1.option == 11){
	                		naiaBase.enteredVillage = true;
	                		//conversation ends due to no options or special events
							naia1.tOA.push(TextObject(naia1.text[32]));
	                	}else if(naia1.option == 12){
	                		//conversation ends due to no options or special events
							naia1.tOA.push(TextObject(naia1.text[33]));
	                	}else{
	                        //Nothing special is happening, so E N D...
	                        naia1.endConversation();
	                    }
	                }else{
	                    if(keyboard.getKeyStatus("e") != "pressed"){
	                        //We're gonna pop (shift) and get more diologue
	                        naia1.lastMessage = naia1.tOA.shift();
	                        textBox.addText(naia1.lastMessage);
	                    }
	                }
	            }
	        }
        }
        naia1.particleController.update();
    }

    naia1.destroyInteractGraphic = function(){
        if(naia1.interactGraphicController != undefined){
            naia1.interactGraphicController.destroy();
            naia1.interactGraphicController = null;
        }
    }

    naia1.endConversation = function (){
        naia1.active = false;
        playerArray[0].canControl = true;
        overrideCamera = false;
    }

    //purely for debug
    naia1.showContent = function (){
        for(var i = 0; i < naia1.tOA.length; i++){
            alert(naia1.tOA[i].string);
            if(naia1.tOA[i].hasOptions){
                for(var j = 0; j < naia1.tOA[i].options.length; j++){
                    alert("option: " + naia1.tOA[i].options[j]);
                }
            }
        }
    }

    naia1.scroll = function(){
        if(scrollXOffset != 0){
            naia1.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            naia1.character.mY(scrollYOffset);
        }

        naia1.particleController.scroll();

        if(naia1.interactGraphicController != undefined){
            naia1.interactGraphicController.scroll();
        }
    }

    naia1.depth = function(){
    	naia1.particleController.depth();

        app.stage.setChildIndex(naia1.character.graphic,childNum);
        childNum++;
        if(naia1.interactGraphicController != undefined){
            naia1.interactGraphicController.depth();
        }
    }

    naia1.load = function(){
        naia1.character = Character(naia1.originX,naia1.originY,naia1.asset);
        NPCArray.push(naia1);
        naia1.particleController = ParticleController(naia1.character.graphic.x,naia1.character.graphic.y,naia1);
        naia1.active = false;
    }

    naia1.unload = function(){
        naia1.destroyInteractGraphic();
        naia1.particleController.unload();
        naia1.particleController = null;
        naia1.character.graphic.destroy();
        for(var i = 0; i < NPCArray.length; i++){
            if(NPCArray[i] == naia1){
                NPCArray.splice(i,1);
            }
        }
    }

    naia1.initialize = function () {
        naia1.active = false;
        naia1.asset = asset;
        naia1.originX = x;
        naia1.originY = y;
        naia1.ready = false;
        naia1.option = 0;
        naia1.optionOverride = false;

        naia1.toldTruth = false;
		naia1.marshDangerKnown = false;
		naia1.villageKnowledge = 0;
		naia1.enteredVillage = false;
		naia1.expectedCaravan = false;

        fileReader.requestFile ("dialog/Naia1.txt", naia1.assignText);
        naia1.tOA = [];
        naia1.lastMessage = "";
    }();

    return naia1;
}