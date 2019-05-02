function MainMenu () {
	var mm = {};
	mm.private = {};
	
	mm.private.selectedEntry;	//	0 = start game		1 = Quit
	mm.private.actions;
    mm.private.isShowing;

    mm.private.background;
    mm.private.selectionRect;

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

		//	Start game is selected
		if (mm.private.selectedEntry == 0) {
			mm.private.selectionRect.position.set (100, 400);
        }
        //  Quit is selected
		else if (mm.private.selectedEntry == 1) {
			mm.private.selectionRect.position.set (100, 550);
		}
	}

	mm.private.quitGame = function () {
		window.close ();
	}

	mm.private.startGame = function () {
		removeChildFromStage (mm.private.selectionRect);
		areaController.loadArea ("debugArea");
		state = play;
	}

	mm.resetMainMenu = function () {
		mm.private.isShowing = true;
		mm.private.selectedEntry = 0;

		mm.private.selectionRect = new PIXI.Graphics();
		mm.private.selectionRect.position.set(100, 300);
		mm.private.selectionRect.beginFill(0xAA0000);
		mm.private.selectionRect.drawRect(0, 0, 350, 75);
		mm.private.selectionRect.endFill();
		addChildToStage(mm.private.selectionRect);
	}

	mm.private.initialize = function () {
		mm.private.isShowing = false;
		mm.private.actions = [mm.private.startGame, mm.private.quitGame];
		mm.private.selectedEntry = 0;

		mm.private.selectionRect = new PIXI.Graphics();
		mm.private.selectionRect.position.set(100, 400);
		mm.private.selectionRect.beginFill(0xAA0000);
		mm.private.selectionRect.drawRect(0, 0, 350, 75);
		mm.private.selectionRect.endFill();
		addChildToStage(mm.private.selectionRect);
	} ();

	return mm;
}