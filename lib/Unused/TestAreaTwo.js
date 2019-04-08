var TestAreaTwo = function(){
	var testAreaTwo = {};
	testAreaTwo.objects = [];
	testAreaTwo.walls = [];
	testAreaTwo.players = [];
	testAreaTwo.testNPCs = [];
	testAreaTwo.enemies = [];

	testAreaTwo.initialize = function(){
		
		testAreaTwo.players.push(Player(100,400,redFlameStillAsset));

	  	for(var i = 0;i < 9;i++){
	  		testAreaTwo.walls.push(Wall(600-i*64,540,wallAsset));
	  	}

	  	testAreaTwo.testNPCs.push(GateKeeperNPC(600-3*64,540-64,redFlameStillAsset));

		testAreaTwo.objects = [testAreaTwo.walls,testAreaTwo.players,testAreaTwo.testNPCs,testAreaTwo.enemies];
	}();

	return testAreaTwo;
}