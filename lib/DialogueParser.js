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

    dialogueParser.checkCondition = function(string){
        var val = false;
        if(string === "toldTruth"){
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
    }

    dialogueParser.initialize = function () {
        dialogueParser.textFile = textFile;
        dialogueParser.ready = false;
        fileReader.requestFile (dialogueParser.textFile, dialogueParser.assignText);
    }();

    return dialogueParser;
}