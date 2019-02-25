/*
    Each key can only be in one of four different states at one time. The four different states in order of how they are assigned goes as follows:
    
    "up"
    "pressed"
    "down"
    "released"
    
    It should be noted that "up" is assigned after release if no press is detected, if a press is detected while a key is assigned a value of "released" then it will get the value of "pressed"
    A key will hold the value "down" for the duration at which a key a held down, except for the first frame where it will have a value of "pressed"
    The status of "released" is held for the number of frames specified by holdReleasedForFrames parameter for the Input constructor
    Lastly, if a key is pressed for exactly one frame (impressive) then the value of the key after "pressed" will be "released"
*/


/*
    controls is an array of single characters that are the keys used as controls for the game
    holdReleasedForFrames is an integer that is the number of frames that a key will have a status of "released" after being unpressed
*/

function Input (controls, holdReleasedForFrames) {
    var input = {};
    
    //  make a private scope (technically still accessible outside object but discouraged)
    input.private = {};
    input.debug = {};

    input.releaseWindow;

    // GLOBAL RULE: "keyCode" is the keyboard key where just "key" is a map key
    input.private.keysMap = new Map();
    input.private.keysReleased = [];

    //  Debugging variables
    input.debug.printReturnsFrequency = 0;
    input.debug.printMapFrequency = 0;

    input.update = function () {
        for (var i = 0; i < input.private.keysReleased.length; i++) {
            if (input.private.keysReleased[i].framesUntilUp <= 0) {
                input.private.keysMap.set (input.private.keysReleased[i].key, "up");
                input.private.keysReleased.splice (i);
            }
            else {
                input.private.keysReleased[i].framesUntilUp --;
            }
        }
    }

    input.keyEvent = function (event) {
        var eventType = event.type;
        var key = event.key;
        var currentValue = input.private.keysMap.get (key);

        if (currentValue == "pressed" || currentValue == "down") {
            if (eventType == "keydown") {
                input.private.keysMap.set (key, "down");
            }
            else if (eventType == "keyup") {
                input.private.keysMap.set (key, "released");
                var keyObj = {};
                keyObj.key = key;
                keyObj.framesUntilUp = input.releaseWindow;
                input.private.keysReleased.push (keyObj);
            }
        }
        else if (currentValue == "up" || currentValue == "released") {
            if (eventType == "keydown") {
                input.private.keysMap.set (key, "pressed");
            }
            else if (eventType == "keyup") {
                input.private.keysMap.set (key, "up");
            }
        }

        if (input.debug.printMapFrequency != 0 && frame % input.debug.printMapFrequency == 0) {
            var printKeyValuePair = function (value, key) {
                console.debug ("key: " + key + "          value: " + value);
            }
            
            console.debug ("----- Map Output Start -----");
            input.private.keysMap.forEach (printKeyValuePair);
            console.debug ("----- Map Output End -----\n\n");
        }
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

    input.debug.getPrintMapFrequency = function () {
        return input.debug.printMapFrequency;
    }

    input.debug.getPrintReturnsFrequency = function () {
        return input.debug.printReturnsFrequency;
    }

    input.debug.setPrintMapFrequency = function (newFrequency) {
        var newFrequencyValue = FPS / newFrequency;
        input.debug.printMapFrequency = newFrequencyValue;
    }

    input.debug.setPrintReturnsFrequency = function (newFrequency) {
        var newFrequencyValue = FPS / newFrequency;
        input.debug.printReturnsFrequency = newFrequencyValue;
    }

    input.initialize = function () {
        if (controls.length == 0) {
            console.warn ("No controls were specified for Input initialize function. This could cause spamming of warnings in console if getKeyStatus or getKeyHardwareStatus are called.")
        }
        else {
            for (var i = 0; i < controls.length; i++) {
                controls[i] = controls[i].toLowerCase ();
                input.private.keysMap.set (controls[i], "up");
            }
        }

        input.releaseWindow = holdReleasedForFrames;

    }

    input.initialize ();

    return input;
}