function NPC (x,y,asset) {
    var npc = {};
    npc.character;
    npc.asset;
    npc.originX;
    npc.originY;    
    npc.active;
    npc.text;
    npc.textLoaded;
    npc.ready;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    npc.query1;

    npc.lastMessage;
	npc.interactGraphicController;
	
	npc.assignText = function () {
		npc.text = fileReader.read ("dialog/npcText.txt");
		npc.ready = true;

		//add textObjects to our array. Each of these is primed with a string argument supplied by our npc.text array.
		npc.tOA.push(TextObject(npc.text[0]));
		npc.tOA.push(TextObject(npc.text[1]));
	}

    npc.update = function () {

    	if(npc.ready){
	        if(npc.active == false && npc.character.hitTestRectangle(npc.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                npc.active = true;
	                playerArray[0].canControl = false;

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
	            if(!textBox.isShowing){

	                //we need to fill the textbox with stuff, but we have nothing yet!
	                if(npc.tOA.length == 0){

	                    //pull from the other class

	                }else{
	                    if(keyboard.getKeyStatus("e") != "pressed"){
	                        //We're gonna pop (shift) and get more diologue
	                        npc.lastMessage = npc.tOA.shift();
	                        textBox.addText(npc.lastMessage);
	                    }
	                }
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
        npcArray.push(npc);
        npc.active = false;
    }

    npc.unload = function(){
        npc.destroyInteractGraphic();
        npc.character.graphic.destroy();
        for(var i = 0; i < npcArray.length; i++){
            if(npcArray[i] == npc){
                npcArray.splice(i,1);
            }
        }
    }

    npc.initialize = function () {
        npc.active = false;
        npc.asset = asset;
        npc.originX = x;
        npc.originY = y;
        npc.ready = false;

        fileReader.requestFile ("dialog/npcText.txt", npc.assignText);
        npc.tOA = [];
        npc.lastMessage = "";
    }();

    return npc;
}