var TestArea = function(){
	var testArea = {};
	testArea.objects = [];
	testArea.walls = [];
	testArea.players = [];
	testArea.testNPCs = [];
	testArea.enemies = [];

	testArea.loadObjects = function () {
		mapLoader.loadMapObjects ("Wall", function(){console.log("Finished loading test area walls");});
		//though we load them at a desync (the loadMapObjects call above), we set them all in the zone's arrays so that next time they not only get loaded properly, but there is no desync.
		var mLArrays = mapLoader.returnArrays();
		for(var i = 0; i < mLArrays.length; i++){
			for(var j = 0; j < mLArrays[i].length; j++){
				//console.log(i+"|"+j);
				testArea.objects[i].push(mLArrays[i][j]);
			}
		}
	}

	testArea.initialize = function(){
		
		testArea.players.push(Player(450,100,redFlameStillAsset));
		
	  	//testArea.testNPCs.push(TestNPC(250,322-170-64,redFlameStillAsset));

	  	//testArea.enemies.push(TestEnemy(800,322-200,blueFlameStillAsset));

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
		//testArea.walls.push(Wall(250,322-180,marsh_brokenStump));
		//testArea.walls.push(Wall(890,322-180,marsh_brokenStump));
		//testArea.walls.push(Wall(400+298,322-160,marsh_stump));
		
		testArea.objects = [testArea.walls,testArea.players,testArea.testNPCs,testArea.enemies];
	}();

	return testArea;
}