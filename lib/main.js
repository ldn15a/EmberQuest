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

var controls = ["w", "a", "s", "d", " ", "e", "j", "i", "o"];
var keyboard = Input (controls);
var textBox = TextBox ();

var childNum;
var scrollSpeed = 10;
var scrollXOffset;
var scrollYOffset;
var globalX = 0;
var globalY = 0;
var updateDepth = false;

var redFlameParticleAsset1 = Asset("particle","assets/images/Red Flame GV/Red-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset2 = Asset("particle","assets/images/Red Flame GV/Red-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset3 = Asset("particle","assets/images/Red Flame GV/Red-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png",1,1,0.4,0.4,0.5,0.5);
var redFlameParticleAsset4 = Asset("particle","assets/images/Red Flame GV/Red-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png",1,1,0.4,0.4,0.5,0.5);
var redFlameStillAsset = Asset("flame","assets/images/Red Flame GV/Red-Flame-Game_0002_Red-BaseN.png",0.9,0.8,0.4,0.4,0.5,0.6);
var redFlameMovingAsset = Asset("flame","assets/images/Red Flame GV/Red-Flame-Game_0000_Red-BaseR.png",0.9,0.8,0.4,0.4,0.5,0.6);
var orvelAsset = Asset("orvel","assets/images/spr_orvelBOOSTED.png",0.5,0.93,1,1,0.5,0.5);
var wallAsset = Asset("wall","assets/images/spr_castleOuterWallBIG_0.png",1,1,1,1,0.5,0.5);
var otherWallAsset = Asset("wall","assets/images/spr_otherWall_0.png",1,1,1,1,0.5,0.5);
var wallArray = [];
var playerArray = [];
var fireProjectileArray = [];
var testNPCArray = [];
var generatedObjectsArray = [];
var testingArea;

//textures are loaded in Asset
PIXI.Loader.shared.on("progress", loadProgressHandler);
PIXI.Loader.shared.load(setup);

var updates = function(){
	keyboard.update ();
	
	for(var i = 0; i < playerArray.length; i++){
		playerArray[i].update();
	}
	for(var i = 0; i < fireProjectileArray.length; i++){
		fireProjectileArray[i].update();
	}
	for(var i = 0; i < testNPCArray.length; i++){
		testNPCArray[i].update();
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
	if(playerArray[0] != undefined){
		var px = playerArray[0].character.graphic.x;
		var py = playerArray[0].character.graphic.y;
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
		for(var i = 0; i < fireProjectileArray.length; i++){
			fireProjectileArray[i].scroll();
		}
		for(var i = 0; i < testNPCArray.length; i++){
			testNPCArray[i].scroll();
		}
	}
}

var depths = function() {
	childNum = 0;
	for(var i = 0; i < wallArray.length; i++){
		wallArray[i].depth();
	}
	for(var i = 0; i < testNPCArray.length; i++){
		testNPCArray[i].depth();
	}
	for(var i = 0; i < playerArray.length; i++){
		playerArray[i].depth();
	}
	for(var i = 0; i < fireProjectileArray.length; i++){
		fireProjectileArray[i].depth();
	}
}

var unload = function(){
	while(wallArray.length > 0){
		wallArray[0].unload();
	}
	while(testNPCArray.length > 0){
		testNPCArray[0].unload();
	}
	while(playerArray.length > 0){
		playerArray[0].unload();
	}
	while(generatedObjectsArray.length > 0){
		generatedObjectsArray[0].unload();
	}
}

function setup() {
	state = play;

	testingArea = TestArea();
	testingAreaTwo = TestAreaTwo();

	Area().load(testingArea);


	//	only keydown is needed, other event listeners for keyboard input will mess things up
	window.addEventListener ("keydown", keyboard.keyEvent);
	window.addEventListener ("keyup", keyboard.keyEvent);

	app.ticker.add(delta => gameLoop(delta));

	setTimeout (function(){
		unload();
		Area().load(testingAreaTwo);
		console.log("unload");
		}
	,2000);

	setTimeout (function(){
		unload();
		Area().load(testingArea);
		console.log("load");
		}
	,4000);

	setTimeout (function(){
		 	unload();
		 	Area().load(testingAreaTwo);
		console.log("unload");
		}
	,6000);
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
}

