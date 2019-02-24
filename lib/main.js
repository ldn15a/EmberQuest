//Create a Pixi Application
let app = new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let state;

//currently this does nothing
var FPS = 60;

var childNum;
var scrollSpeed = 12;
var scrollXOffset;
var scrollYOffset;
var globalX = 0;
var globalY = 0;

var UP = 0;
var DOWN = 0;
var LEFT = 0;
var RIGHT = 0;
var SPACE = 0;
var ATTACK = 0;
var justPressedAttack = 0;
var justPressedSPACE = 0;
var letGoOfSPACE = 0;

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

//textures are loaded in Asset
PIXI.loader.on("progress", loadProgressHandler);
PIXI.loader.load(setup);

var updates = function(){
	for(var i = 0;i < playerArray.length;i++){
		playerArray[i].update();
	}
	for(var i = 0;i < fireProjectileArray.length;i++){
		fireProjectileArray[i].update();
	}
}

var renders = function(){
	//screen scrolling
	var px = playerArray[0].character.graphic.x;
	var py = playerArray[0].character.graphic.y;

	//these global variables are used in the render functions
	scrollXOffset = window.innerWidth/2 - px;
	scrollYOffset = window.innerHeight/2 - py;

	if(Math.abs(scrollXOffset) < window.innerWidth/2 && Math.abs(scrollYOffset) < window.innerHeight/2){
		scrollXOffset /= scrollSpeed;
		scrollYOffset /= scrollSpeed;
	}

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

	childNum = 0;
	for(var i = 0;i < wallArray.length;i++){
		wallArray[i].render();
	}
	for(var i = 0;i < playerArray.length;i++){
		playerArray[i].render();
	}
	for(var i = 0;i < fireProjectileArray.length;i++){
		fireProjectileArray[i].render();
	}
}

function setup() {
	state = play;

  	orvelObject = Player(450,100,redFlameStillAsset);

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

  	
  	window.addEventListener("keydown", onKeyDown);
  	window.addEventListener("keyup", onKeyUp);

  	app.ticker.add(delta => gameLoop(delta));
}

function loadProgressHandler(loader, resource) {
  console.log("loading: " + resource.url);
  console.log("progress: " + loader.progress + "%");
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function onKeyDown(key){
    if (key.keyCode == 87){
    	UP = 1;
    }else if(key.keyCode == 83){
    	DOWN = 1;
    }else if(key.keyCode == 65){
    	LEFT = 1;
    }else if(key.keyCode == 68){
    	RIGHT = 1;
    }else if(key.keyCode == 32){
    	if(SPACE == 0){
    		justPressedSPACE = 1;
    	}
    	SPACE = 1;
    }else if(key.keyCode == 74){
    	if(ATTACK == 0){
    		justPressedAttack = 1;
    	}
    	ATTACK = 1;
    }
}
function onKeyUp(key){
    if (key.keyCode == 87){
    	UP = 0;
    }else if(key.keyCode == 83){
    	DOWN = 0;
    }else if(key.keyCode == 65){
    	LEFT = 0;
    }else if(key.keyCode == 68){
    	RIGHT = 0;
    }else if(key.keyCode == 32){
    	SPACE = 0;
    	letGoOfSPACE = 1;
    }else if(key.keyCode == 74){
    	ATTACK = 0;
    }
}

function gameLoop(delta){
	state(delta);
}

function play(delta){
	updates();
	renders();
	//console.log("COUNSUL, LOG THE DATAY!!!");
}

