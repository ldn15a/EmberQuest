/*
    Each key can only be in one of four different states at one time. The four different states in order of how they are assigned goes as follows:
    
    "up"
    "pressed"
    "down"
    "released"
    
    It should be noted that "up" is assigned after release if no press is detected, if a press is detected while a key is assigned a value of "released" then it will get the value of "pressed"
    
    It should also be noted that a key will hold the value "down" for the duration at which a key a held down, except for the first frame where it will have a value of "pressed"
    
    Lastly, if a key is pressed for exactly one frame (impressive) then the value of the key after "pressed" will be "down"
*/

function Input () {
    var input = {};
    
    //  make a private scope (technically still accessible outside object but discouraged)
    input.private = {};
    input.debug = {};

    // GLOBAL RULE: "keyCode" is the keyboard key where just "key" is a map key
    
    input.private.keysMap = new Map();

    //  The keyCodes inputted for this frame
    input.private.frameInputKeys = [];

    //  Debugging variables
    input.private.printInputs = false;
    input.private.printMap = false;
    input.private.printReturns = false;
   
    input.record = function (keyCode) {
        input.private.frameInputKeys.push (keyCode);
    }

    input.decayStatusNotPressed = function (value, key, refMap) {
        if (input.private.frameInputKeys.indexOf (key) == -1) {
            var newKeyValue = "up";

            // key in map was not pressed this frame
            if (value == "pressed" || value == "down") {
                newKeyValue = "released";
            }
            else if (value == "released") {
                newKeyValue = "up"
            }

            refMap.set (key, newKeyValue);
        }
    }

    input.update = function () {
        var printKeyValuePair = function (value, key) {
            console.debug ("key: " + key + "          value: " + value);
        }

        if (input.private.printInputs) {
            console.debug ("Keys input this frame: " + input.frameInputKeys);
        }

        if (input.private.printMap) {
            console.debug ("----- Map Output Start -----");
            console.debug ("----- Before Map Updated For Frame -----");

            input.private.keysMap.forEach (printKeyValuePair ());
        }
        
        for (var i = 0; i < input.private.frameInputKeys.length; i++) {
            if (input.private.keysMap.has(input.private.frameInputKeys[i])) {
                // updating the current state of the key that has been pressed this frame

                var keyValue = input.private.keysMap.get(input.private.frameInputKeys[i]);
                var newKeyValue = keyValue;

                if (keyValue == "up" || keyValue == "released") {
                    newKeyValue == "pressed";
                }
                else if (keyValue == "pressed") {
                    newKeyValue == "down";
                }

                input.private.keysMap.set(input.private.frameInputKeys[i], newKeyValue);
            }
            else {
                // putting a new key/value pair into the map
                input.private.keysMap.set(input.private.frameInputKeys[i], "pressed");
            }
        }

        input.private.keysMap.forEach(input.decayStatusNotPressed);

        if (input.private.printMap) {
            console.debug ("----- After Map Updated For Frame -----");
         
            input.private.keysMap.forEach (printKeyValuePair ());
            console.debug ("----- Map Output End -----");
        }


        //  clearing the array of keys inputted this frame for next frame (all processing of array must be done by this point)
        input.private.frameInputKeys = [];
    }

    input.getKeyStatus = function (keyCode) {
        if (input.private.keysMap.has (keyCode)) {
            if (input.private.printReturns) {
                console.debug ("getKeyStatus(" + keyCode + ") returned " + input.private.keysMap.get (keyCode));
            }
            return input.private.keysMap.get (keyCode);
        }
        else {
            if (input.private.printReturns) {
                console.debug ("getKeyStatus(" + keyCode + ") returned " + input.private.keysMap.get (keyCode));
            }
            console.warn ("\"getKeyStatus (" + keyCode + ")\" was just called but no value has been assigned to " + keyCode + ", so \"up\" was used as a default. Please let Lucas know of this occurrence.");
            return "up";
        }
    }

    input.getKeyHardwareStatus = function (keyCode) {
        if (input.private.keysMap.has (keyCode)) {
            var keyCodeValue = input.private.keysMap.get (keyCode)
            if (keyCodeValue == "released" || keyCodeValue == "up") {
                if (input.private.printReturns) {
                    console.debug ("getKeyHardwareStatus(" + keyCode + ") returned false");
                }
                return false;
            }
            if (input.private.printReturns) {
                console.debug ("getKeyHardwareStatus(" + keyCode + ") returned true");
            }
            return true;
        }
        else {
            if (input.private.printReturns) {
                console.debug ("getKeyHardwareStatus(" + keyCode + ") returned false");
            }
            console.warn ("\"getKeyHardwareStatus (" + keyCode + ")\" was just called but no value has been assigned to " + keyCode + ", so \"false\" was used as a default. Please let Lucas know of this occurrence.");
            return false;
        }
    }

    input.render = function () {
        console.warn ("The Input object does not need to be called for rendering. Please remove Input from the render loop in \"renders\" function.");
    }

    input.debug.togglePrintInputsRecordedOnUpdate = function () {
        input.private.printInputs = !input.private.printInputs;
    }

    input.debug.togglePrintMapOnUpdate = function () {
        input.private.printMap = !input.private.printMap;
    }

    input.debug.togglePrintingOfAllReturns = function () {
        input.private.printReturns = !input.private.printReturns;
    }

    return input;
}