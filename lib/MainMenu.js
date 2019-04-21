function MainMenu () {
	var mm = {};
	mm.private = {};
	
	mm.private.selectedEntry;	//	0 = start game		1 = Quit
	mm.private.actions;
	mm.private.isShowing;

	//	Remove these once proper main menu is made
	mm.private.selectionRectPlay;
	mm.private.selectionRectQuit;

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
			mm.private.selectionRectPlay.position.set (0, 0);
			mm.private.selectionRectQuit.position.set (app.view.width, app.view.height);
		}
		else if (mm.private.selectedEntry == 1) {
			mm.private.selectionRectQuit.position.set (0, 0);
			mm.private.selectionRectPlay.position.set (app.view.width, app.view.height);
		}
	}

	mm.private.quitGame = function () {
		window.close ();
	}

	mm.private.startGame = function () {
		removeChildFromStage (mm.private.selectionRectPlay);
		removeChildFromStage (mm.private.selectionRectQuit);
		// it's okay to hard code this because you will always start in the same map.
		testingArea.loadObjects ();
		state = play;
	}

	mm.resetMainMenu = function () {
		mm.private.isShowing = true;
		mm.private.selectedEntry = 0;
		
		mm.private.selectionRectPlay = new PIXI.Graphics();
		mm.private.selectionRectPlay.position.set(0,0);
		mm.private.selectionRectPlay.beginFill(0x00AA00);
		mm.private.selectionRectPlay.drawRect(0,0, app.view.width, app.view.height);
		mm.private.selectionRectPlay.endFill();
		addChildToStage(mm.private.selectionRectPlay);

		mm.private.selectionRectQuit = new PIXI.Graphics();
		mm.private.selectionRectQuit.position.set(app.view.width,app.view.height);
		mm.private.selectionRectQuit.beginFill(0xAA0000);
		mm.private.selectionRectQuit.drawRect(0,0, app.view.width, app.view.height);
		mm.private.selectionRectQuit.endFill();
		addChildToStage(mm.private.selectionRectQuit);
	}

	mm.private.initialize = function () {
		mm.private.isShowing = false;
		mm.private.actions = [mm.private.startGame, mm.private.quitGame];
		mm.private.selectedEntry = 0;

		mm.private.selectionRectPlay = new PIXI.Graphics();
		mm.private.selectionRectPlay.position.set(0,0);
		mm.private.selectionRectPlay.beginFill(0x00AA00);
		mm.private.selectionRectPlay.drawRect(0,0, app.view.width, app.view.height);
		mm.private.selectionRectPlay.endFill();
		addChildToStage(mm.private.selectionRectPlay);

		mm.private.selectionRectQuit = new PIXI.Graphics();
		mm.private.selectionRectQuit.position.set(app.view.width,app.view.height);
		mm.private.selectionRectQuit.beginFill(0xAA0000);
		mm.private.selectionRectQuit.drawRect(0,0, app.view.width, app.view.height);
		mm.private.selectionRectQuit.endFill();
		addChildToStage(mm.private.selectionRectQuit);
	} ();

	return mm;
}