//currently this does nothing
var FPS = 60;
var frame = 0;

var WIDTH = 1280;
var HEIGHT = 720;

//Create a Pixi Application
let app = new PIXI.Application({ 
    width: WIDTH,         // default: 800
    height: HEIGHT,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;

//	If we want to make it dynamic then it shouldn't be done on the fly during gameplay
//app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let state;

var controls = ["w", "a", "s", "d", " ", "e", "j", "i", "o", "p"];
var keyboard = Input (controls);
var textBox = TextBox ();

var fileReader = FileController ();
var mapLoader = MapLoader ();

var childNum;
var scrollSpeed = 10;
var scrollXOffset;
var scrollYOffset;
var globalX = 0;
var globalY = 0;
var updateDepth = false;

//area assets
var marsh_stoneHouse = Asset("wall","assets/images/The Marsh/Marsh Stone House GV.png",.5,.5,1,1,0.5,0.5);
var marsh_stump = Asset("wall","assets/images/The Marsh/Trunk GV.png",.40,.95,1,1,0.5,0.5);
var marsh_brokenStump = Asset("wall","assets/images/The Marsh/Borken Tree Stump GV.png",.05,.06,1,1,0.5,0.5);
var marsh_tile = Asset("wall","assets/images/The Marsh/Marshland Tile GV.png",3/20,3/20,1,1,0.5,0.5);

//character assets
var redFlameParticleAsset1 = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset2 = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset3 = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset4 = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png",1,1,0.4,0.4,0.5,0.5);
var redFlameStillAsset = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0002_Red-BaseN.png",0.9,0.75,0.4,0.4,0.5,0.6);
var redFlameMovingAsset = Asset("flameRed","assets/images/Red Flame GV/Red-Flame-Game_0000_Red-BaseR.png",0.9,0.75,0.4,0.4,0.5,0.6);
var blueFlameParticleAsset1 = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png",1,1,0.4,0.4,0.5,0.5);
var blueFlameParticleAsset2 = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png",1,1,0.4,0.4,0.5,0.5);
var blueFlameParticleAsset3 = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png",1,1,0.4,0.4,0.5,0.5);
var blueFlameParticleAsset4 = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png",1,1,0.4,0.4,0.5,0.5);
var blueFlameStillAsset = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0002_White-BaseN.png",0.9,0.75,0.4,0.4,0.5,0.6);
var blueFlameMovingAsset = Asset("flameBlue","assets/images/Blue Flame GV/Blue-Flame-Game_0000_White-BaseR.png",0.9,0.75,0.4,0.4,0.5,0.6);

//assets for testing
var orvelAsset = Asset("orvel","assets/images/spr_orvelBOOSTED.png",0.5,0.93,1,1,0.5,0.5);
var wallAsset = Asset("wall","assets/images/spr_castleOuterWallBIG_0.png",1,1,1,1,0.5,0.5);
var otherWallAsset = Asset("wall","assets/images/spr_otherWall_0.png",1,1,1,1,0.5,0.5);

var npcVariables = NPCVariables();

var wallArray = [];
var playerArray = [];
var NPCArray = [];
var generatedObjectsArray = [];
var enemyArray = [];
var controllerArray = [];
var testingArea;
var testingAreaTwo;
var currentArea;
var deathArea;
var naiaBase = NaiaBase();
var karma = 0;
var cameraTarget;
var overrideCamera = false;

//textures are loaded in Asset
PIXI.Loader.shared.on("progress", loadProgressHandler);
PIXI.Loader.shared.load(setup);

var updates = function(){
	keyboard.update ();
	
	for(var i = 0; i < playerArray.length; i++){
		playerArray[i].update();
	}
	for(var i = 0;i < enemyArray.length;i++){
	    enemyArray[i].update();
	}
	for(var i = 0;i < controllerArray.length;i++){
    	controllerArray[i].update();
  	}
	for(var i = 0; i < generatedObjectsArray.length; i++){
		generatedObjectsArray[i].update();
	}
	for(var i = 0; i < NPCArray.length; i++){
		NPCArray[i].update();
	}

	textBox.update();

	if(updateDepth){
		depths();
	}

	scrolls();
}

var addChildToStage = function(graphic){
	app.stage.addChild(graphic);
	updateDepth = true;
}

var scrolls = function(){
	//screen scrolling
	if(!overrideCamera){
		if(cameraTarget == undefined || playerArray[0] != undefined){
			cameraTarget = playerArray[0];
		}else{
			cameraTarget = undefined;
		}
	}

	if(cameraTarget != undefined && cameraTarget.character != undefined && cameraTarget.character.graphic != undefined){
		var px = cameraTarget.character.graphic.x;
		var py = cameraTarget.character.graphic.y;
	}else{
		//we can override this and have a camera object or something
		var px = window.innerWidth/2;
		var py = window.innerHeight/2;
	}

	//these global variables are used in the render functions
	scrollXOffset = (window.innerWidth/2 - px)/scrollSpeed;
	scrollYOffset = (window.innerHeight/2 - py)/scrollSpeed;

		if(scrollXOffset != 0 && scrollYOffset != 0){

		//ensure that these are whole numbers
		if(scrollXOffset % 1 != 0){
			if(scrollXOffset % 1 < 0.5){
				scrollXOffset -= scrollXOffset % 1;
			}else{
				scrollXOffset -= scrollXOffset % 1;
				scrollXOffset += 1;
			}
		}
		if(scrollYOffset % 1 != 0){
			if(scrollYOffset % 1 < 0.5){
				scrollYOffset -= scrollYOffset % 1;
			}else{
				scrollYOffset -= scrollYOffset % 1;
				scrollYOffset += 1;
			}
		}

		//track global positioning of the player
		globalX -= scrollXOffset;
		globalY -= scrollYOffset;

		//POSITIONING HERE DOESN'T MATTER.

		for(var i = 0; i < wallArray.length; i++){
			wallArray[i].scroll();
		}
		for(var i = 0; i < playerArray.length; i++){
			playerArray[i].scroll();
		}
		for(var i = 0;i < enemyArray.length;i++){
	    	enemyArray[i].scroll();
		}
		for(var i = 0;i < controllerArray.length;i++){
    		controllerArray[i].scroll();
  		}
		for(var i = 0; i < generatedObjectsArray.length; i++){
			generatedObjectsArray[i].scroll();
		}
		for(var i = 0; i < NPCArray.length; i++){
			NPCArray[i].scroll();
		}
	}
}

var depths = function() {
	childNum = 0;
	for(var i = 0; i < wallArray.length; i++){
		wallArray[i].depth();
	}
	for(var i = 0; i < NPCArray.length; i++){
		NPCArray[i].depth();
	}
	for(var i = 0;i < enemyArray.length;i++){
	    enemyArray[i].depth();
	}
	for(var i = 0; i < playerArray.length; i++){
		playerArray[i].depth();
	}
	for(var i = 0;i < controllerArray.length;i++){
    	controllerArray[i].depth();
  	}
	for(var i = 0; i < generatedObjectsArray.length; i++){
		generatedObjectsArray[i].depth();
	}
}

var unload = function(){
	while(wallArray.length > 0){
		wallArray[0].unload();
	}
	while(NPCArray.length > 0){
		NPCArray[0].unload();
	}
	while(playerArray.length > 0){
		playerArray[0].unload();
	}
	while(enemyArray.length > 0){
		enemyArray[0].unload();
	}
	while(controllerArray.length > 0){
		controllerArray[0].unload();
	}
	while(generatedObjectsArray.length > 0){
		generatedObjectsArray[0].unload();
	}
	globalX = 0;
	globalY = 0;
}

function setup() {
	state = play;

	testingArea = TestArea();
	testingAreaTwo = TestAreaTwo();

	currentArea = testingArea;
	deathArea = currentArea;

	Area().load(currentArea);

	//	only keydown is needed, other event listeners for keyboard input will mess things up
	window.addEventListener ("keydown", keyboard.keyEvent);
	window.addEventListener ("keyup", keyboard.keyEvent);

	app.ticker.add(delta => gameLoop(delta));
}

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop(delta){
	state(delta);
	frame ++;
}

function play(delta){
	updates();

	//testing switching rooms
	if(keyboard.getKeyStatus("p") == "pressed"){
		Area().unload(currentArea);
		if(currentArea == testingArea){
			currentArea = testingAreaTwo;
		}else{
			currentArea = testingArea;
		}
		Area().load(currentArea);
	}
}
