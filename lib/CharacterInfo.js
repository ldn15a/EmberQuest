var CharacterInfo = function(x,y,direction,jump){
	var characterInfo = {};
	characterInfo.x;
	characterInfo.y;
	characterInfo.direction;
	characterInfo.jump;

	characterInfo.initialize = function(){
		characterInfo.x = x;
		characterInfo.y = y;
		characterInfo.direction = direction;
		characterInfo.jump = jump;
	}();

	return characterInfo;
}