function Naia2 (x,y,asset) {
    var naia2 = {};
    naia2.character;
    naia2.asset;
    naia2.originX;
    naia2.originY;    
    naia2.active;
    naia2.text;
    naia2.textLoaded;
    naia2.ready;
    naia2.particleController;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    naia2.query1;

    naia2.lastOption;
    naia2.option;
    naia2.optionOverride;
    naia2.lastMessage;
	naia2.interactGraphicController;
	
	naia2.assignText = function () {
		naia2.text = fileReader.read ("dialog/naia2.txt");
		naia2.ready = true;

		naia2.optionOverride = true;
		naia2.option = 1;
	}

    naia2.update = function () {

    	if(naia2.ready){
	        if(naia2.active == false && naia2.character.hitTestRectangle(naia2.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                naia2.active = true;
	                playerArray[0].canControl = false;
	            }

	            //show that the player can interact.
	            if(naia2.interactGraphicController == undefined){
	                naia2.interactGraphicController = InteractGraphicController(naia2.character.graphic.x,naia2.character.graphic.y-60);
	            }else{
	                //what if the npc moves?
	                naia2.interactGraphicController.updateLocation(naia2.character.graphic.x,naia2.character.graphic.y-60);
	                naia2.interactGraphicController.update();
	            }
	        }else{

	            //if the player goes out of range, destroy the interact graphic.
	            naia2.destroyInteractGraphic();
	        }
	        
	        //is the NPC being talked to?
	        if(naia2.active){
	            //interact graphic - BEGONE!
	            naia2.destroyInteractGraphic();
	            
	            //can we write new naia2.text?
	            if(!textBox.isShowing){

	                //we need to fill the textbox with stuff, but we have nothing yet!
	                if(naia2.tOA.length == 0){
	                	if(naia2.optionOverride){
	                		naia2.optionOverride = false;
	                	}else{
	                		naia2.option = textBox.selectedOption;
	                	}

	                	if(naiaBase.toldTruth){

		                	if(naia2.option == 1){
		                		var needsOptions = TextObject(naia2.text[0]);
								needsOptions.addOption(naia2.text[1],2);
								needsOptions.addOption(naia2.text[2],3);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 2){
		                		var needsOptions = TextObject(naia2.text[3]);
								needsOptions.addOption(naia2.text[4],0);
								needsOptions.addOption(naia2.text[5],4);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 3){
		                		var needsOptions = TextObject(naia2.text[6]);
								needsOptions.addOption(naia2.text[7],0);
								needsOptions.addOption(naia2.text[8],4);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 4){
								naia2.tOA.push(TextObject(naia2.text[9]));
		                	}else{
		                        //Nothing special is happening, so E N D...
		                        naia2.endConversation();
		                    }
	                	}else if(naiaBase.enteredVillage && naiaBase.expectedCaravan){
	                		if(naia2.option == 1){
		                		var needsOptions = TextObject(naia2.text[11]);
		                		if(karma >= 0){
									needsOptions.addOption(naia2.text[12],2);
								}else{
									needsOptions.addOption(naia2.text[12],3);
								}
								needsOptions.addOption(naia2.text[23],0);
								needsOptions.addOption(naia2.text[23],4);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 2){
		                		var needsOptions = TextObject(naia2.text[15]);
								needsOptions.addOption(naia2.text[16],7);
								needsOptions.addOption(naia2.text[17],8);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 3){
								naia2.tOA.push(TextObject(naia2.text[18]));
		                	}else if(naia2.option == 4){
		                		var needsOptions = TextObject(naia2.text[19]);
								needsOptions.addOption(naia2.text[20],5);
								needsOptions.addOption(naia2.text[21],6);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 5){
								naia2.tOA.push(TextObject(naia2.text[22]));
		                	}else if(naia2.option == 6){
		                		naiaBase.naiaPartnered = true;
								naia2.tOA.push(TextObject(naia2.text[23]));
		                	}else if(naia2.option == 7){
		                		var needsOptions = TextObject(naia2.text[24]);
								needsOptions.addOption(naia2.text[25],11);
								needsOptions.addOption(naia2.text[26],10);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 8){
		                		var needsOptions = TextObject(naia2.text[27]);
								needsOptions.addOption(naia2.text[28],9);
								needsOptions.addOption(naia2.text[29],11);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 9){
		                		naiaBase.naiaPartnered = false;
								naia2.tOA.push(TextObject(naia2.text[30]));
		                	}else if(naia2.option == 10){
		                		naiaBase.naiaPartnered = false;
								naia2.tOA.push(TextObject(naia2.text[31]));
		                	}else if(naia2.option == 11){
		                		naiaBase.naiaPartnered = true;
		                		naia2.endConversation();
		                	}else{
		                		naia2.endConversation();
		                	}
	                	}else if(naiaBase.enteredVillage){
	                		if(naia2.option == 1){
		                		var needsOptions = TextObject(naia2.text[33]);
								needsOptions.addOption(naia2.text[34],2);
								needsOptions.addOption(naia2.text[35],3);
								needsOptions.addOption(naia2.text[36],4);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 2){
		                		var needsOptions = TextObject(naia2.text[37]);
								needsOptions.addOption(naia2.text[34],8);
								needsOptions.addOption(naia2.text[35],5);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 3){
		                		var needsOptions = TextObject(naia2.text[40]);
								needsOptions.addOption(naia2.text[41],8);
								needsOptions.addOption(naia2.text[42],6);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 4){
		                		var needsOptions = TextObject(naia2.text[43]);
								needsOptions.addOption(naia2.text[44],8);
								needsOptions.addOption(naia2.text[45],7);
								naia2.tOA.push(needsOptions);
		                	}else if(naia2.option == 5){
		                		naiaBase.naiaPartnered = false;
								naia2.tOA.push(TextObject(naia2.text[46]));
		                	}else if(naia2.option == 6){
		                		naiaBase.naiaPartnered = false;
								naia2.tOA.push(TextObject(naia2.text[47]));
		                	}else if(naia2.option == 7){
		                		naiaBase.naiaPartnered = false;
								naia2.tOA.push(TextObject(naia2.text[48]));
		                	}else if(naia2.option == 8){
		                		naiaBase.naiaPartnered = true;
								naia2.endConversation();
		                	}else{
		                		naia2.endConversation();
		                	}
	                	}else{
	                		if(naia2.option == 1){
		                		var needsOptions = TextObject(naia2.text[50]);
								needsOptions.addOption(naia2.text[51],2);
								needsOptions.addOption(naia2.text[52],3);
								needsOptions.addOption(naia2.text[53],4);
								needsOptions.addOption(naia2.text[54],5);
								naia2.tOA.push(needsOptions);
		                	}else{
		                		naia2.endConversation();
		                	}
	                	}
	                }else{
	                    if(keyboard.getKeyStatus("e") != "pressed"){
	                        //We're gonna pop (shift) and get more diologue
	                        naia2.lastMessage = naia2.tOA.shift();
	                        textBox.addText(naia2.lastMessage);
	                    }
	                }
	            }
	        }
        }
        naia2.particleController.update();
    }

    naia2.destroyInteractGraphic = function(){
        if(naia2.interactGraphicController != undefined){
            naia2.interactGraphicController.destroy();
            naia2.interactGraphicController = null;
        }
    }

    naia2.endConversation = function (){
        naia2.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    naia2.showContent = function (){
        for(var i = 0; i < naia2.tOA.length; i++){
            alert(naia2.tOA[i].string);
            if(naia2.tOA[i].hasOptions){
                for(var j = 0; j < naia2.tOA[i].options.length; j++){
                    alert("option: " + naia2.tOA[i].options[j]);
                }
            }
        }
    }

    naia2.scroll = function(){
        if(scrollXOffset != 0){
            naia2.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            naia2.character.mY(scrollYOffset);
        }

        naia2.particleController.scroll();

        if(naia2.interactGraphicController != undefined){
            naia2.interactGraphicController.scroll();
        }
    }

    naia2.depth = function(){
    	naia2.particleController.depth();

        app.stage.setChildIndex(naia2.character.graphic,childNum);
        childNum++;
        if(naia2.interactGraphicController != undefined){
            naia2.interactGraphicController.depth();
        }
    }

    naia2.load = function(){
        naia2.character = Character(naia2.originX,naia2.originY,naia2.asset);
        NPCArray.push(naia2);
        naia2.particleController = ParticleController(naia2.character.graphic.x,naia2.character.graphic.y,naia2);
        naia2.active = false;
    }

    naia2.unload = function(){
        naia2.destroyInteractGraphic();
        naia2.particleController.unload();
        naia2.particleController = null;
        naia2.character.graphic.destroy();
        for(var i = 0; i < NPCArray.length; i++){
            if(NPCArray[i] == naia2){
                NPCArray.splice(i,1);
            }
        }
    }

    naia2.initialize = function () {
        naia2.active = false;
        naia2.asset = asset;
        naia2.originX = x;
        naia2.originY = y;
        naia2.ready = false;
        naia2.option = 0;
        naia2.optionOverride = false;

        naia2.toldTruth = false;
		naia2.marshDangerKnown = false;
		naia2.villageKnowledge = 0;
		naia2.enteredVillage = false;
		naia2.expectedCaravan = false;

        fileReader.requestFile ("dialog/naia2.txt", naia2.assignText);
        naia2.tOA = [];
        naia2.lastMessage = "";
    }();

    return naia2;
}