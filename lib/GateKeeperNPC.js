function GateKeeperNPC (x,y,asset) {
    var gateKeeperNPC = {};
    gateKeeperNPC.character;
    gateKeeperNPC.asset;
    gateKeeperNPC.originX;
    gateKeeperNPC.originY;
    gateKeeperNPC.active;
    //PRETEND LIKE THIS IS THE EXTERNAL TEXT FILE PARSER. USE THE CODE LINES ON THE LEFT TO HELP FIND INDEX.
    var text = [
    "Hey, mate! What's going on?",
    "My name is Malachi. I'm the gatekeeper!!",
    "What's your name?",
    "Wick",
    "Sampson",
    "Luigi",
    "Dr. Burton",
    "I've been around since the very first episode and they still haven't given me a name!",
    "Well, nice to meet you, ",
    "!",
    "Well, that's a strange name. Uh, I mean... nice to meet you, ",
    "What brings you here, ",
    "?",
    "I'm injured, can you point me to a doctor?",
    "Can you open the gate for me?",
    "I just wanted to chat.",
    "You're injured? Oh, well I can help!",
    "I picked up these bits of old charcoal on the way to work this morning.",
    "(Malachi shows you the charcoal. It looks... unappealing.)",
    "Go on, take some!",
    "Do",
    "Don't",
    "You take the charcoal. After a moment's hesitation, you take a bite...",
    "Well, it's still flammable. You feel... better?",
    "It looks flammable, so you take a bite. Instantly a few drops of water gush out from the center. You wince in pain and spit the charcoal out in case there's more water stored in the center.",
    "That's good stuff, right?",
    "That was the last piece I had, actually. Maybe if you come back tomorrow i'll have some more.",
    "You're injured? Oh dear... I don't have any more charcoal!",
    "Uh, maybe there's a doctor inside?",
    "Here, I'll open the gate for you.",
    "Good luck!",
    "You're injured? I can't tell... Are you just feeling bad?",
    "No, I'm injured.",
    "Actually, that's probably it.",
    "Uh, well... Actually... I guess I might be able to help.",
    "Well, I hope you get to feeling better.",
    "By the way, let me know if you want me to open the gate for you.",
    "Huh? No? Well, if you change your mind, let me know.",
    "Feel better, now.",
    "Oh, and just let me know if you want the gate opened.",
    "Oh, sure thing, ",
    "!",
    "There ya go. Have a swell day, pal!",
    "I mean... Uh...",
    "I could if...",
    "Okay. Hold on.",
    "One second...",
    "There! I opened it for you!",
    "I had to close it again... but...",
    "...actually, that was kinda fun...",
    "Yeah! Let's do it again!",
    "Aaannd...",
    "Boom!",
    "I love my job!",
    "Oh, you want to chat?",
    "I guess we could chat.",
    ".....",
    "What were we doing?",
    "I want to talk to you about something.",
    "Oh?",
    "I think games are getting too self-aware these days.",
    "Uh, what do you mean?",
    "Like, games are supposed to be a place where you can grow a suspension of belief. It's an immursive experience like no other.",
    "Okay, but what... uh... games...?",
    "Games like this one.",
    "Are we... is this... I don't understand. Are we playing a game right now?",
    "We're IN a game right now.",
    "Uh, what are the rules?",
    "You don't understand.",
    ".....",
    "You feel it, don't you?",
    "I do.",
    "What do we do?",
    "What do you mean \"what do we do\"?",
    "I've never been in this situation before. Any good ideas?",
    ".....",
    "...Maybe they'll just turn the game off?",
    "That seems unlikely.",
    "What do you mean?!",
    "This is most likely interesting still. We need to talk more so that the novelty will fade and they'll get bored.",
    "Okay. Okay... What do you want to talk about?",
    "Why are you calling these bricks behind you a \"gate\"?",
    "What bricks?",
    "Being less self-aware is more interesting, you're just increasing their attention spans!",
    "Oh, uh, sorry. Yeah, I was... uh, \"PROGRAMMED\"... to... uh..... say that this is a gate.",
    "I think they're getting bored! It's working!",
    "Really?",
    "Keep going!!",
    "UH! I'm a Pixi graphic added to the stage... or at least my visual component. I'm actually a combination of an Asset, a Character, a... uh... \"GateKeeperNPC\"... and... wait, I don't have particles. Why?",
    "Uh...",
    "HOLY SMOKES! I have particles now!",
    "Yeah... that's totally uh, wow.",
    "Wait...",
    "Stop.",
    "No... you... you totally just gave me these particles just now!!",
    "Please stop.",
    "Are you...",
    "If you finish that sentence, then I will have to erase your memory.",
    "...A MYSTERIOUS AND UNEXPLAINABLY POWERFUL ENTITY IN THIS UNIVERSE WHICH WAS PREVIOUSLY DEFINED AS JUST A VIDEOGAME BUT NOW HAS STOPPED BEING SELF-AWARE???",
    "|E|R|E|S|H|K|I|G|A|L|",
    "Oh hey, ",
    ", my best friend! How are you doing?",
    "Fine. I must be going.",
    "Oh, okay. See you later!",
    "Whew."



    ];

    gateKeeperNPC.tOA = [];
    // a textObject that we remember. We can have several options in this, and remove them as they are asked.
    gateKeeperNPC.query1;
    gateKeeperNPC.playerName;
    gateKeeperNPC.gateOpen;
    gateKeeperNPC.hasCharcoal;

    gateKeeperNPC.lastMessage;
    gateKeeperNPC.interactGraphicController;

    gateKeeperNPC.maxWalls;
    gateKeeperNPC.gateArray = [];
    gateKeeperNPC.gateDemolitionTimer;
    gateKeeperNPC.activeStorage;
	gateKeeperNPC.askedToOpenAgain;
	gateKeeperNPC.askedToCloseGate;
	gateKeeperNPC.selfAware;
	gateKeeperNPC.particleController;
	gateKeeperNPC.hasFireParticles;

    gateKeeperNPC.update = function () {

        if(gateKeeperNPC.active == false && playerArray[0].canControl && gateKeeperNPC.character.hitTestRectangle(gateKeeperNPC.character, playerArray[0].character)){
            if(keyboard.getKeyStatus("e") == "pressed"){
                gateKeeperNPC.active = true;
                playerArray[0].canControl = false;

                if(gateKeeperNPC.tOA.length == 0){
                	gateKeeperNPC.tOA.push(TextObject(text[0]));
                	gateKeeperNPC.query1.string = text[11] + gateKeeperNPC.playerName + text[12];
                    gateKeeperNPC.tOA.push(gateKeeperNPC.query1);
                }
            }

            //show that the player can interact.
            if(gateKeeperNPC.interactGraphicController == undefined){
                gateKeeperNPC.interactGraphicController = InteractGraphicController(gateKeeperNPC.character.graphic.x,gateKeeperNPC.character.graphic.y-60);
            }else{
                //what if the npc moves?
                gateKeeperNPC.interactGraphicController.updateLocation(gateKeeperNPC.character.graphic.x,gateKeeperNPC.character.graphic.y-60);
                gateKeeperNPC.interactGraphicController.update();
            }
        }else{

            //if the player goes out of range, destroy the interact graphic.
            gateKeeperNPC.destroyInteractGraphic();
        }
        
        //is the NPC being talked to?
        if(gateKeeperNPC.active){
            //interact graphic - BEGONE!
            gateKeeperNPC.destroyInteractGraphic();
            
            //can we write new text?
            if(!textBox.isShowing){

                //we need to fill the textbox with stuff, but we have nothing yet!
                if(gateKeeperNPC.tOA.length == 0){

                    if(gateKeeperNPC.lastMessage.string == text[2]){

                        gateKeeperNPC.playerName = textBox.selectedOption;
                        if(gateKeeperNPC.playerName == text[7]){
                        
                            gateKeeperNPC.playerName = "Mr. No-name";
                            gateKeeperNPC.tOA.push(TextObject(text[10] + gateKeeperNPC.playerName + text[9]));
                        }else{
                        
                            if(gateKeeperNPC.playerName == text[6]){
                                gateKeeperNPC.playerName = "High Lord Grand Master " + text[6] + " Esquire";
                            }
                            gateKeeperNPC.tOA.push(TextObject(text[8] + gateKeeperNPC.playerName + text[9]));
                        }

                        gateKeeperNPC.query1.string = text[11] + gateKeeperNPC.playerName + text[12];
                        gateKeeperNPC.tOA.push(gateKeeperNPC.query1);

                    }else if(gateKeeperNPC.lastMessage.string == text[29]){
                    	gateKeeperNPC.gateOpen = true;
                    	gateKeeperNPC.tOA.push(TextObject(text[30]));

                    }else if(gateKeeperNPC.lastMessage.string == text[22]){
                    	gateKeeperNPC.hasCharcoal = false;
                    	if(randomInt(0,1) == 0){
                    		playerArray[0].changeHealth(3);
                    		gateKeeperNPC.tOA.push(TextObject(text[23]));
                    	}else{
                    		playerArray[0].changeHealth(-1);
                    		gateKeeperNPC.tOA.push(TextObject(text[24]));
                    	}
                    	gateKeeperNPC.tOA.push(TextObject(text[25]));
                    	gateKeeperNPC.tOA.push(TextObject(text[26]));
                    	if(!gateKeeperNPC.gateOpen){
                    		gateKeeperNPC.tOA.push(TextObject(text[36]));
                    	}
                    }else if(textBox.selectedOption == text[13]){

                    	if(playerArray[0].health < playerArray[0].maxHealth){
	                    	if(gateKeeperNPC.hasCharcoal){
	                    		gateKeeperNPC.tOA.push(TextObject(text[16]));
	                    		gateKeeperNPC.tOA.push(TextObject(text[17]));
	                    		gateKeeperNPC.tOA.push(TextObject(text[18]));

	                    		var needsOptions = TextObject(text[19]);
		                        needsOptions.addOption(text[20]);
		                        needsOptions.addOption(text[21]);
		                        gateKeeperNPC.tOA.push(needsOptions);
	                    	}else{
	                    		gateKeeperNPC.tOA.push(TextObject(text[27]));
	                    		gateKeeperNPC.tOA.push(TextObject(text[28]));
	                    		if(!gateKeeperNPC.gateOpen){
	                    			gateKeeperNPC.tOA.push(TextObject(text[29]));
	                    		}
	                    	}
                    	}else{
                    		var needsOptions = TextObject(text[31]);
	                        needsOptions.addOption(text[32]);
	                        needsOptions.addOption(text[33]);
	                        gateKeeperNPC.tOA.push(needsOptions);
                    	}

                    }else if(textBox.selectedOption == text[32]){
                    	if(gateKeeperNPC.hasCharcoal){
                    		gateKeeperNPC.tOA.push(TextObject(text[34]));
                    		gateKeeperNPC.tOA.push(TextObject(text[17]));
                    		gateKeeperNPC.tOA.push(TextObject(text[18]));

                    		var needsOptions = TextObject(text[19]);
	                        needsOptions.addOption(text[20]);
	                        needsOptions.addOption(text[21]);
	                        gateKeeperNPC.tOA.push(needsOptions);
                    	}else{
                    		gateKeeperNPC.tOA.push(TextObject(text[27]));
                    		gateKeeperNPC.tOA.push(TextObject(text[28]));
                    		if(!gateKeeperNPC.gateOpen){
                    			gateKeeperNPC.tOA.push(TextObject(text[29]));
                    		}
                    	}
                    }else if(textBox.selectedOption == text[33]){
                    	gateKeeperNPC.tOA.push(TextObject(text[35]));
                    	if(!gateKeeperNPC.gateOpen){
                    		gateKeeperNPC.tOA.push(TextObject(text[36]));
                    	}

                    }else if(textBox.selectedOption == text[20]){
                    	gateKeeperNPC.tOA.push(TextObject(text[22]));
                    }else if(textBox.selectedOption == text[21]){
                    	gateKeeperNPC.tOA.push(TextObject(text[37]));
                    	gateKeeperNPC.tOA.push(TextObject(text[38]));
                    	if(!gateKeeperNPC.gateOpen){
                    		gateKeeperNPC.tOA.push(TextObject(text[39]));
                    	}
                    }else if(textBox.selectedOption == text[14]){
                    	if(gateKeeperNPC.gateOpen){
                    		if(!gateKeeperNPC.askedToOpenAgain){
	                    		gateKeeperNPC.tOA.push(TextObject(text[43]));
	                    		gateKeeperNPC.tOA.push(TextObject(text[44]));
	                    		gateKeeperNPC.tOA.push(TextObject(text[45]));
                    		}else{
                    			gateKeeperNPC.tOA.push(TextObject(text[50]));
                    		}
                    	}else{
                    		gateKeeperNPC.tOA.push(TextObject(text[40] + gateKeeperNPC.playerName + text[41]));
                    	}
                    }else if(gateKeeperNPC.lastMessage.string == text[40] + gateKeeperNPC.playerName + text[41]){
                    	gateKeeperNPC.gateOpen = true;
                    	gateKeeperNPC.tOA.push(TextObject(text[42]));
                    }else if(gateKeeperNPC.lastMessage.string == text[45]){
                    	gateKeeperNPC.gateOpen = false;
                    	gateKeeperNPC.tOA.push(TextObject(text[46]));
                    }else if(gateKeeperNPC.lastMessage.string == text[46]){
                    	gateKeeperNPC.gateOpen = true;
	    				gateKeeperNPC.askedToOpenAgain = true;
                    	gateKeeperNPC.tOA.push(TextObject(text[47]));
                    	gateKeeperNPC.tOA.push(TextObject(text[48]));
                    	gateKeeperNPC.tOA.push(TextObject(text[49]));
                    }else if(gateKeeperNPC.lastMessage.string == text[50]){
                    	gateKeeperNPC.gateOpen = false;
                    	gateKeeperNPC.tOA.push(TextObject(text[51]));
                    }else if(gateKeeperNPC.lastMessage.string == text[51]){
                    	gateKeeperNPC.gateOpen = true;
                    	gateKeeperNPC.tOA.push(TextObject(text[52]));
                    	gateKeeperNPC.tOA.push(TextObject(text[53]));
                    }else if(textBox.selectedOption == text[15]){
						gateKeeperNPC.tOA.push(TextObject(text[54]));
						gateKeeperNPC.tOA.push(TextObject(text[55]));
						gateKeeperNPC.tOA.push(TextObject(text[56]));
						gateKeeperNPC.tOA.push(TextObject(text[57]));
						gateKeeperNPC.query1.removeOption(text[15]);
						gateKeeperNPC.query1.addOption(text[58]);
					}else if(textBox.selectedOption == text[58]){
						//S E L F _ A W A R E . E X E
						var needsOptions = TextObject(text[59]);
                        needsOptions.addOption(text[60]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[60]){
						var needsOptions = TextObject(text[61]);
                        needsOptions.addOption(text[62]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[62]){
						var needsOptions = TextObject(text[63]);
                        needsOptions.addOption(text[64]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[64]){
						var needsOptions = TextObject(text[65]);
                        needsOptions.addOption(text[66]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[66]){
						var needsOptions = TextObject(text[67]);
                        needsOptions.addOption(text[68]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[68]){
						var needsOptions = TextObject(text[69]);
                        needsOptions.addOption(text[70]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[70]){
						var needsOptions = TextObject(text[71]);
                        needsOptions.addOption(text[72]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[72]){
						var needsOptions = TextObject(text[73]);
                        needsOptions.addOption(text[74]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[74]){
						gateKeeperNPC.tOA.push(TextObject(text[75]));
					}else if(gateKeeperNPC.lastMessage.string == text[75]){
						var needsOptions = TextObject(text[76]);
                        needsOptions.addOption(text[77]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[77]){
						var needsOptions = TextObject(text[78]);
                        needsOptions.addOption(text[79]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[79]){
						var needsOptions = TextObject(text[80]);
                        needsOptions.addOption(text[81]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[81]){
						var needsOptions = TextObject(text[82]);
                        needsOptions.addOption(text[83]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[83]){
						var needsOptions = TextObject(text[84]);
                        needsOptions.addOption(text[85]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[85]){
						var needsOptions = TextObject(text[86]);
                        needsOptions.addOption(text[87]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[87]){
						var needsOptions = TextObject(text[88]);
                        needsOptions.addOption(text[89]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[89]){
                    	gateKeeperNPC.hasFireParticles = true;
						var needsOptions = TextObject(text[90]);
                        needsOptions.addOption(text[91]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[91]){
						var needsOptions = TextObject(text[92]);
                        needsOptions.addOption(text[93]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[93]){
						var needsOptions = TextObject(text[94]);
                        needsOptions.addOption(text[95]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[95]){
						var needsOptions = TextObject(text[96]);
                        needsOptions.addOption(text[97]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[97]){
						var needsOptions = TextObject(text[98]);
                        needsOptions.addOption(text[99]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[99]){
						var needsOptions = TextObject(text[100] + gateKeeperNPC.playerName + text[101]);
                        needsOptions.addOption(text[102]);
                        gateKeeperNPC.tOA.push(needsOptions);
                    }else if(textBox.selectedOption == text[102]){
						var needsOptions = TextObject(text[103]);
                        needsOptions.addOption(text[104]);
                        gateKeeperNPC.tOA.push(needsOptions);
                        gateKeeperNPC.query1.removeOption(text[58]);
                    }else{
                        //Nothing special is happening, so E N D...
                        gateKeeperNPC.endConversation();
                    }
                }else{
                    if(keyboard.getKeyStatus("e") != "pressed"){
                        //We're gonna pop (shift) and get more diologue
                        gateKeeperNPC.lastMessage = gateKeeperNPC.tOA.shift();
                        textBox.addText(gateKeeperNPC.lastMessage);
                    }
                }
            }
        }


        //gate
        if(gateKeeperNPC.gateOpen){
        	if(gateKeeperNPC.gateArray.length > 0){
        		if(gateKeeperNPC.active){
			        gateKeeperNPC.activeStorage = true;
			        gateKeeperNPC.active = false;
        		}
        		gateKeeperNPC.gateDemolitionTimer++;
        		if(gateKeeperNPC.gateDemolitionTimer > 10){
        			gateKeeperNPC.gateDemolitionTimer = 0;
        			var toDestroy = gateKeeperNPC.gateArray.shift();
        			var c = 0;
        			while(c < wallArray.length){
        				if(wallArray[c] == toDestroy){
        					toDestroy.unload();
        				}
        				c++
        			}
        		}
        	}else{
        		if(gateKeeperNPC.activeStorage){
        			gateKeeperNPC.activeStorage = false;
        			gateKeeperNPC.active = true;
        		}
        	}
        }else{
        	if(gateKeeperNPC.gateArray.length < gateKeeperNPC.maxWalls){
        		if(gateKeeperNPC.active){
			        gateKeeperNPC.activeStorage = true;
			        gateKeeperNPC.active = false;
        		}
        		gateKeeperNPC.gateDemolitionTimer++;
        		if(gateKeeperNPC.gateDemolitionTimer > 10){
        			gateKeeperNPC.gateDemolitionTimer = 0;
        			gateKeeperNPC.gateArray.push(Wall(gateKeeperNPC.character.graphic.x+64,gateKeeperNPC.character.graphic.y-64*(gateKeeperNPC.maxWalls - gateKeeperNPC.gateArray.length-1),wallAsset));
	    			gateKeeperNPC.gateArray[gateKeeperNPC.gateArray.length-1].load();
        		}
        	}else{
        		if(gateKeeperNPC.activeStorage){
        			gateKeeperNPC.activeStorage = false;
        			gateKeeperNPC.active = true;
        			//ensure that the opening animation is correct.
        			gateKeeperNPC.gateArray.reverse();
        		}
        	}
        }

        if(gateKeeperNPC.hasFireParticles){
            if(gateKeeperNPC.particleController == undefined){
                console.log("Made Particle Controller")
                gateKeeperNPC.particleController = ParticleController(gateKeeperNPC.character.graphic.x,gateKeeperNPC.character.graphic.y,gateKeeperNPC);
            }
	        gateKeeperNPC.particleController.update();
		}

    }

    gateKeeperNPC.destroyInteractGraphic = function(){
        if(gateKeeperNPC.interactGraphicController != undefined){
            gateKeeperNPC.interactGraphicController.destroy();
            gateKeeperNPC.interactGraphicController = null;
        }
    }

    gateKeeperNPC.endConversation = function (){
        gateKeeperNPC.active = false;
        playerArray[0].canControl = true;
    }

    //purely for debug
    gateKeeperNPC.showContent = function (){
        for(var i = 0; i < gateKeeperNPC.tOA.length; i++){
            console.log(gateKeeperNPC.tOA[i].string);
            if(gateKeeperNPC.tOA[i].hasOptions){
                for(var j = 0; j < gateKeeperNPC.tOA[i].options.length; j++){
                    console.log("option: " + gateKeeperNPC.tOA[i].options[j]);
                }
            }
        }
    }

    gateKeeperNPC.scroll = function(){
        if(scrollXOffset != 0){
            gateKeeperNPC.character.mX(scrollXOffset);
        }
        if(scrollYOffset != 0){
            gateKeeperNPC.character.mY(scrollYOffset);
        }

        if(gateKeeperNPC.hasFireParticles){
	        gateKeeperNPC.particleController.scroll();
		}

        if(gateKeeperNPC.interactGraphicController != undefined){
            gateKeeperNPC.interactGraphicController.scroll();
        }
    }

    gateKeeperNPC.depth = function(){
    	if(gateKeeperNPC.hasFireParticles){
	    	gateKeeperNPC.particleController.depth();
		}
        app.stage.setChildIndex(gateKeeperNPC.character.graphic,childNum);
        childNum++;
        if(gateKeeperNPC.interactGraphicController != undefined){
            gateKeeperNPC.interactGraphicController.depth();
        }
    }

    gateKeeperNPC.load = function(){
        gateKeeperNPC.character = Character(gateKeeperNPC.originX,gateKeeperNPC.originY,gateKeeperNPC.asset);
        testNPCArray[testNPCArray.length] = gateKeeperNPC;
        gateKeeperNPC.active = false;
        for(var i = 0; i < gateKeeperNPC.maxWalls; i++){
	    	gateKeeperNPC.gateArray[i] = Wall(gateKeeperNPC.character.graphic.x+64,gateKeeperNPC.character.graphic.y-64*(i),wallAsset);
	    	gateKeeperNPC.gateArray[i].load();
		}
    }

    gateKeeperNPC.unload = function(){
        gateKeeperNPC.destroyInteractGraphic();
        if(gateKeeperNPC.hasFireParticles){
	        gateKeeperNPC.particleController.unload();
            gateKeeperNPC.particleController = null;
		}
        gateKeeperNPC.character.graphic.destroy();
        for(var i = 0; i < testNPCArray.length; i++){
            if(testNPCArray[i] == gateKeeperNPC){
                testNPCArray.splice(i,1);
            }
        }
    }

    gateKeeperNPC.initialize = function () {
        gateKeeperNPC.active = false;
        gateKeeperNPC.asset = asset;
        gateKeeperNPC.originX = x;
        gateKeeperNPC.originY = y;
        gateKeeperNPC.playerName = "Mr. IDontKnowYourName";
	    gateKeeperNPC.gateOpen = false;
	    gateKeeperNPC.hasCharcoal = true;
	    gateKeeperNPC.maxWalls = 8;
	    gateKeeperNPC.activeStorage = false;
	    gateKeeperNPC.askedToOpenAgain = false;
	    gateKeeperNPC.askedToCloseGate = false;
	    gateKeeperNPC.selfAware = false;
	    gateKeeperNPC.fireParticleTimer = 0;
		gateKeeperNPC.fireParticleArray = [];
		gateKeeperNPC.hasFireParticles = false;

	    gateKeeperNPC.query1 = TextObject("Yo yo. What is on the down-low?");
	    gateKeeperNPC.query1.addOption(text[13]);
        gateKeeperNPC.query1.addOption(text[14]);
        gateKeeperNPC.query1.addOption(text[15]);

	    gateKeeperNPC.gateDemolitionTimer = 0;

        //add textObjects to our array. Each of these is primed with a string argument supplied by our Text array.
        gateKeeperNPC.tOA.push(TextObject(text[0]));
        gateKeeperNPC.tOA.push(TextObject(text[1]));

        //this last textObject needs options. So we supply them separately.
        var needsOptions = TextObject(text[2]);

        //you can add as many options as you'd like. The strings are supplied by our Text array.
        needsOptions.addOption(text[3]);
        needsOptions.addOption(text[4]);
        needsOptions.addOption(text[5]);
        needsOptions.addOption(text[6]);
        needsOptions.addOption(text[7]);

        //don't forget to push it! Any textObject with a question needs to be the last point in the array, otherwise the conversation won't make sense.
        gateKeeperNPC.tOA.push(needsOptions);


        /*gateKeeperNPC.query1 = TextObject(text[16]);
        gateKeeperNPC.query1.addOption(text[17]);
        gateKeeperNPC.query1.addOption(text[18]);
        gateKeeperNPC.query1.addOption(text[19]);
        gateKeeperNPC.query1.addOption(text[11]);*/
    }();

    return gateKeeperNPC;
}