//it'd be really great if we could overload this, I don't know how. Because sometimes you don't want to pass in optionsArray.
function TextObject (fullString, displayString) {
    var textObject = {};

    textObject.fullString;
    textObject.displayString;
    textObject.hasOptions;
    textObject.optionsFull = [];
    textObject.optionsDisplay = [];

    //add string to array
    textObject.addOption = function(fullString,displayString){
        textObject.optionsFull.push(fullString);
        textObject.optionsDisplay.push(displayString);
        if(!textObject.hasOptions){
            textObject.hasOptions = true;
        }
    }

    //remove string from array
    textObject.removeOption = function(string){

        //find that sucker and mess him up
        var c = 0;
        while(c < textObject.optionsFull.length){
            if(textObject.optionsFull[c] == string || textObject.optionsDisplay[c] == string){
                textObject.optionsFull.splice(c,1);
                textObject.optionsDisplay.splice(c,1);
                break;
            }
            c++;
        }

        //if there's no options, convert to a normal string.
        if(textObject.optionsFull.length == 0){
            textObject.hasOptions = false;
        }
    }

    textObject.initialize = function () {
        textObject.fullString = fullString;
        textObject.displayString = displayString;
        textObject.hasOptions = false;
    }();

    return textObject;
}