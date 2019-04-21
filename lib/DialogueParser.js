function DialogueParser (textFile, master) {
	var dialogueParser = {};
	dialogueParser.textFile;
	dialogueParser.text;
	dialogueParser.ready;
	dialogueParser.relaventDialogue = [];
	dialogueParser.relaventStartingIndex;
	dialogueParser.textPosition;
	dialogueParser.end;
	dialogueParser.goTo;
	dialogueParser.returnTo;

	dialogueParser.assignText = function () {
        dialogueParser.text = fileReader.legacy.read(dialogueParser.textFile);
		//console.log("Text Reading finished.");
        /*for(var i = 0;i < dialogueParser.text.length;i++){
            console.log(dialogueParser.text[i]);
        }
        console.log("Text Reading Finished.");*/
		dialogueParser.parseSetup();
	}

	dialogueParser.parseCommand = function (string, runCommands) {
		var isCommand = false;

		//else serves no purpose, it only precedes commands or other ifs.
		if(string.substring(0,5).toLowerCase() == "else "){
			string = string.substring(5,string.length);
			//console.log("Else defeated. Remaining string: "+string);
		}		

		//parse the command for commands or variable setting.
		if(string.toLowerCase() == "end"){
			//console.log("END FOUND.");
			isCommand = true;
			if (runCommands) {
				dialogueParser.end = true;
			}
		}else if(string.substring(0,6).toLowerCase() == "go to "){
			//console.log("Go to found: " + string.substring(6,string.length));
			isCommand = true;
			if (runCommands) {
				dialogueParser.goTo = (string.substring(6, string.length));
			}
		}else if(string.substring(0,10).toLowerCase() == "return to "){
			//console.log("Return to found: " + string.substring(10,string.length));
			isCommand = true;
			//ONLY RUN WHEN IT IS DISPLAYED.
			if (!runCommands) {
				dialogueParser.returnTo = Number(string.substring(10, string.length));
			}
		} else if (string.substring(0, 3).toLowerCase() == "if ") {
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
			//console.log("Check found: " + string);

			//we're skipping to i = 3 to go over the "If ".
			for (var i = 3; i < string.length; i++) {
				char = string.charAt(i);

				//initialize loop
				if (i == 3) {
					startingIndex = i;
					commandSearchMode = 0;
				}

				if (commandSearchMode < 3 && char === " " || char === ",") {
					if (commandSearchMode == 0) {
						checkPart1 = string.substring(startingIndex, i);
					} else if (commandSearchMode == 1) {
						checkPart2 = string.substring(startingIndex, i);
					} else if (commandSearchMode == 2) {
						checkPart3 = string.substring(startingIndex, i);
					}

					startingIndex = i + 1;
					commandSearchMode++;

					//special case.
					if (char === ",") {
						if (checkPart2 == undefined && checkPart3 == undefined) {
							justOneArgument = true;
						} else if (!(checkPart2 != undefined && checkPart3 != undefined)) {
							console.warn("ERROR: attempted to parse check command, but there were only 2 arguments. Argument1: " + checkPart1 + ", Argument2: " + checkPart2 + ", Argument3: " + checkPart3 + ". Check DialogueParser.js parseCommand or check if the string syntax is wrong: " + string);
						}
						//maybe it was just a "If naiaPartnered," and there was just one argument.
						startingIndex = i + 2;
						commandSearchMode = 3;
					}
				}else if(char === ";"){
					outcome1 = string.substring(startingIndex,i);
					outcome2 = string.substring(i+2,string.length);
					//the dreaded break...?
					//but yeah we don't need the for loop anymore.
					i = string.length;
				}
			}

			//console.log("String "+string+" A1 "+checkPart1+" A2 "+checkPart2+" A3 "+checkPart3+" O1 "+outcome1+" O2 "+outcome2);

			//Now use the parsed pieces.
			if(justOneArgument){
				if(dialogueParser.checkCondition(checkPart1)){
					isCommand = dialogueParser.parseCommand(outcome1,runCommands);
					//console.log("Check completed with single condition. " + checkPart1 + " is true. Beginning outcome: "+outcome1);
				}else{
					isCommand = dialogueParser.parseCommand(outcome2,runCommands);
					//console.log("Check completed with single condition. " + checkPart1 + " is false. Beginning outcome: "+outcome2);
				}
			}else{
				//console.log("CHECK OUTPUT: "+checkPart1+"|"+checkPart2+"|"+checkPart3);

				if (isNaN(checkPart3)) {
					if (checkPart3 != "true" && checkPart3 != "false") {
						//not a number or a boolean - must be a variable!
						isVariable = true;
					}
				}

				if(checkPart2 === "=="){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) == dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) == checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT equal to " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}
				}else if(checkPart2 === ">"){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) > dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) > checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT greater than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}
				}else if(checkPart2 === "<"){
					if(isVariable){
						if(dialogueParser.checkCondition(checkPart1) < dialogueParser.checkCondition(checkPart3)){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome2);
						}
					}else{
						if(dialogueParser.checkCondition(checkPart1) < checkPart3){
							isCommand = dialogueParser.parseCommand(outcome1,runCommands);
							//console.log("Check completed. " + checkPart1 + " is less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}else{
							isCommand = dialogueParser.parseCommand(outcome2,runCommands);
							//console.log("Check completed. " + checkPart1 + " is NOT less than " + checkPart3 + ". isVariable: "+isVariable+". Beginning outcome: "+outcome1);
						}
					}
				} else {
					console.warn("ERROR: comparator is not valid. Found " + checkPart2 + " from " + string + ". Maybe the syntax is wrong?");
				}
			}
		} else {
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
			for (var i = 0; i < string.length; i++) {
				char = string.charAt(i);

				//initialize loop
				if (i == 0) {
					startingIndex = 0;
					commandSearchMode = 0;
				}

				//found end of command
				if (char === " " || i == string.length - 1) {
					if (commandSearchMode == 0) {
						detectedCommand = string.substring(startingIndex, i);
					} else if (commandSearchMode == 1) {
						detectedAction = string.substring(startingIndex, i);
						if (detectedAction === "=") {
							ifSet = true;
							ifEqual = true;
						}
					} else if (commandSearchMode == 2) {
						//we do i+1 because we are 1 index behind due to this being the end of the string.
						settingValue = string.substring(startingIndex, i + 1);
						if (isNaN(settingValue)) {
							if (settingValue == "true") {
								settingValue = true;
							} else if (settingValue == "false") {
								settingValue = false;
							} else {
								console.warn("ERROR: settingValue in parseCommand is not a number, but is also neither TRUE or FALSE. Resulted in: " + settingValue + ". Perhaps you mispelled something in the line \"" + string + "\"?");
							}
						} else {
							settingValue = Number(settingValue);
						}
					} else {
						console.warn("ERROR: Over three arguments in parseCommand string. String in question: \"" + string + "\". Maybe you made a mistake, or there is some new functionality you wanted and you need to tell Troy.");
					}

					startingIndex = i + 1;
					commandSearchMode++;
				}
			}

			if(ifSet){
				if(ifEqual){
					isCommand = dialogueParser.setCondition(detectedCommand,settingValue,runCommands);
				}else{
					console.warn("ERROR: found possible command, but you did not use an \"=\", \"+\", \"-\", or a \"Go to\". Found \""+detectedAction+"\" in string \""+string+"\". Did you want to do something other than equate?");
				}
			}else{
				if(detectedAction === "+"){
					isCommand = dialogueParser.setCondition(detectedCommand,dialogueParser.checkCondition(detectedCommand) + settingValue,runCommands);
				}else if(detectedAction === "-"){
					isCommand = dialogueParser.setCondition(detectedCommand,dialogueParser.checkCondition(detectedCommand) - settingValue,runCommands);
				}else{
					console.warn("ERROR: found possible command, but you did not use an \"=\", \"+\", \"-\", or a \"Go to\". Found \""+detectedAction+"\" in string \""+string+"\". Did you want to do something other than equate?");
				}
			}

			if(isCommand != undefined){
				isCommand = true;
				//console.log("Successfully attempted to set condition "+detectedCommand+" to value "+settingValue+". RunCommands status: "+runCommands);
			}

		}

		return isCommand;
	}

	dialogueParser.parseLine = function (string, runCommands) {
		var startingIndex = 0;
		var foundCommand = false;
		var command;
		var newString = "";
		var char;

		for (var i = 0; i < string.length; i++) {
			char = string.charAt(i);
			if (char === "(") {
				startingIndex = i + 1;
				foundCommand = true;
			} else if (char === ")") {
				foundCommand = false;
				command = string.substring(startingIndex, i);

				//if it wasn't a command, but something like (sigh), then we need to put it back into the string.
				if (!dialogueParser.parseCommand(command, runCommands)) {
					newString += string.substring(startingIndex - 1, i + 1);
				}

			} else if (!foundCommand) {
				newString += char;
			}
		}

		//cut off the initial number or letter and tab.
		if(isNaN(string.charAt(0))){
			newString = newString.substring(1, newString.length);
		}else{
			newString = newString.substring(3, newString.length);
		}

		return newString;
	}

	//ensure that checkCondition and setCondition have the same variables.

	dialogueParser.checkCondition = function (string) {
		var val = false;

		if (npcVariables == undefined) {
			console.error("No NPCVariables instance declared. Is a NPCVariables class named \"npcVariables\" not defined in main?");
		}

		if (string === "karma") {
			val = karma;
		} else if (string === "toldTruth") {
			val = npcVariables.toldTruth;
		} else if (string === "enteredVillage") {
			val = npcVariables.enteredVillage;
		} else if (string === "expectedCaravan") {
			val = npcVariables.expectedCaravan;
		} else if (string === "naiaPartnered") {
			val = npcVariables.naiaPartnered;
		} else if (string === "naiasCharm") {
			//global variable.
			val = naiasCharm;
		} else {
			val = undefined;
			console.warn("Error: tried to check condition of variable \"" + string + "\" from file \"" + dialogueParser.textFile + "\". Maybe you mispelled it? Check dialogueParser.js's checkCondition function.");
		}
		return val;
	}

	//ensure that checkCondition and setCondition have the same variables.

	dialogueParser.setCondition = function (string, value, runCommands) {
		var newValue = value;

		if (npcVariables == undefined) {
			console.error("No NPCVariables instance declared. Is a NPCVariables class named \"npcVariables\" not defined in main?");
		}

		if (string === "karma") {
			if (runCommands) {
				karma += newValue;
				console.warn("Tried to set karma through dialogue. Incrementing by the value instead.");
			}
		} else if (string === "toldTruth") {
			if (runCommands) {
				npcVariables.toldTruth = newValue;
			}
		} else if (string === "enteredVillage") {
			if (runCommands) {
				npcVariables.enteredVillage = newValue;
			}
		} else if (string === "expectedCaravan") {
			if (runCommands) {
				npcVariables.expectedCaravan = newValue;
			}
		} else if (string === "naiaPartnered") {
			if (runCommands) {
				npcVariables.naiaPartnered = newValue;
			}
		} else if (string === "naiasCharm") {
			if (runCommands) {
				//global variable.
				naiasCharm = true;
			}
		} else {
			newValue = undefined;
			console.warn("Error: tried to set condition of variable \"" + string + "\" with value \"" + newValue + "\" from file \"" + dialogueParser.textFile + "\". Maybe you mispelled it? Check dialogueParser.js's setCondition function.");
		}

		return newValue;
	}

	dialogueParser.parseConditions = function (string) {
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

		//console.log("PARSING CONDITIONS... " + string);

		//determine conditions and condition states.
		for (var i = 0; i < string.length; i++) {

			if (i == string.length - 1) {
				endOffset = 1;
			} else {
				endOffset = 0;
			}

			if (string.charAt(i) === " " || endOffset) {
				spaceNum++;
				//is this the space before the conjunction? Or perhaps we are dealing with a single argument with no conjunctions?
				if (spaceNum % 2 == 1 || (endOffset && spaceNum == 0)) {
					conditionsText.push(string.substring(startingIndex, i + endOffset));

					var state;
					if (or) {
						state = 2;
					} else {
						state = 1;
					}

					if (isNot) {
						state *= -1;
					}

					conditionsState.push(state);

					or = false;
					isNot = false;
				} else if (spaceNum % 2 == 0) {
					startingIndex = i + 1;
				}
			} else if (string.charAt(i) === "!") {
				isNot = true;
				startingIndex = i + 1;
			} else if (string.charAt(i) === "&") {
				andNum++;
				//is this the first character in the conjunction?
				if (andNum % 2 == 1) {
					or = false;
				}
			} else if (string.charAt(i) === "|") {
				orNum++;
				//is this the first character in the conjunction?
				if (orNum % 2 == 1) {
					or = true;
				}
			}
		}

		for (var i = 0; i < conditionsText.length; i++) {
			//console.log("CTEXT: |" + conditionsText[i] + "|");
			//console.log("CSTATE: |" + conditionsState[i] + "|");

			var conditionResult = dialogueParser.checkCondition(conditionsText[i]);
			if (conditionResult !== undefined) {
				var state = conditionsState[i];
				if (state < 0) {
					conditionResult = !conditionResult;
				}
				if (conditionResult && Math.abs(state) == 2) {
					orResult = true;
				} else if (!conditionResult && Math.abs(state) == 1) {
					andResult = false;
				}
			}
		}

		//console.log("CONDITION RESULT: " + (andResult || orResult) + " From and: " + andResult + ", From or: " + orResult);

		return andResult || orResult;
	}

	dialogueParser.parseSetup = function () {

		//remove spaces
		var c = 0;
		while (c < dialogueParser.text.length) {
			var j = 0;

			while (true) {
				if (j == dialogueParser.text.length || (dialogueParser.text[c].substring(j, j + 1) != "" && dialogueParser.text[c].substring(j, j + 1) != " " && dialogueParser.text[c].substring(j, j + 1) != "	")) {
					//console.log("|"+dialogueParser.text[c].substring(j,j+1)+"| is not a space or TAB");
					dialogueParser.text[c] = dialogueParser.text[c].substring(j, dialogueParser.text[c].length);
					//console.log("Spaces removal ended: |"+dialogueParser.text[c]+"|");
					break;
				} else {
					//console.log("Space found: |" + dialogueParser.text[c].substring(j, j + 1) + "|");
				}
				j++;
			}
			c++;
		}

		//find starting index for relavent text.
		dialogueParser.relaventStartingIndex = -1;
		var c = 0;
		while (c < dialogueParser.text.length) {


			//console.log(dialogueParser.text[c].substring(0,2));
			if (dialogueParser.text[c].substring(0, 3) === "if(") {
				//console.log("IF AT LINE: " + c + " Line: " + dialogueParser.text[c]);
				if (dialogueParser.parseConditions(dialogueParser.text[c].substring(3, dialogueParser.text[c].length - 1))) {
					//console.log("this is the starting index.");
					dialogueParser.relaventStartingIndex = c;
					break;
				}
			} else if (dialogueParser.text[c].substring(0, 8) === "else if(") {
				//console.log("ELSE IF AT LINE: " + c + " Line: " + dialogueParser.text[c]);
				if (dialogueParser.parseConditions(dialogueParser.text[c].substring(8, dialogueParser.text[c].length - 1))) {
					//console.log("this is the starting index.");
					dialogueParser.relaventStartingIndex = c;
					break;
				}
			} else if (dialogueParser.text[c] === "else") {
				//console.log("ELSE found: " + c);
				//console.log("this is the starting index.");
				dialogueParser.relaventStartingIndex = c;
				break;
			}

			c++;
		}

		//find numbered dialogue points' indexes.
		var highestNumber = 0;
		var c = dialogueParser.relaventStartingIndex + 1;
		while (true) {
			if (c == dialogueParser.text.length) {
				//console.log("Hit end of dialogue.");
				break;
			}

			var testString = "";

			//search for initial number to put into testString.
			//what if the numbers are several digits long? i.e. 12?
			if (!isNaN(dialogueParser.text[c].substring(0, 1))) {
				var j = 0;
				var char;

				while (true) {
					if (j >= dialogueParser.text[c].length) {
						testString = dialogueParser.text[c];
						break;
					}
					char = dialogueParser.text[c].charAt(j);
					if (char === ".") {
						testString = dialogueParser.text[c].substring(0, j);
						break;
					}
					j++;
				}
			} else {
				testString = dialogueParser.text[c].substring(0, 1);
			}

			//console.log("Trying to insert: "+dialogueParser.text[c]+" into relaventDialogue.");

			if (testString != "") {
				if (isNaN(testString)) {
					dialogueParser.relaventDialogue.push(dialogueParser.text[c]);
					//console.log("Not a number. Probably an option. Pushed.");
				} else if (!isNaN(testString) && Number(testString) === highestNumber + 1) {
					dialogueParser.relaventDialogue.push(dialogueParser.text[c]);
					highestNumber = Number(testString);
					//console.log("A number! highestNumber incremented to " + highestNumber + ". Pushed.");
				} else {
					//console.warn("ERROR: hit unexpected dialogue tree number. Expected \"" + (highestNumber + 1) + "\" + " + !isNaN(testString) + ", got \"" + Number(testString) + "\". Check the syntax for file \"" + dialogueParser.textFile + "\" at line " + (c + 1) + ": \"" + dialogueParser.text[c] + "\".");
					break;
				}
			} else {
				if (dialogueParser.text[c].substring(0, 4) === "else") {
					//console.log("Breaking from an else or else if.");
					break;
				}
			}
			c++;
		}

		//for (var i = 0; i < dialogueParser.relaventDialogue.length; i++) {
		//	console.log("Relevent Dialogue index "+i+": "+dialogueParser.relaventDialogue[i]);
		//}

		//we're finally ready!!!
		dialogueParser.ready = true;

		//just add a parameter to either allow commands or not.
		//console.log("Final line 1: "+dialogueParser.parseLine("6.	“Even so, it would be irresponsible to go it alone. I will stay back and let you go at your own pace, but I insist on coming along, just in case something goes badly.” (naiaPartnered = false) (Return to 214) (End)"));
		//console.log("Final line 2: "+dialogueParser.parseLine("a.	“If you must know, I’m searching for the Verdant Ember.” (Go to 2)"));
		//console.log("Final line 3: "+dialogueParser.parseLine("a.	“Actually, I lied about the caravan.” (If karma > 2, go to 2; else if karma == naiaPartnered, go to 5; else go to 3)"));
	}

	dialogueParser.prepareNextTextObject = function () {
		//console.log("Preparing Next Text Object.");


		if (dialogueParser.ready) {
			//console.log("Parser is ready... continuing.");
			var textObject;

			//first lets see if there's anything in the textbox for us.
			var textboxRelavant = false;
			var lastNumber = 0;
			if (textBox === undefined) {
				console.error("Textbox instance \"textBox\" has not been created. Did you misspell, or not place it in main?");
			}
			var textboxOutput = textBox.selectedOption;

			var c = 0;
			while (true) {
				if (c >= dialogueParser.relaventDialogue.length) {
					break;
					//console.log("Unique break: reached end of text.");
				}

				if (textboxOutput == dialogueParser.relaventDialogue[c]) {
					textboxRelavant = true;
					//console.log("Textbox is found relavant at: " + dialogueParser.relaventDialogue[c]);
					break;
				}

				c++;
			}

			//console.log("Textbox is relavant?: " + textboxRelavant);

			if (textboxRelavant) {
				dialogueParser.parseLine(textboxOutput, true);
			} else {
				//assume we're starting the tree over.
				dialogueParser.goTo = 1;
			}



			//use commands.
			//I wrote this weird, so don't use an else.
			if (dialogueParser.goTo == null && dialogueParser.returnTo == null) {
				dialogueParser.end = true;
				return null;
			}

			var currentIndex; // for options
			var displayText;
			var outputText;

			//find the line that starts with goTo's number and set textObject.
			if (dialogueParser.goTo != null) {
				var c = 0;
				while (true) {
					if (c >= dialogueParser.relaventDialogue.length) {
						break;
						//console.log("Unique break: reached end of text.");
					}

					if (!isNaN(dialogueParser.relaventDialogue[c].substring(0, 1))) {
						var j = 0;
						var char;

						while (true) {
							if (j >= dialogueParser.relaventDialogue[c].length) {
								testString = dialogueParser.relaventDialogue[c];
								break;
							}
							char = dialogueParser.relaventDialogue[c].charAt(j);
							if (char === ".") {
								testString = dialogueParser.relaventDialogue[c].substring(0, j);
								break;
							}
							j++;
						}
					} else {
						testString = dialogueParser.relaventDialogue[c].substring(0, 1);
					}

					//console.log("TESTSTRING: " + testString);
					if (testString != "" && !isNaN(testString) && Number(testString) == dialogueParser.goTo) {
						//console.log("CurrentIndex set to: " + c + " for line: " + dialogueParser.relaventDialogue[c]);
						currentIndex = c;
						break;
					}

					c++;
				}



				if (currentIndex === undefined) {
					console.warn("ERROR: GO TO UNDEFINED! DID NOT FIND TEXT LINE MARKED WITH NUMBER \"" + dialogueParser.goTo + "\"!!!");
				}
				//console.log("GONE TO LINE: " + dialogueParser.relaventDialogue[currentIndex]);

				//we might find a returnTo here.
				displayText = dialogueParser.parseLine(dialogueParser.relaventDialogue[currentIndex], false);
				outputText = dialogueParser.relaventDialogue[currentIndex];

				//if we had a returnTo.
				if (dialogueParser.returnTo != null) {
					var newIndex;
					var c = 0;
					while (true) {
						if (c >= dialogueParser.relaventDialogue.length) {
							break;
							//console.log("Unique break: reached end of text.");
						}

						if (!isNaN(dialogueParser.relaventDialogue[c].substring(0, 1))) {
							var j = 0;
							var char;

							while (true) {
								if (j >= dialogueParser.relaventDialogue[c].length) {
									testString = dialogueParser.relaventDialogue[c];
									break;
								}
								char = dialogueParser.relaventDialogue[c].charAt(j);
								if (char === ".") {
									testString = dialogueParser.relaventDialogue[c].substring(0, j);
									break;
								}
								j++;
							}
						} else {
							testString = dialogueParser.relaventDialogue[c].substring(0, 1);
						}

						//console.log("TESTSTRING: " + testString);
						if (testString != "" && !isNaN(testString) && Number(testString) == dialogueParser.returnTo) {
							//console.log("CurrentIndex set to: " + c + " for line: " + dialogueParser.relaventDialogue[c]);
							newIndex = c;
							break;
						}

						c++;
					}
					if (newIndex === undefined) {
						console.warn("ERROR: GO TO UNDEFINED! DID NOT FIND TEXT LINE MARKED WITH NUMBER \"" + dialogueParser.returnTo + "\"!!!");
					}
					//console.log("RETURNED TO LINE: " + dialogueParser.relaventDialogue[newIndex]);

					displayText = dialogueParser.parseLine(dialogueParser.relaventDialogue[currentIndex], false);
					outputText = dialogueParser.relaventDialogue[currentIndex];

					currentIndex = newIndex;

					dialogueParser.returnTo = null;
				}

				textObject = TextObject(outputText, displayText);
				//currentIndex = dialogueParser.goTo-1;
				dialogueParser.goTo = null;
			}




			//add options (if the first character isn't a number)
			var c = currentIndex + 1;
			while (true) {
				if (c >= dialogueParser.relaventDialogue.length) {
					break;
				}
				//console.log("Looking at \"" + dialogueParser.relaventDialogue[c] + "\" for options.");
				if (!isNaN(dialogueParser.relaventDialogue[c].substring(0, 1))) {
					break;
				}
				textObject.addOption(dialogueParser.relaventDialogue[c], dialogueParser.parseLine(dialogueParser.relaventDialogue[c], false));
				//console.log("Option added.");
				c++;
			}


			return textObject;
		}

		console.warn("Dialogue Parser could not prepare next text object, as it was not in ready state yet. I.E. the text had not been loaded and/or parsed yet.");
		return null;
	}

	dialogueParser.initialize = function () {
		dialogueParser.textFile = textFile;
		dialogueParser.master = master;
		dialogueParser.ready = false;
		dialogueParser.goTo = null;
		dialogueParser.returnTo = null;
		dialogueParser.end = false;
		fileReader.legacy.requestFile(dialogueParser.textFile, dialogueParser.assignText);
	}();

	return dialogueParser;
}