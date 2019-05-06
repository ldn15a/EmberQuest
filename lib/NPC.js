function NPC(x, y, asset, textFile) {
    var npc = {};
    npc.character;
    npc.asset;
    npc.originX;
    npc.originY;
    npc.particleController;
    npc.active;
    npc.currentTextObject;
    npc.textLoaded;
    npc.ready;
    npc.isNPC;
    npc.talkedTo;
    npc.isFollowingAsNaia;
    npc.naia_followMode;
    npc.naia_spd;
	npc.naia_jump;
	npc.naia_jumpReset;
	npc.naia_airTime;
	npc.naia_peakTime;
	npc.naia_airDrag;
	npc.naia_moveDir;
	npc.naia_attackDir;
    npc.naia_followArray = [];
    npc.naia_followPlayerX;
    npc.naia_followPlayerY;
    npc.naia_followUpdateCounter;
    npc.naia_followUntilGrounded;
    npc.generic_zeldaWalk;
    npc.generic_zeldaWalkDir;
    npc.generic_zeldaWalkSpeed;
    npc.generic_zeldaWalkRange;

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    npc.query1;

    npc.lastMessage;
    npc.interactGraphicController;

    npc.update = function () {

        //npc.character.graphic.x = globalX * -0.4 + npc.originX;
        if (npc.isNPC && npc.dialogueParser.ready && playerArray.length > 0) {
            if (npc.active == false && npc.character.hitTestRectangle(npc.character, playerArray[0].character)) {
                if (keyboard.getKeyStatus("e") == "pressed") {
                    npc.active = true;
                    npc.talkedTo = true;
                    playerArray[0].canControl = false;
                    npc.dialogueParser.end = false;

                    if (npc.tOA.length == 0) {
                        npc.tOA.push(TextObject(npc.lastMessage.string));
                    }
                }

                if(npc.tOA.length == 0){
                    //show that the player can interact.
                    if (npc.interactGraphicController == undefined) {
                        npc.interactGraphicController = InteractGraphicController(npc.character.graphic.x, npc.character.graphic.y - 60);
                    } else {
                        //what if the npc moves?
                        npc.interactGraphicController.updateLocation(npc.character.graphic.x, npc.character.graphic.y - 60);
                        npc.interactGraphicController.update();
                    }
                }
            } else {

                //if the player goes out of range, destroy the interact graphic.
                npc.destroyInteractGraphic();
            }

            //is the npc being talked to?
            if (npc.active) {
                //interact graphic - BEGONE!
                npc.destroyInteractGraphic();

                //can we write new npc.text?
                npc.advanceText();
            }
        }

        npc.particleController.update();

        if(!npc.active){
            npc.checkVariables();
        }
    }

    npc.advanceText = function () {
        if (!textBox.isShowing) {
            //console.log("NPC ACTION.");

            //we need to fill the textbox with stuff, but we have nothing yet!
            if (npc.currentTextObject == null) {

                //pull from the other class
                if(!npc.dialogueParser.end){
					npc.currentTextObject = npc.dialogueParser.prepareNextTextObject();
                }else{
					npc.endConversation();
                }

            } else {
                if (keyboard.getKeyStatus("e") != "pressed") {
                    //We're gonna pop (shift) and get more diologue
                    npc.lastMessage = npc.currentTextObject;
                    npc.currentTextObject = null;
                    textBox.addText(npc.lastMessage);
                }
            }
        }
    }

    npc.checkVariables = function(){
    	//check for updates to status
		if(textFile == "Naia2"){	
			if(npc.isFollowingAsNaia == false && npcVariables.Naia_naiaPartnered == true){
				npc.isFollowingAsNaia = true;
				npc.isNPC = false;
			}
		}

        var isMoving = false;

    	//update based on status
		if(npc.isFollowingAsNaia){
            isMoving = true;
            npc.NaiaFollow();
		}

        if(npc.generic_zeldaWalk){
            isMoving = true;
            npc.NaiaZeldaWalk();
        }

        //allow us to fall.
        if(!isMoving){
            npc.character.movement(0,false);
        }
    }

    npc.NaiaZeldaWalk = function(){
        
    }

    npc.NaiaFollow = function(){

		if(!npc.naia_followMode){
            npc.character.movement(0,false);
		}else{
            //Follow player
            if(playerArray.length > 0){
                
                //add positions to our list if the player is moving.
                if(playerArray[0].character.getPositionX() != npc.naia_followPlayerX || playerArray[0].character.getPositionY() != npc.naia_followPlayerY){

                    //console.log("List Update.");
                    npc.naia_followPlayerX = playerArray[0].character.getPositionX();
                    npc.naia_followPlayerY = playerArray[0].character.getPositionY();
                    var playerDirection = playerArray[0].moveDir;
                    var playerJump = playerArray[0].character.jump;

                    npc.naia_followArray.push(CharacterInfo(npc.naia_followPlayerX,npc.naia_followPlayerY,playerDirection,playerJump));


                }

                //act on the stored positions. We'll always have a 30 frame gap (unless there's weird platforming.)
                if(npc.naia_followArray.length > 30 || npc.naia_followUntilGrounded){
                    
                    //console.log("Act on list. | " + globalX);//npc.character.graphic.y);
                    //to ensure that naia can't stop mid-air, she can only commit to a jump/fall if there is a position stored in the future where she lands.
                    if(npc.naia_followArray[0].jump){
                        if(!npc.naia_followUntilGrounded){
                            var c = 0;
                            while(c < npc.naia_followArray.length){
                                if(!npc.naia_followArray[c].jump){
                                    npc.naia_followUntilGrounded = true;
                                }
                                c++;
                            }
                        }
                    }else{
                        npc.naia_followUntilGrounded = false;
                    }

                    //commit to updating position if we're grounded or committing to a jump/fall
                    if(!npc.naia_followArray[0].jump || npc.naia_followUntilGrounded){
                        var currentState = npc.naia_followArray[0];

                        npc.character.setPositionX(currentState.x);
                        npc.character.setPositionY(currentState.y);
                        
                        /*if(currentState.direction != 0){
                            redFlameMovingAsset.scaleX = redFlameMovingAsset.defaultScaleX*currentState.direction;
                            npc.character.setSprite(redFlameMovingAsset);
                        }else{
                            npc.character.setSprite(redFlameStillAsset);
                        }*/

                        npc.naia_followArray.splice(0,1);
                    }
                }else{
                    console.log(npc.character.getPositionX() + " | " + npc.character.getPositionY());
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

    npc.endConversation = function () {
        npc.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    npc.showContent = function () {
        for (var i = 0; i < npc.tOA.length; i++) {
            alert(npc.tOA[i].string);
            if (npc.tOA[i].hasOptions) {
                for (var j = 0; j < npc.tOA[i].options.length; j++) {
                    alert("option: " + npc.tOA[i].options[j]);
                }
            }
        }
    }

    npc.scroll = function () {
        if (scrollXOffset != 0) {
            npc.character.mX(scrollXOffset);
        }
        if (scrollYOffset != 0) {
            npc.character.mY(scrollYOffset);
        }
        npc.particleController.scroll();

        if (npc.interactGraphicController != undefined) {
            npc.interactGraphicController.scroll();
        }
    }

    npc.depth = function () {
        npc.particleController.depth();
        app.stage.setChildIndex(npc.character.graphic, childNum);
        childNum++;
        if (npc.interactGraphicController != undefined) {
            npc.interactGraphicController.depth();
        }
    }

    npc.load = function () {
        npc.initializeVariables();
        npc.character = Character(npc.originX, npc.originY, npc.asset);
		NPCArray.push(npc);
        npc.active = false;
        npc.particleController = ParticleController(npc.character.x,npc.character.y,npc);
    }

    npc.unload = function () {
        npc.destroyInteractGraphic();
		npc.character.unload();
		npc.active = false;
        npc.particleController.free();
    }

    npc.initializeVariables = function () {
        npc.tOA = [];
        npc.lastMessage = "";
        npc.active = false;
        npc.asset = asset;
        npc.originX = x;
        npc.originY = y;
        npc.isNPC = true;
        npc.ready = false;
        npc.talkedTo = false;
        npc.isFollowingAsNaia = false;
        npc.naia_moveDir = 0;
        npc.naia_spd = 6;
        npc.naia_jump = 0;
        npc.naia_jumpReset = 0;
        npc.naia_airTime = 0;
        npc.naia_peakTime = 25;
        npc.naia_airDrag = 20;
        npc.naia_useJumpingMechanic = true;
        npc.naia_lastDir = 0;

        npc.naia_followMode = true;
        npc.naia_followPlayerX = 0;
        npc.naia_followPlayerY = 0;
        npc.naia_followUpdateCounter = 0;
        npc.naia_followUntilGrounded = false;

        npc.generic_zeldaWalk = false;
        npc.generic_zeldaWalkDir = 1;
        npc.generic_zeldaWalkSpeed = 2;
        npc.generic_zeldaWalkRange = 900 + randomInt(0,100);
    }

    npc.initialize = function () {
        npc.textFile = textFile;
        npc.dialogueParser = DialogueParser(npc.textFile, npc);
    }();

    return npc;
}