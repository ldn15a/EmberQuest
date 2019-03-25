function DialogueParser (textFile) {
    var dialogueParser = {};
    dialogueParser.textFile;
    dialogueParser.text;
    dialogueParser.ready;
    dialogueParser.relaventDialogue = [];
    dialogueParser.relaventStartingIndex;

    dialogueParser.toldTruth = true;
    dialogueParser.enteredVillage = false;
    dialogueParser.expectedCaravan = true;
    dialogueParser.naiaPartnered = false;
	
	dialogueParser.assignText = function () {
        dialogueParser.text = fileReader.read(dialogueParser.textFile);
		dialogueParser.ready = true;
        console.log("Text Reading Begun.");
        for(var i = 0;i < dialogueParser.text.length;i++){
            console.log(dialogueParser.text[i]);
        }
        console.log("Text Reading Finished.");
        dialogueParser.parseSetup();
	}

	dialogueParser.parseCommand = function(string){
		var isCommand = false;
		
		//else serves no purpose, it only precedes commands or other ifs.
		if(string.substring(0,5).toLowerCase() == "else "){
			string = string.substring(5,string.length);
			console.log("Else defeated. Remaining string: "+string);
		}		

		//parse the command for commands or variable setting.
		if(string.toLowerCase() == "end"){
			console.log("END FOUND.");
			isCommand = true;
		}else if(string.substring(0,6).toLowerCase() == "go to "){
			console.log("Go to found: " + string.substring(6,string.length));
			isCommand = true;
		}else if(string.substring(0,10).toLowerCase() == "return to "){
			console.log("Return to found: " + string.substring(10,string.length));
			isCommand = true;
		}else if(string.substring(0,3).toLowerCase() == "if "){
			var char;
			var startingIndex;
			var commandSearchMode = 0;
			var justOneArgument = false;
			var checkPart1;
			var checkPart2;
			var checkPart3;
			var outcome1;
			var outcome2;
			var isVariable = false;
			console.log("Check found: " + string);

			//we're skipping to i = 3 to go over the "If ".
			for(var i = 3;i < string.length;i++){
				char = string.charAt(i);

				//initialize loop
				if(i == 3){
					startingIndex = i;
					commandSearchMode = 0;
				}

				if(commandSearchMode < 3 && char === " " || char === ","){
					if(commandSearchMode == 0){
						checkPart1 = string.substring(startingIndex,i);
					}else if(commandSearchMode == 1){
						checkPart2 = string.substring(startingIndex,i);
					}else if(commandSearchMode == 2){
						checkPart3 = string.substring(startingIndex,i);
					}

					startingIndex = i+1;
					commandSearchMode++;

					//special case.
					if(char === ","){
						if(checkPart2 == undefined && checkPart3 == undefined){
							justOneArgument = true;
						}else if (!(checkPart2 != undefined && checkPart3 != undefined)){
							console.warn("ERROR: attempted to parse check command, but there were only 2 arguments. Argument1: "+checkPart1+", Argument2: "+checkPart2+", Argument3: "+checkPart3+". Check DialogueParser.js parseCommand or check if the string syntax is wrong: "+string);
						}
						//maybe it was just a "If naiaPartnered," and there was just one argument.
						startingIndex = i+2;
						commandSearchMode = 3;
					}
				}else if(char == ";"){
					outcome1 = string.substring(startingIndex,i);
					outcome2 = string.substring(i+2,string.length);
					//the dreaded break...?
					//but yeah we don't need the for loop anymore.
					i = string.length;
				}
			}

			console.log("String "+string+" A1 "+checkPart1+" A2 "+checkPart2+" A3 "+checkPart3+" O1 "+outcome1+" O2 "+outcome2);

			//Now use the parsed pieces.
			if(justOneArgument){
				if(dialogueParser.checkCondition(checkPart1)){
					isCommand = dialogueParser.parseCommand(outcome1);
					console.log("Check completed with single condition. " + checkPart1 + " is true. Beginning outcome: "+outcome1);
				}else{
					isCommand = dialogueParser.parseCommand(outcome2);
					console.log("Check completed with single condition. " + checkPart1 + " is false. Beginning outcome: "+outcome2);
				}
			}else{
				console.log("CHECK OUTPUT: "+checkPart1+"|"+checkPart2+"|"+checkPart3);

				if(isNaN(checkPart3)){
					if(checkPart3 != "true" && checkPart3 != "false"){
						//not a number or a boolean - must be a variable!
						isVariable = true;
					}
				}

				if(checkPart2 === "=="){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) == dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) == checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}
				}else if(checkPart2 === ">"){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) > dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) > checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}
				}else if(checkPart2 === "<"){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) < dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) < checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1);
							console.log("Check completed. " + checkPart1 + " is less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2);
							console.log("Check completed. " + checkPart1 + " is NOT less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}
					}
				}else{
					console.warn("ERROR: comparator is not valid. Found " + checkPart2 + " from " + string + ". Maybe the syntax is wrong?");
				}
			}
		}else{
			var char;
			var startingIndex = 0;
			var commandSearchMode = 0;
			var detectedCommand;
			var detectedAction;
			var ifCheck = false;
			var ifSet = false;
			var ifEqual = false;
			var settingValue;
			var endOffset = 0;

			//assuming we're working with a variable.
			for(var i = 0;i < string.length;i++){
				char = string.charAt(i);

				//initialize loop
				if(i == 0){
					startingIndex = 0;
					commandSearchMode = 0;
				}

				//found end of command
				if(char === " " || i == string.length-1){
					if(commandSearchMode == 0){
						detectedCommand = string.substring(startingIndex,i);
					}else if(commandSearchMode == 1){
						detectedAction = string.substring(startingIndex,i);
						if(detectedAction === "="){
							ifSet = true;
							ifEqual = true;
						}
					}else if(commandSearchMode == 2){
						//we do i+1 because we are 1 index behind due to this being the end of the string.
						settingValue = string.substring(startingIndex,i+1);
						if(isNaN(settingValue)){
							if(settingValue == "true"){
								settingValue = true;
							}else if(settingValue == "false"){
								settingValue = false;
							}else{
								console.warn("ERROR: settingValue in parseCommand is not a number, but is also neither TRUE or FALSE. Resulted in: "+settingValue+". Perhaps you mispelled something in the line \""+string+"\"?");
							}
						}else{
							settingValue = Number(settingValue);
						}
					}else{
						console.warn("ERROR: Over three arguments in parseCommand string. String in question: \""+string+"\". Maybe you made a mistake, or there is some new functionality you wanted and you need to tell Troy.");
					}

					startingIndex = i+1;
					commandSearchMode++;
				}
			}

			if(ifSet){
				if(ifEqual){
					isCommand = dialogueParser.setCondition(detectedCommand,settingValue);
					if(isCommand != undefined){
						isCommand = true;
						console.log("Successfully set condition "+detectedCommand+" to value "+settingValue);
					}
				}else{
					console.warn("ERROR: found possible command, but you did not use an \"=\" or a \"Go to\". Found \""+detectedAction+"\" in string \""+string+"\". Did you want to do something other than equate?");
				}
			}else{
				console.warn("ERROR: found possible command, but you did not use an \"=\" or a \"Go to\". Found \""+detectedAction+"\" in string \""+string+"\". Did you want to do something other than equate?");
			}

		}

		return isCommand;
	}

	dialogueParser.parseLine = function(string){
		var startingIndex = 0;
		var foundCommand = false;
		var command;
		var newString = "";
		var char;

		for(var i = 0;i < string.length;i++){
			char = string.charAt(i);
			if(char === "("){
				startingIndex = i+1;
				foundCommand = true;
			}else if(char === ")"){
				foundCommand = false;
				command = string.substring(startingIndex,i);

				//if it wasn't a command, but something like (sigh), then we need to put it back into the string.
				if(!dialogueParser.parseCommand(command)){
					newString+=string.substring(startingIndex-1,i+1);
				}

			}else if(!foundCommand){
				newString += char;
			}
		}

		//cut off the initial number or letter and tab.
		newString = newString.substring(3,newString.length);

		return newString;
	}

	//ensure that checkCondition and setCondition have the same variables.

    dialogueParser.checkCondition = function(string){
        var val = false;
        if(string === "karma"){
        	val = karma;
        }else if(string === "toldTruth"){
            val = dialogueParser.toldTruth;
        }else if(string === "enteredVillage"){
            val = dialogueParser.enteredVillage;
        }else if(string === "expectedCaravan"){
            val = dialogueParser.expectedCaravan;
        }else if(string === "naiaPartnered"){
            val = dialogueParser.naiaPartnered;
        }else{
            val = undefined;
            console.warn("Error: tried to check condition of variable \""+string+"\" from file \""+dialogueParser.textFile+"\". Maybe you mispelled it? Check dialogueParser.js's checkCondition function.");
        }
        return val;
    }

    //ensure that checkCondition and setCondition have the same variables.

    dialogueParser.setCondition = function(string,value){
    	var newValue = value;

    	if(string === "karma"){
    		karma += newValue;
    		console.warn("Tried to set karma through dialogue. Incrementing by the value instead.");
    	}else if(string === "toldTruth"){
            dialogueParser.toldTruth = newValue;
        }else if(string === "enteredVillage"){
            dialogueParser.enteredVillage = newValue;
        }else if(string === "expectedCaravan"){
            dialogueParser.expectedCaravan = newValue;
        }else if(string === "naiaPartnered"){
            dialogueParser.naiaPartnered = newValue;
        }else{
        	newValue = undefined;
            console.warn("Error: tried to set condition of variable \""+string+"\" with value \""+newValue+"\" from file \""+dialogueParser.textFile+"\". Maybe you mispelled it? Check dialogueParser.js's setCondition function.");
        }

        return newValue;
    }

    dialogueParser.parseConditions = function(string){
        var conditionsText = [];
        var conditionsState = [];
        var startingIndex = 0;
        // if it is not, it is negative.
        var isNot = false;
        // if it is and, it is 1. If it is or, it is 2.
        var or = false;

        var spaceNum = 0;
        var andNum = 0;
        var orNum = 0;

        var andResult = true;
        var orResult = false;

        var endOffset = 0;

        console.log("PARSING CONDITIONS... "+string);

        //determine conditions and condition states.
        for(var i = 0;i < string.length;i++){

            if(i == string.length-1){
                endOffset = 1;
            }else{
                endOffset = 0;
            }

            if(string.charAt(i) === " " || endOffset){
                spaceNum++;
                //is this the space before the conjunction? Or perhaps we are dealing with a single argument with no conjunctions?
                if(spaceNum % 2 == 1 || (endOffset && spaceNum == 0)){
                    conditionsText.push(string.substring(startingIndex,i+endOffset));

                    var state;
                    if(or){
                        state = 2;
                    }else{
                        state = 1;
                    }

                    if(isNot){
                        state *= -1;
                    }

                    conditionsState.push(state);

                    or = false;
                    isNot = false;
                }else if(spaceNum % 2 == 0){
                    startingIndex = i+1;
                }
            }else if(string.charAt(i) === "!"){
                isNot = true;
                startingIndex = i+1;
            }else if(string.charAt(i) === "&"){
                andNum++;
                //is this the first character in the conjunction?
                if(andNum % 2 == 1){
                    or = false;
                }
            }else if(string.charAt(i) === "|"){
                orNum++;
                //is this the first character in the conjunction?
                if(orNum % 2 == 1){
                    or = true;
                }
            }
        }

        for(var i = 0;i < conditionsText.length;i++){
            console.log("CTEXT: |"+conditionsText[i]+"|");
            console.log("CSTATE: |"+conditionsState[i]+"|");

            var conditionResult = dialogueParser.checkCondition(conditionsText[i]);
            if(conditionResult !== undefined){
                var state = conditionsState[i];
                if(state < 0){
                    conditionResult = !conditionResult;
                }
                if(conditionResult && Math.abs(state) == 2){
                    orResult = true;
                }else if(!conditionResult && Math.abs(state) == 1){
                    andResult = false;
                }
            }
        }

        console.log("CONDITION RESULT: "+(andResult || orResult)+" From and: "+andResult+", From or: "+orResult);

        return andResult || orResult;
    }

    dialogueParser.parseSetup = function(){
        //find starting index for relavent text.
        var c = 0;
        while(c < dialogueParser.text.length){
            //console.log(dialogueParser.text[c].substring(0,2));
            if(dialogueParser.text[c].substring(0,3) === "if("){
                console.log("IF AT LINE: "+c+" Line: "+dialogueParser.text[c]);
                if(dialogueParser.parseConditions(dialogueParser.text[c].substring(3,dialogueParser.text[c].length-1))){
                    console.log("this is the starting index.");
                    dialogueParser.relaventStartingIndex = c;
                    break;
                }
            }else if(dialogueParser.text[c].substring(0,8) === "else if("){
                console.log("ELSE IF AT LINE: "+c+" Line: "+dialogueParser.text[c]);
                if(dialogueParser.parseConditions(dialogueParser.text[c].substring(8,dialogueParser.text[c].length-1))){
                    console.log("this is the starting index.");
                    dialogueParser.relaventStartingIndex = c;
                    break;
                }
            }else if(dialogueParser.text[c] === "else"){
                console.log("ELSE found: "+c);
                console.log("this is the starting index.");
                dialogueParser.relaventStartingIndex = c;
                break;
            }

            c++;
        }

        //find numbered dialogue points' indexes.
        var c = dialogueParser.relaventStartingIndex+1;
        while(true){
            if(c == dialogueParser.text.length){
                break;
            }

            var testString = dialogueParser.text[c].substring(0,1);

            if(!isNaN(testString) && testString != ""){
                if(Number(testString) === dialogueParser.relaventDialogue.length+1){
                    dialogueParser.relaventDialogue.push(dialogueParser.text[c].substring(3,dialogueParser.text[c].length));
                }else{
                    console.warn("ERROR: hit unexpected dialogue tree number. Expected \""+(dialogueParser.relaventDialogue.length+1)+"\", got \""+Number(testString)+"\". Check the syntax for file \""+dialogueParser.textFile+"\" at line "+(c+1)+": \""+dialogueParser.text[c]+"\".");
                    break;
                }
            }else{
                if(dialogueParser.text[c].substring(0,4) === "else"){
                    console.log("Breaking from an else or else if.");
                    break;
                }
            }
            c++;
        }

        for(var i = 0;i < dialogueParser.relaventDialogue.length;i++){
            console.log("Relevent Dialogue index "+i+": "+dialogueParser.relaventDialogue[i]);
        }

        console.log("Final line 1: "+dialogueParser.parseLine("6.	“Even so, it would be irresponsible to go it alone. I will stay back and let you go at your own pace, but I insist on coming along, just in case something goes badly.” (naiaPartnered = false) (Return to 214) (End)"));
        console.log("Final line 2: "+dialogueParser.parseLine("a.	“If you must know, I’m searching for the Verdant Ember.” (Go to 2)"));
        console.log("Final line 3: "+dialogueParser.parseLine("a.	“Actually, I lied about the caravan.” (If karma > 2, go to 2; else if karma == naiaPartnered, go to 5; else go to 3)"));
    }

    dialogueParser.initialize = function () {
        dialogueParser.textFile = textFile;
        dialogueParser.ready = false;
        fileReader.requestFile (dialogueParser.textFile, dialogueParser.assignText);
    }();

    return dialogueParser;
}