function MainMenu () {
	var mm = {};
	mm.private = {};
	
	mm.private.selectedEntry;	//	0 = start game		1 = Quit
	mm.private.actions;
    mm.private.isShowing;

    mm.private.backgroundCharacter;
    mm.private.selector;

	mm.show = function () {
		mm.private.isShowing = true;
	}

	mm.update = function () {
		if (keyboard.getKeyStatus ("s") == "pressed") {
			mm.private.selectedEntry = 1;
		}
		else if (keyboard.getKeyStatus ("w") == "pressed") {
			mm.private.selectedEntry = 0;
		}

		if (keyboard.getKeyStatus ("e") == "pressed") {
			mm.private.actions [mm.private.selectedEntry] ();
        }
        else {
            //	Start game is selected
            if (mm.private.selectedEntry == 0) {
                mm.private.selector.graphic.position.set (415, 480);
            }
            //  Quit is selected
            else if (mm.private.selectedEntry == 1) {
                mm.private.selector.graphic.position.set (415, 575);
            }
        }
	}

	mm.private.quitGame = function () {
        audio.stop ("mainMenuBackground");
		window.close ();
	}

	mm.private.startGame = function () {
        mm.private.backgroundCharacter.unload ();
        mm.private.selector.unload ();

        mm.private.isShowing = false;

        audio.stop ("mainMenuBackground");
		areaController.loadArea ("bossRoom");
        state = play;
	}

	mm.resetMainMenu = function () {
        audio.stopAll ();

		mm.private.isShowing = true;
        mm.private.selectedEntry = 0;
        
		mm.private.selector = Character (415, 480, mainMenuSelector);
	}

	mm.private.initialize = function () {
		mm.private.isShowing = false;
		mm.private.actions = [mm.private.startGame, mm.private.quitGame];
        mm.private.selectedEntry = 0;

        mm.private.backgroundCharacter = Character(0, 0, mainMenuBackground);

        mm.private.selector = Character (415, 480, mainMenuSelector);
        
        audio.play ("mainMenuBackground");

	} ();

	return mm;
}