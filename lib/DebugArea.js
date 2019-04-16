var DebugArea = function(){
	var area = {};
	area.name;
	area.objects = [];
	area.walls = [];
	area.players = [];
	area.NPCs = [];
	area.enemies = [];

	area.loadObjects = function () {
		//D E B U G
		area.NPCs.push(NPC(700,0,redFlameStillAsset,"dialog/Naia2.txt"));
		area.walls.push(Wall(700,200,otherWallAsset,true));
		area.walls.push(Wall(700+64,200,otherWallAsset,true));
		area.walls.push(Wall(700+64*2,200,otherWallAsset,true));
		area.walls.push(Wall(700+64*4,200,otherWallAsset,true));
		area.walls.push(Wall(700,200-64,otherWallAsset,true));
		area.walls.push(Wall(700,200-64*2,otherWallAsset,true));

		area.objects = [area.walls, area.players, area.NPCs, area.enemies];

		for(var i = 0; i < area.objects.length; i++){
			for(var j = 0; j < area.objects[i].length; j++){
				area.objects[i][j].load ();
			}
		}
	}

	area.initialize = function(){
		area.name = "DebugArea";
		var testDialogue = DialogueParser("dialog/Naia2.txt");
		mapLoader.loadMap ("Maps/TestMap.txt", area, area.loadObjects);
	}();

	return area;
}