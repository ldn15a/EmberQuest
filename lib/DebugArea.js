var DebugArea = function(){
	var area = {};
	area.objects = [];
	area.walls = [];
	area.players = [];
	area.NPCs = [];
	area.enemies = [];

	area.loadObjects = function () {
		//D E B U G
		area.NPCs.push(NPC(700,0,redFlameStillAsset,"dialog/Naia2.txt"));

		area.objects = [area.walls, area.players, area.NPCs, area.enemies];

		for(var i = 0; i < area.objects.length; i++){
			for(var j = 0; j < area.objects[i].length; j++){
				area.objects[i][j].load ();
			}
		}
	}

	area.initialize = function(){
		var testDialogue = DialogueParser("dialog/Naia2.txt");
		mapLoader.loadMap ("Maps/TestMap.txt", area, area.loadObjects);
	}();

	return area;
}