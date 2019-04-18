function MainMenu () {
	var mm = {};
	mm.private = {};
	
	mm.private.selectedEntry;	//	0 = start game		1 = Quit
	mm.private.actions;
	mm.private.isShowing;

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

		if (keyboard.getKeyStatus ("enter") == "pressed") {
			mm.private.actions [mm.private.selectedEntry] ();
		}
	}

	mm.private.quitGame = function () {
		//	Quit game
	}

	mm.private.startGame = function () {
		// Start game
	}

	mm.private.initialize = function () {
		mm.private.isShowing = false;
		mm.private.actions = [mm.private.startGame, mm.private.quitGame];
		mm.private.selectedEntry = 0;
	} ();
}