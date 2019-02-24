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


//  controls is an array of single characters that are the keys used as controls for the game
function Input (controls) {
    var input = {};
    
    //  make a private scope (technically still accessible outside object but discouraged)
    input.private = {};
    input.debug = {};

    // GLOBAL RULE: "keyCode" is the keyboard key where just "key" is a map key
    
    input.private.keysMap = new Map();

    //  The keyCodes inputted for this frame
    input.private.frameInputKeys = [];

    //  Debugging variables
    input.debug.printReturnsFrequency = 0;
    input.debug.printMapFrequency = 0;
    input.debug.printRecordsFrequency = 0;
   
    input.record = function (event) {
        input.private.frameInputKeys.push (event.key);
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

        if (input.debug.printRecordsFrequency != 0 && frame % input.debug.printRecordsFrequency == 0) {
            console.debug ("Keys recorded this frame: " + input.frameInputKeys);
        }

        if (input.debug.printMapFrequency != 0 && frame % input.debug.printMapFrequency == 0) {
            console.debug ("----- Map Output Start -----");
            console.debug ("----- Before Map Updated For Frame -----");

            input.private.keysMap.forEach (printKeyValuePair);
        }
        
        for (var i = 0; i < input.private.frameInputKeys.length; i++) {
            if (input.private.keysMap.has(input.private.frameInputKeys[i])) {
                // updating the current state of the key that has been pressed this frame

                var keyValue = input.private.keysMap.get(input.private.frameInputKeys[i]);
                var newKeyValue = keyValue;

                if (keyValue == "up" || keyValue == "released") {
                    newKeyValue = "pressed";
                }
                else if (keyValue == "pressed" || keyValue == "down") {
                    newKeyValue = "down";
                }

                input.private.keysMap.set(input.private.frameInputKeys[i], newKeyValue);
            }
            else {
                // putting a new key/value pair into the map
                input.private.keysMap.set(input.private.frameInputKeys[i], "pressed");
            }
        }

        input.private.keysMap.forEach(input.decayStatusNotPressed);

        if (input.debug.printMapFrequency != 0 && frame % input.debug.printMapFrequency == 0) {
            console.debug ("----- After Map Updated For Frame -----");
        
            input.private.keysMap.forEach (printKeyValuePair);
            console.debug ("----- Map Output End -----\n\n");
        }


        //  clearing the array of keys inputted this frame for next frame (all processing of array must be done by this point)
        input.private.frameInputKeys = [];
    }

    input.getKeyStatus = function (keyName) {
        var keyCode;
        if (keyName != "" && keyName != undefined) {
            keyCode = keyName;
        }
        else {
            keyCode = -1;
        }

        if (input.private.keysMap.has (keyCode)) {
            if (input.debug.printReturnsFrequency != 0 && frame % input.debug.printReturnsFrequency == 0) {
                console.debug ("getKeyStatus(" + keyName + ") returned " + input.private.keysMap.get (keyCode));
            }

            return input.private.keysMap.get (keyCode);
        }
        else {
            if (input.debug.printReturnsFrequency != 0 && frame % input.debug.printReturnsFrequency == 0) {
                console.debug ("getKeyStatus(" + keyName + ") returned " + input.private.keysMap.get (keyName));
            }

            console.warn ("\"getKeyStatus (" + keyName + ")\" was just called but no value has been assigned to " + keyName + ", so \"up\" was used as a default. Please let Lucas know of this occurrence.");
            return "up";
        }
    }

    input.getKeyHardwareStatus = function (keyName) {
        var keyCode;
        if (keyName != "" && keyName != undefined) {
            keyCode = keyName;
        }
        else {
            keyCode = -1;
        }

        if (input.private.keysMap.has (keyCode)) {
            var keyCodeValue = input.private.keysMap.get (keyCode)
            if (keyCodeValue == "released" || keyCodeValue == "up") {
                if (input.debug.printReturnsFrequency != 0 && frame % input.debug.printReturnsFrequency == 0) {
                    console.debug ("getKeyHardwareStatus(" + keyName + ") returned false");
                }

                return false;
            }
            if (input.debug.printReturnsFrequency != 0 && frame % input.debug.printReturnsFrequency == 0) {
                console.debug ("getKeyHardwareStatus(" + keyName + ") returned true");
            }

            return true;
        }
        else {
            if (input.debug.printReturnsFrequency != 0 && frame % input.debug.printReturnsFrequency == 0) {
                console.debug ("getKeyHardwareStatus(" + keyCode + ") returned false");
            }

            console.warn ("\"getKeyHardwareStatus (" + keyCode + ")\" was just called but no value has been assigned to " + keyCode + ", so \"false\" was used as a default. Please let Lucas know of this occurrence.");
            return false;
        }
    }

    input.debug.getPrintRecordsFrequency = function () {
        return input.debug.printRecordsFrequency;
    }

    input.debug.getPrintMapFrequency = function () {
        return input.debug.printMapFrequency;
    }

    input.debug.getPrintReturnsFrequency = function () {
        return input.debug.printReturnsFrequency;
    }

    input.debug.setPrintRecordsFrequency = function (newFrequency) {
        var newFrequencyValue = FPS / newFrequency;
        input.debug.printRecordsFrequency = newFrequencyValue;
    }
    

    input.debug.setPrintMapFrequency = function (newFrequency) {
        var newFrequencyValue = FPS / newFrequency;
        input.debug.printMapFrequency = newFrequencyValue;
    }

    input.debug.setPrintReturnsFrequency = function (newFrequency) {
        var newFrequencyValue = FPS / newFrequency;
        input.debug.printReturnsFrequency = newFrequencyValue;
    }

    input.initialize = function (controls) {
        if (controls.length == 0) {
            console.warn ("No controls were specified for Input initialize function. This could cause spamming of warnings in console if getKeyStatus or getKeyHardwareStatus are called.")
        }
        else {
            for (var i = 0; i < controls.length; i++) {
                controls[i] = controls[i].toLowerCase ();
                input.private.keysMap.set (controls[i], "up");
            }
        }

    }

    input.initialize (controls);

    return input;
}