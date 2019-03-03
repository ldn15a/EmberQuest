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

var controls = ["w", "a", "s", "d", " ", "j", "i", "o"];
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
	var px = playerArray[0].character.graphic.x;
	var py = playerArray[0].character.graphic.y;

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

		for(var i = 0; i < wallArray.length; i++){
			wallArray[i].scroll();
		}
		for(var i = 0; i < playerArray.length; i++){
			playerArray[i].scroll();
		}
		for(var i = 0; i < fireProjectileArray.length; i++){
			fireProjectileArray[i].scroll();
		}
	}
}

function depths() {
	childNum = 0;
	for(var i = 0; i < wallArray.length; i++){
		wallArray[i].depth();
	}
	for(var i = 0; i < playerArray.length; i++){
		playerArray[i].depth();
	}
	for(var i = 0; i < fireProjectileArray.length; i++){
		fireProjectileArray[i].depth();
	}
}

function setup() {
	state = play;

	orvelObject = Player(450,100,redFlameStillAsset);

  	TestNPC(250,100,redFlameStillAsset);

  	for(var i = 0;i < 6;i++){
  		var newObject = Wall(450+i*64,450,wallAsset);
  	}

	var newObject = Wall(450+3*64,450-64,wallAsset);

	for(var i = 0;i < 6;i++){
		var newObject = Wall(450-i*64,642,wallAsset);
	}

	for(var i = 0;i < 3;i++){
		var newObject = Wall(450-i*64,322,wallAsset);
	}

	for(var i = 0;i < 8;i++){
		var newObject = Wall(96-i*64,322,wallAsset);
	}


	for(var i = 0;i < 25;i++){
		var newObject = Wall(1100+i*64,450,wallAsset);
	}

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
}

