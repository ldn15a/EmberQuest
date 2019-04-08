var AudioController = function () {
    var ac = {};
    ac.private = {};

    ac.private.audioElementsContainer;
    ac.private.soundtracks;
    ac.private.soundeffects;

    ac.private.getAudioElement = function (soundId) {
        if (ac.private.soundeffects.has (soundId)) {
            for (var [audioId, audioElement] of ac.private.soundeffects) {
                if (audioId == soundId) {
                    return ["effect", audioElement];
                }
            }
        }
        else if (ac.private.soundtracks.has (soundId)) {
            for (var [audioId, audioElement] of ac.private.soundtracks) {
                if (audioId == soundId) {
                    return ["track", audioElement];
                }
            }
        }
        else {
            console.warn ("Requested audio element with id " + soundId + " which was not found in audioController. Warning Code: 1");
            return [null, null];
        }
    }
    

    //  pause audio and reset time in audio to zero
    ac.stop = function (soundId) {
        var soundElem = ac.private.getAudioElement (soundId) [1];
        if (soundElem != null) {
            soundElem.currentTime = 0;
            soundElem.pause ();
        }
    }


    // pause audio and keep current position in audio file
    ac.pause = function (soundId) {
        var soundElem = ac.private.getAudioElement (soundId) [1];
        if (soundElem != null) {
            soundElem.pause ();
        }
    }


    // Plays audio file if the file isn't currently playing
    ac.play = function (soundId) {
        var audioType_Element = ac.private.getAudioElement (soundId);
        
        if (audioType_Element [0] == "effect") {
            audioType_Element [1].loop = false;
            audioType_Element [1].play ();
        }
        else if (audioType_Element [0] == "track") {
            audioType_Element [1].loop = true;
            audioType_Element [1].play ();
        }
        else {
            console.error ("Failed to play audio with id " + soundId + ". Error code 1");
        }
    }

    //  Plays audio file from start no matter what
    ac.forcePlay = function (soundId) {
        var audioType_Element = ac.private.getAudioElement (soundId);
        
        if (audioType_Element [0] == "effect") {
            audioType_Element [1].loop = false;
            audioType_Element [1].currentTime  = 0;
            audioType_Element [1].play ();
        }
        else if (audioType_Element [0] == "track") {
            audioType_Element [1].loop = true;
            audioType_Element [1].currentTime  = 0;
            audioType_Element [1].play ();
        }
        else {
            console.log (audioType_Element [0]);
            console.error ("Failed to play audio with id " + soundId + ". Error code 2");
        }
    }

    ac.private.initialize = function () {
        ac.private.audioElementsContainer = document.getElementById ("audioFiles");

        ac.private.soundtracks = new Map ();
        ac.private.soundeffects = new Map ();

        for (var i = 0; i < ac.private.audioElementsContainer.children.length; i++) {
            var childElement = ac.private.audioElementsContainer.children[i];

            if (childElement.className == "soundeffect") {
                ac.private.soundeffects.set (childElement.id, childElement);
            }
            else if (childElement.className == "soundtrack") {
                ac.private.soundtracks.set (childElement.id, childElement);
            }
            else {
                console.error ("ERROR: audioController found child that has no class or an incorrect class. Error code: 3\nElement:\n" + childElement);
            }
        }
    }();

    return ac;
}