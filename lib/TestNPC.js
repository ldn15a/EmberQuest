function TestNPC (x,y,asset) {
    var testNPC = {};
    testNPC.character;
    testNPC.asset;
    testNPC.originX;
    testNPC.originY;    
    testNPC.active;
    testNPC.text;
    testNPC.textLoaded;
    testNPC.ready;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    testNPC.query1;

    testNPC.lastMessage;
	testNPC.interactGraphicController;
	
	testNPC.assignText = function () {
		testNPC.text = fileReader.read ("dialog/NPCText.txt");
		testNPC.ready = true;

		//add textObjects to our array. Each of these is primed with a string argument supplied by our testNPC.text array.
		testNPC.tOA.push(TextObject(testNPC.text[0]));
		testNPC.tOA.push(TextObject(testNPC.text[1]));
	}

    testNPC.update = function () {

    	if(testNPC.ready){
	        if(testNPC.active == false && testNPC.character.hitTestRectangle(testNPC.character, playerArray[0].character)){
	            if(keyboard.getKeyStatus("e") == "pressed"){
	                testNPC.active = true;
	                playerArray[0].canControl = false;

	                if(testNPC.tOA.length == 0){
	                    testNPC.tOA.push(TextObject(testNPC.lastMessage.string));
	                }
	            }

	            //show that the player can interact.
	            if(testNPC.interactGraphicController == undefined){
	                testNPC.interactGraphicController = InteractGraphicController(testNPC.character.graphic.x,testNPC.character.graphic.y-60);
	            }else{
	                //what if the npc moves?
	                testNPC.interactGraphicController.updateLocation(testNPC.character.graphic.x,testNPC.character.graphic.y-60);
	                testNPC.interactGraphicController.update();
	            }
	        }else{

	            //if the player goes out of range, destroy the interact graphic.
	            testNPC.destroyInteractGraphic();
	        }
	        
	        //is the NPC being talked to?
	        if(testNPC.active){
	            //interact graphic - BEGONE!
	            testNPC.destroyInteractGraphic();
	            
	            //can we write new testNPC.text?
	            if(!textBox.isShowing){

	                //we need to fill the textbox with stuff, but we have nothing yet!
	                if(testNPC.tOA.length == 0){

	                    //special occurrances.
	                    if(testNPC.lastMessage.string == testNPC.text[31]){
	                        //omae wa mou shindeiru
	                        playerArray[0].health-=999;
	                        playerArray[0].updateHealthGraphics();
	                        testNPC.tOA.push(TextObject(testNPC.text[32]));
	                        //leaves the conversation due to lack of content.
	                    }else if(textBox.selectedOption == testNPC.text[3]){

	                        //the player answered with "No, I'm on a quest to find the Ember.", so this is what happens.
	                        testNPC.tOA.push(TextObject(testNPC.text[8]));

	                        var needsOptions = TextObject(testNPC.text[9]);
	                        needsOptions.addOption(testNPC.text[10]);
	                        needsOptions.addOption(testNPC.text[11]);

	                        testNPC.tOA.push(needsOptions);
	                    }else if(textBox.selectedOption == testNPC.text[10]){

	                        //leave the conversation due to running out of testNPC.text.
	                        testNPC.tOA.push(TextObject(testNPC.text[12]));
	                        testNPC.tOA.push(TextObject(testNPC.text[13]));
	                    }else if(textBox.selectedOption == testNPC.text[11]){

	                        //leave the conversation.
	                        testNPC.endConversation();
	                    }else if(textBox.selectedOption == testNPC.text[4]){

	                        //similar to how the conversation started. It boots you back to the first question, but you cannot answer the same way.
	                        testNPC.tOA.push(TextObject(testNPC.text[14]));

	                        var needsOptions = TextObject(testNPC.text[15]);
	                        needsOptions.addOption(testNPC.text[3]);
	                        needsOptions.addOption(testNPC.text[5]);
	                        needsOptions.addOption(testNPC.text[6]);
	                        needsOptions.addOption(testNPC.text[7]);
	                        testNPC.tOA.push(needsOptions);
	                    }else if(textBox.selectedOption == testNPC.text[5]){

	                        //these options, or queries, get permanently answered when asked.
	                        testNPC.tOA.push(TextObject(testNPC.text[15]));
	                        testNPC.tOA.push(testNPC.query1);
	                    }else if(textBox.selectedOption == testNPC.text[17]){

	                        //these options, or queries, get permanently answered when asked.
	                        testNPC.query1.removeOption(testNPC.text[17]);

	                        testNPC.tOA.push(TextObject(testNPC.text[20]));
	                        testNPC.tOA.push(TextObject(testNPC.text[21]));
	                        //I'm changing this query's message so the options display with a message in a new context.
	                        testNPC.query1.string = testNPC.text[22];
	                        testNPC.tOA.push(testNPC.query1);
	                    }else if(textBox.selectedOption == testNPC.text[18]){

	                        //these options, or queries, get permanently answered when asked.
	                        testNPC.query1.removeOption(testNPC.text[18]);

	                        testNPC.tOA.push(TextObject(testNPC.text[23]));
	                        //I'm changing this query's message so the options display with a message in a new context.
	                        testNPC.query1.string = testNPC.text[24];
	                        testNPC.tOA.push(testNPC.query1);
	                    }else if(textBox.selectedOption == testNPC.text[19]){

	                        //leave the conversation due to running out of testNPC.text.
	                        testNPC.tOA.push(TextObject(testNPC.text[25]));
	                        testNPC.tOA.push(TextObject(testNPC.text[26]));
	                        testNPC.tOA.push(TextObject(testNPC.text[27]));
	                    }else if(textBox.selectedOption == testNPC.text[6]){

	                        //leave the conversation due to running out of testNPC.text.
	                        testNPC.tOA.push(TextObject(testNPC.text[25]));
	                        testNPC.tOA.push(TextObject(testNPC.text[26]));
	                        testNPC.tOA.push(TextObject(testNPC.text[27]));
	                    }else if(textBox.selectedOption == testNPC.text[7]){

	                        //this will cause an event to go off.
	                        //events are above.
	                        testNPC.tOA.push(TextObject(testNPC.text[31]));
	                        
	                    }else{
	                        //Nothing special is happening, so E N D...
	                        testNPC.endConversation();
	                    }
	                }else{
	                    if(keyboard.getKeyStatus("e") != "pressed"){
	                        //We're gonna pop (shift) and get more diologue
	                        testNPC.lastMessage = testNPC.tOA.shift();
	                        textBox.addText(testNPC.lastMessage);
	                    }
	                }
	            }
	        }
        }
    }

    testNPC.destroyInteractGraphic = function(){
        if(testNPC.interactGraphicController != undefined){
            testNPC.interactGraphicController.destroy();
            testNPC.interactGraphicController = null;
        }
    }

    testNPC.endConversation = function (){
        testNPC.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    testNPC.showContent = function (){
        for(var i = 0; i < testNPC.tOA.length; i++){
            alert(testNPC.tOA[i].string);
            if(testNPC.tOA[i].hasOptions){
                for(var j = 0; j < testNPC.tOA[i].options.length; j++){
                    alert("option: " + testNPC.tOA[i].options[j]);
                }
            }
        }
    }

    testNPC.scroll = function(){
        if(scrollXOffset != 0){
            testNPC.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            testNPC.character.mY(scrollYOffset);
        }

        if(testNPC.interactGraphicController != undefined){
            testNPC.interactGraphicController.scroll();
        }
    }

    testNPC.depth = function(){
        app.stage.setChildIndex(testNPC.character.graphic,childNum);
        childNum++;
        if(testNPC.interactGraphicController != undefined){
            testNPC.interactGraphicController.depth();
        }
    }

    testNPC.load = function(){
        testNPC.character = Character(testNPC.originX,testNPC.originY,testNPC.asset);
        testNPCArray[testNPCArray.length] = testNPC;
        testNPC.active = false;
    }

    testNPC.unload = function(){
        testNPC.destroyInteractGraphic();
        testNPC.character.graphic.destroy();
        for(var i = 0; i < testNPCArray.length; i++){
            if(testNPCArray[i] == testNPC){
                testNPCArray.splice(i,1);
            }
        }
    }

    testNPC.initialize = function () {
        testNPC.active = false;
        testNPC.asset = asset;
        testNPC.originX = x;
        testNPC.originY = y;
        testNPC.ready = false;

        fileReader.requestFile ("dialog/NPCText.txt", testNPC.assignText);
        testNPC.tOA = [];
        testNPC.lastMessage = "";
    }();

    return testNPC;
}