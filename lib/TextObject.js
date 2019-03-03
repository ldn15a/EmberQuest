//it'd be really great if we could overload this, I don't know how. Because sometimes you don't want to pass in optionsArray.
function TextObject (string) {
    var textObject = {};

    textObject.string;
    textObject.hasOptions;
    textObject.options = [];

    //add string to array
    textObject.addOption = function(string){
        textObject.options[textObject.options.length] = string;
        if(!textObject.hasOptions){
            textObject.hasOptions = true;
        }
    }

    //remove string from array
    textObject.removeOption = function(string){

        //find that sucker and mess him up
        var c = 0;
        while(c < textObject.options.length){
            if(textObject.options[c] == string){
                textObject.options.splice(c,1);
                break;
            }
            c++;
        }

        //if there's no options, convert to a normal string.
        if(textObject.options.length == 0){
            textObject.hasOptions = false;
        }
    }

    textObject.initialize = function () {
        textObject.string = string;
        textObject.hasOptions = false;
    }();

    return textObject;
}