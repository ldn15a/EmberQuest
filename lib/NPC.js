function NPC (x,y,asset,textFile) {
    var npc = {};
    npc.character;
    npc.asset;
    npc.originX;
    npc.originY;    
    npc.active;
    npc.currentTextObject;
    npc.textLoaded;
    npc.ready;
    npc.talkedTo;
    npc.test = 0;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    npc.query1;

    npc.lastMessage;
	npc.interactGraphicController;
	
    npc.update = function () {

    	if(npc.dialogueParser.ready){
	        if(npc.active == false && npc.character.hitTestRectangle(npc.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                npc.active = true;
	                npc.talkedTo = true;
	                playerArray[0].canControl = false;
	                npc.dialogueParser.end = false;

	                if(npc.tOA.length == 0){
	                    npc.tOA.push(TextObject(npc.lastMessage.string));
	                }
	            }

	            //show that the player can interact.
	            if(npc.interactGraphicController == undefined){
	                npc.interactGraphicController = InteractGraphicController(npc.character.graphic.x,npc.character.graphic.y-60);
	            }else{
	                //what if the npc moves?
	                npc.interactGraphicController.updateLocation(npc.character.graphic.x,npc.character.graphic.y-60);
	                npc.interactGraphicController.update();
	            }
	        }else{

	            //if the player goes out of range, destroy the interact graphic.
	            npc.destroyInteractGraphic();
	        }
	        
	        //is the npc being talked to?
	        if(npc.active){
	            //interact graphic - BEGONE!
	            npc.destroyInteractGraphic();
	            
	            //can we write new npc.text?
	            npc.advanceText();
	        }
        }
    }

    npc.advanceText = function(){
    	if(!textBox.isShowing){
    		console.log("NPC ACTION.");

            //we need to fill the textbox with stuff, but we have nothing yet!
            if(npc.currentTextObject == null){

                //pull from the other class
                if(!npc.dialogueParser.end){
                	npc.test++;
                	if(npc.test > 10){
                		console.log("STOP IT!");
                		return false;
                	}
                	npc.currentTextObject = npc.dialogueParser.prepareNextTextObject();
                }else{
                	npc.endConversation();
                }

            }else{
                if(keyboard.getKeyStatus("e") != "pressed"){
                    //We're gonna pop (shift) and get more diologue
                    npc.lastMessage = npc.currentTextObject;
                    npc.currentTextObject = null;
                    textBox.addText(npc.lastMessage);
                }
            }
        }
    }

    npc.destroyInteractGraphic = function(){
        if(npc.interactGraphicController != undefined){
            npc.interactGraphicController.destroy();
            npc.interactGraphicController = null;
        }
    }

    npc.endConversation = function (){
        npc.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    npc.showContent = function (){
        for(var i = 0; i < npc.tOA.length; i++){
            alert(npc.tOA[i].string);
            if(npc.tOA[i].hasOptions){
                for(var j = 0; j < npc.tOA[i].options.length; j++){
                    alert("option: " + npc.tOA[i].options[j]);
                }
            }
        }
    }

    npc.scroll = function(){
        if(scrollXOffset != 0){
            npc.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            npc.character.mY(scrollYOffset);
        }

        if(npc.interactGraphicController != undefined){
            npc.interactGraphicController.scroll();
        }
    }

    npc.depth = function(){
        app.stage.setChildIndex(npc.character.graphic,childNum);
        childNum++;
        if(npc.interactGraphicController != undefined){
            npc.interactGraphicController.depth();
        }
    }

    npc.load = function(){
        npc.character = Character(npc.originX,npc.originY,npc.asset);
        NPCArray.push(npc);
        npc.active = false;
    }

    npc.unload = function(){
        npc.destroyInteractGraphic();
        npc.character.graphic.destroy();
        for(var i = 0; i < NPCArray.length; i++){
            if(NPCArray[i] == npc){
                NPCArray.splice(i,1);
            }
        }
    }

    npc.initialize = function () {
        npc.active = false;
        npc.asset = asset;
        npc.originX = x;
        npc.originY = y;
        npc.ready = false;
        npc.textFile = textFile;
        npc.talkedTo = false;

        npc.dialogueParser = DialogueParser(npc.textFile,npc);
        npc.tOA = [];
        npc.lastMessage = "";
    }();

    return npc;
}