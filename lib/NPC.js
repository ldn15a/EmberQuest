function NPC(x, y, asset, textFile) {
    var npc = {};
    npc.character;
    npc.asset;
    npc.originX;
    npc.originY;
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

    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    npc.query1;

    npc.lastMessage;
    npc.interactGraphicController;

    npc.update = function () {

        npc.character.graphic.x = globalX * -0.4 + npc.originX;
        if (npc.dialogueParser.ready && playerArray.length > 0) {
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

                //show that the player can interact.
                if (npc.interactGraphicController == undefined) {
                    npc.interactGraphicController = InteractGraphicController(npc.character.graphic.x, npc.character.graphic.y - 60);
                } else {
                    //what if the npc moves?
                    npc.interactGraphicController.updateLocation(npc.character.graphic.x, npc.character.graphic.y - 60);
                    npc.interactGraphicController.update();
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

        if(!npc.active){
            npc.checkVariables();
        }
    }

    npc.advanceText = function () {
        if (!textBox.isShowing) {
            console.log("NPC ACTION.");

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
		if(textFile == "dialog/Naia2.txt"){	
			if(npc.isFollowingAsNaia == false && npcVariables.naiaPartnered == true){
				npc.isFollowingAsNaia = true;
				npc.isNPC = false;
			}
		}

    	//update based on status
		if(npc.isFollowingAsNaia){
            npc.NaiaFollow();
		}
    }

    npc.NaiaFollow = function(){
        //log player position


		if(!npc.naia_followMode){
            //engage with enemies
			if(npc.naia_moveDir != 0){

				//update the flame sprite if we're moving in a direction
				if(npc.naia_lastDir != npc.naia_moveDir){
					redFlameMovingAsset.scaleX = redFlameMovingAsset.defaultScaleX*npc.naia_moveDir;
					npc.character.setSprite(redFlameMovingAsset);
				}

				npc.character.moveX(npc.naia_moveDir*npc.naia_spd);

			}else if(npc.character.asset != redFlameStillAsset){
				//if we're still, and we haven't updated to the still image, be still!!
				npc.character.setSprite(redFlameStillAsset);
			}

			//check for npc jumping or falling
			if(keyboard.getKeyStatus(" ") == "pressed" && !npc.naia_jump && npc.character.hitsWallY(1)){
				npc.naia_jump = 1;
				npc.naia_airTime = -npc.naia_peakTime;
			}else if(!npc.naia_jump && !npc.character.hitsWallY(1)){
				npc.naia_jump = 1;
				npc.naia_airTime = 0;
			}

			//if you let go, you start falling if you haven't started yet.
			if(keyboard.getKeyStatus(" ") == "released" && npc.naia_jump && npc.naia_airTime < 0){
				npc.naia_airTime = 0;
			}
		

			//if we're jumping or falling
			if(npc.naia_jump){
				npc.naia_airTime++;
				var jumpDir = 1;
				if(npc.naia_airTime < 0){
					jumpDir = -1;
				}
				
				//terminal velocity
				if(npc.naia_airTime > npc.naia_peakTime){
					npc.naia_airTime = npc.naia_peakTime;
				}

				//move the npc, also check if we hit the ground.
				if(!npc.character.moveY(npc.naia_airTime*npc.naia_airTime*jumpDir/npc.naia_airDrag)){
					npc.naia_jump = 0;
					npc.naia_airTime = 0;
					//console.log(orvelObject.graphic.y);
				}
			}


			//DEBUG
			if(globalY > 600){
				//this moves all entities 1600 pixels up
				//npc.character.graphic.y = -1800;
			}
		}else{
            //Follow player

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

        if (npc.interactGraphicController != undefined) {
            npc.interactGraphicController.scroll();
        }
    }

    npc.depth = function () {
        app.stage.setChildIndex(npc.character.graphic, childNum);
        childNum++;
        if (npc.interactGraphicController != undefined) {
            npc.interactGraphicController.depth();
        }
    }

    npc.load = function () {
        npc.character = Character(npc.originX, npc.originY, npc.asset);
        NPCArray.push(npc);
        npc.active = false;
    }

    npc.unload = function () {
        npc.destroyInteractGraphic();
        npc.character.graphic.destroy();
        for (var i = 0; i < NPCArray.length; i++) {
            if (NPCArray[i] == npc) {
                NPCArray.splice(i, 1);
            }
        }
    }

    npc.initialize = function () {
        npc.active = false;
        npc.asset = asset;
        npc.originX = x;
        npc.originY = y;
        npc.isNPC = true;
        npc.ready = false;
        npc.textFile = textFile;
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

        npc.dialogueParser = DialogueParser(npc.textFile, npc);
        npc.tOA = [];
        npc.lastMessage = "";
    }();

    return npc;
}