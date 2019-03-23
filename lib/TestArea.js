var TestArea = function(){
	var testArea = {};
	testArea.objects = [];
	testArea.walls = [];
	testArea.players = [];
	testArea.NPCs = [];
	testArea.enemies = [];

	testArea.loadObjects = function () {
		testArea.objects = [testArea.walls, testArea.players, testArea.NPCs, testArea.enemies];

		for(var i = 0; i < testArea.objects.length; i++){
			for(var j = 0; j < testArea.objects[i].length; j++){
				testArea.objects[i][j].load ();
			}
		}
	}

	testArea.initialize = function(){
		var testDialogue = DialogueParser("dialog/Naia2.txt");
		mapLoader.loadMap ("Maps/TestMap.txt", testArea, testArea.loadObjects);
	}();

	return testArea;
}