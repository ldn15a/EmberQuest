var TestAreaTwo = function(){
	var testAreaTwo = {};
	testAreaTwo.objects = [];
	testAreaTwo.walls = [];
	testAreaTwo.players = [];
	testAreaTwo.testNPCs = [];

	testAreaTwo.initialize = function(){
		
		testAreaTwo.players.push(Player(200,400,redFlameStillAsset));

	  	for(var i = 0;i < 9;i++){
	  		testAreaTwo.walls.push(Wall(600-i*64,540,wallAsset));
	  	}

		testAreaTwo.objects = [testAreaTwo.walls,testAreaTwo.players,testAreaTwo.testNPCs];

		console.log(testAreaTwo.objects);
	}();

	return testAreaTwo;
}