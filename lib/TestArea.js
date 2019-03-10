var TestArea = function(){
	var testArea = {};
	testArea.objects = [];
	testArea.walls = [];
	testArea.players = [];
	testArea.testNPCs = [];
	testArea.enemies = [];

	testArea.loadObjects = function () {
		mapLoader.loadMapObjects ("Wall", function(){console.log("Finished loading test area walls");});
	}

	testArea.initialize = function(){
		
		testArea.players.push(Player(450,100,redFlameStillAsset));

	  	testArea.testNPCs.push(TestNPC(250-196,322-64,redFlameStillAsset));

	  	testArea.enemies.push(TestEnemy(800,380,blueFlameStillAsset));

	  	for(var i = 0;i < 6;i++){
	  		testArea.walls.push(Wall(450+i*64,450,wallAsset));
		  }
		  
		mapLoader.readMap ("Maps/TestMap.txt", testArea.loadObjects);

		//testArea.walls.push(Wall(642,386,wallAsset));

		for(var i = 0;i < 6;i++){
			testArea.walls.push(Wall(450-i*64,642,wallAsset));
		}

		for(var i = 0;i < 3;i++){
			testArea.walls.push(Wall(450-i*64,322,wallAsset));
		}

		for(var i = 0;i < 8;i++){
			testArea.walls.push(Wall(96-i*64,322,wallAsset));
		}

		for(var i = 0;i < 25;i++){
			testArea.walls.push(Wall(1100+i*64,450,wallAsset));
		}

		testArea.objects = [testArea.walls,testArea.players,testArea.testNPCs,testArea.enemies];
	}();

	return testArea;
}