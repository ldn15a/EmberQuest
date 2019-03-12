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

	  	testArea.testNPCs.push(TestNPC(250,322-170-64,redFlameStillAsset));

	  	testArea.enemies.push(TestEnemy(800,322-200,blueFlameStillAsset));

<<<<<<< HEAD

		for(var i = 0;i < 4;i++){
			testArea.walls.push(Wall(i*298,322,marsh_tile));
=======
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
>>>>>>> e60833722cdd62a9da56bf94b5a1503aef4dfec6
		}
		testArea.walls.push(Wall(250,322-180,marsh_brokenStump));
		testArea.walls.push(Wall(890,322-180,marsh_brokenStump));
		testArea.walls.push(Wall(400+298,322-160,marsh_stump));

		testArea.objects = [testArea.walls,testArea.players,testArea.testNPCs,testArea.enemies];
	}();

	return testArea;
}