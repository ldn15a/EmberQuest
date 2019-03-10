var TestArea = function(){
	var testArea = {};
	testArea.objects = [];
	testArea.walls = [];
	testArea.players = [];
	testArea.testNPCs = [];
	testArea.enemies = [];

	testArea.initialize = function(){
		
		testArea.players.push(Player(450,100,redFlameStillAsset));

	  	testArea.testNPCs.push(TestNPC(250,322-170-64,redFlameStillAsset));

	  	testArea.enemies.push(TestEnemy(800,322-200,blueFlameStillAsset));


		for(var i = 0;i < 4;i++){
			testArea.walls.push(Wall(i*298,322,marsh_tile));
		}
		testArea.walls.push(Wall(250,322-180,marsh_brokenStump));
		testArea.walls.push(Wall(890,322-180,marsh_brokenStump));
		testArea.walls.push(Wall(400+298,322-160,marsh_stump));

		testArea.objects = [testArea.walls,testArea.players,testArea.testNPCs,testArea.enemies];
	}();

	return testArea;
}