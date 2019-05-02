var FPS = 60;
var frame = 0;
var WIDTH = 1280;
var HEIGHT = 768;
var fpsGraphic = new PIXI.Text("", {fontFamily : 'Arial', fontSize: 24, fill : 0xFFFF00, align : 'center'});
fpsGraphic.position.set (0, 0);

//Create a Pixi Application
let app = new PIXI.Application({
	width: WIDTH,         // default: 800
	height: HEIGHT,        // default: 600
	antialias: true,    // default: false
	transparent: false, // default: false
	resolution: 1       // default: 1
});

var addChildToStage = function (graphic) {
	app.stage.addChild(graphic);
	updateDepth = true;
}

var removeChildFromStage = function (graphic) {
	app.stage.removeChild (graphic);
	updateDepth = true;
}

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;

//	If we want to make it dynamic then it shouldn't be done on the fly during gameplay
//app.renderer.resize(window.innerWidth, window.innerHeight);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

let state;

var controls = ["w", "a", "s", "d", " ", "e", "j", "b", "i", "o", "p", "Escape"];
var keyboard = Keyboard(controls);
var textBox = TextBox();

var fileReader = FileController ();
var mapLoader = MapLoader ();
var audio = AudioController ();
var mainMenu = MainMenu ();
var showMainMenu = false;

var childNum;
var scrollSpeed = 12;
var scrollXOffset;
var scrollYOffset;
var globalX = 0;
var globalY = 0;
var updateDepth = false;

//area assets
var marsh_stoneHouse = Asset("wall", "assets/images/The Marsh/Marsh Stone House GV.png", .5, .5, 1, 1, 0.5, 0.5);
var marsh_stump = Asset("wall", "assets/images/The Marsh/Trunk GV.png", .40, .95, 1, 1, 0.5, 0.5);
var marsh_brokenStump = Asset("wall", "assets/images/The Marsh/Borken Tree Stump GV.png", .05, .06, 1, 1, 0.5, 0.5);
var marsh_grass_tile = Asset("wall", "assets/images/The Marsh/Marshland Grass Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_grass_mud_tile = Asset("wall", "assets/images/The Marsh/Marshland Grass Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_grass_tile = Asset("wall", "assets/images/The Marsh/Marshland Mud Grass Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_tile = Asset("wall", "assets/images/The Marsh/Marshland Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_water_tile = Asset("wall", "assets/images/The Marsh/Marshland Mud Water Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_mud_tile = Asset("wall", "assets/images/The Marsh/Marshland Water Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_water_middle_tile = Asset("wall", "assets/images/The Marsh/Marshland Mud Water Middle Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_mud_middle_tile = Asset("wall", "assets/images/The Marsh/Marshland Water Mud Middle Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_tile = Asset("wall", "assets/images/The Marsh/Marshland Water Tile.png", 1, 1, 1, 1, 0.5, 0.5);

//character assets
var redFlameParticleAsset1 = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset2 = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset3 = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset4 = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameStillAsset = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0002_Red-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var redFlameMovingAsset = Asset("flameRed", "assets/images/Red Flame GV/Red-Flame-Game_0000_Red-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var blueFlameParticleAsset1 = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset2 = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset3 = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset4 = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameStillAsset = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0002_White-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var blueFlameMovingAsset = Asset("flameBlue", "assets/images/Blue Flame GV/Blue-Flame-Game_0000_White-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);

//assets for testing
var wallAsset = Asset("wall", "assets/images/spr_castleOuterWallBIG_0.png", 1, 1, 1, 1, 0.5, 0.5);
var otherWallAsset = Asset("wall", "assets/images/spr_otherWall_0.png", 1, 1, 1, 1, 0.5, 0.5);

var wallArray = [];
var playerArray = [];
var NPCArray = [];
var generatedObjectsArray = [];
var enemyArray = [];
var controllerArray = [];
var last_wallArray = [];
var last_playerArray = [];
var last_NPCArray = [];
var last_generatedObjectsArray = [];
var last_enemyArray = [];
var last_controllerArray = [];
var lastArea;
var currentArea;

var karma = 0;
var cameraTarget;
var overrideCamera = false;
var roomMinX;
var roomMaxX;

//global variables related to the player
var naiasCharm = false;

//Add audio to PIXI loader
PIXI.Loader.shared.add ("death", "assets/audio/soundeffects/Damage-Death/Death hero_lose hp.mp3");
PIXI.Loader.shared.add ("dmg","assets/audio/soundeffects/Damage-Death/dmg.mp3");
PIXI.Loader.shared.add ("enemyDmg", "assets/audio/soundeffects/Damage-Death/enemy dmg.mp3");
PIXI.Loader.shared.add ("growlingDmg", "assets/audio/soundeffects/Damage-Death/growling dmg.wav");
PIXI.Loader.shared.add ("heroDeath", "assets/audio/soundeffects/Damage-Death/Hero Death.wav");
PIXI.Loader.shared.add ("waterDmg", "assets/audio/soundeffects/Damage-Death/Water dmg.wav");
PIXI.Loader.shared.add ("cancel", "assets/audio/soundeffects/Menu/Cancel.wav");
PIXI.Loader.shared.add ("menuCancel", "assets/audio/soundeffects/Menu/Menu cancel.mp3");
PIXI.Loader.shared.add ("menuSelect", "assets/audio/soundeffects/Menu/Menu select.wav");
PIXI.Loader.shared.add ("menuSwitch", "assets/audio/soundeffects/Menu/Menu switch.mp3");
PIXI.Loader.shared.add ("menu2", "assets/audio/soundeffects/Menu/menu2.wav");
PIXI.Loader.shared.add ("waterBubble", "assets/audio/soundeffects/Water/Waterbubble.wav");
PIXI.Loader.shared.add ("gainingHealth", "assets/audio/soundeffects/Actions/Gaining Health.wav");
PIXI.Loader.shared.add ("jump", "assets/audio/soundeffects/Actions/JUMP.wav");
PIXI.Loader.shared.add ("step", "assets/audio/soundeffects/Actions/step.mp3");
PIXI.Loader.shared.add ("steps", "assets/audio/soundeffects/Actions/steps.mp3");
//also soundtracks
PIXI.Loader.shared.add ("endCaptions", "assets/audio/soundtracks/EndCaptions.mp3");
PIXI.Loader.shared.add ("grotto", "assets/audio/soundtracks/Grotto.wav");
PIXI.Loader.shared.add ("marsh", "assets/audio/soundtracks/Marsh.wav");
PIXI.Loader.shared.add ("openingMusic", "assets/audio/soundtracks/Opening Music.wav");
PIXI.Loader.shared.add ("playDuringCaptions", "assets/audio/soundtracks/PlayduringCaptions.mp3");

//Add dialogue to PIXI loader
PIXI.Loader.shared.add ("CheeryVillager", "dialogue/CheeryVillager.txt");
PIXI.Loader.shared.add ("MerchantCompanyAgent1", "dialogue/MerchantCompanyAgent1.txt");
PIXI.Loader.shared.add ("Naia1", "dialogue/Naia1.txt");
PIXI.Loader.shared.add ("Naia2", "dialogue/Naia2.txt");
PIXI.Loader.shared.add ("NPCText", "dialogue/NPCText.txt");
PIXI.Loader.shared.add ("TestDialogue", "dialogue/TestDialogue.txt");

//Add maps to PIXI loader
PIXI.Loader.shared.add ("Maps/debugMap.csv");

var areaController;
var npcVariables = NPCVariables();
var lastNPCVariables = NPCVariables();

//textures are loaded in Asset
PIXI.Loader.shared.on("progress", loadProgressHandler);
PIXI.Loader.shared.load(setup);
PIXI.Loader.shared.onComplete.add(() => {
	app.ticker.maxFPS = FPS;
	app.ticker.start();
	showMainMenu = true;
	areaController = Area();
	areaController.prepareMaps();
	console.log("Ran onComplete.");
});

var updates = function () {
	keyboard.update();

	var arrays = [playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

	for (var i = 0; i < arrays.length; i++) {
		for (var j = 0; j < arrays[i].length; j++) {
			arrays [i][j].update ();
		}
	}

	textBox.update();

	if (updateDepth) {
		depths();
	}

	scrolls();
}

var scrolls = function () {
	//screen scrolling

	var appWidth = Math.round(app.view.width / 2);
	var appHeight = Math.round(app.view.height / 2);

	if (!overrideCamera) {
		if (cameraTarget == undefined || playerArray[0] != undefined) {
			cameraTarget = playerArray[0];
		} else {
			cameraTarget = undefined;
		}
	}

	if (cameraTarget != undefined && cameraTarget.character != undefined && cameraTarget.character.graphic != undefined) {
		var px = cameraTarget.character.graphic.x;
		var py = cameraTarget.character.graphic.y;
	} else {
		//we can override this and have a camera object or something
		var px = appWidth / 2;
		var py = appHeight / 2;
	}

	//these global variables are used in the render functions
	scrollXOffset = (appWidth - px) / scrollSpeed;
	scrollYOffset = (appHeight - py) / scrollSpeed;
	
	if (scrollXOffset != 0 || scrollYOffset != 0) {

		//ensure that we still move.
		if(scrollXOffset < 1 && scrollXOffset > 0){
			scrollXOffset = 1;
		}else if(scrollXOffset > -1 && scrollXOffset < 0){
			scrollXOffset = -1;
		}
		if(scrollYOffset < 1 && scrollYOffset > 0){
			scrollYOffset = 1;
		}else if(scrollYOffset > -1 && scrollYOffset < 0){
			scrollYOffset = -1;
		}

		//ensure that these are whole numbers
		if (scrollXOffset % 1 != 0) {
			if (scrollXOffset % 1 < 0.5) {
				scrollXOffset -= scrollXOffset % 1;
			} else {
				scrollXOffset -= scrollXOffset % 1;
				scrollXOffset += 1;
			}
		}
		if (scrollYOffset % 1 != 0) {
			if (scrollYOffset % 1 < 0.5) {
				scrollYOffset -= scrollYOffset % 1;
			} else {
				scrollYOffset -= scrollYOffset % 1;
				scrollYOffset += 1;
			}
		}
		

		//track global positioning of the player
		globalX -= scrollXOffset;
		globalY -= scrollYOffset;

		//POSITIONING HERE DOESN'T MATTER.

		var arrays = [wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

		for (var i = 0; i < arrays.length; i++) {
			for (var j = 0; j < arrays[i].length; j++) {
				arrays [i][j].scroll ();
			}
		}
	}
}

var depths = function () {
	childNum = 0;

	var arrays = [wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

	for (var i = 0; i < arrays.length; i++) {
		for (var j = 0; j < arrays[i].length; j++) {
			arrays [i][j].depth ();
		}
	}
}

function setup() {
	state = onMainMenu;

	//	only keydown is needed, other event listeners for keyboard input will mess things up
	window.addEventListener("keydown", keyboard.keyEvent);
	window.addEventListener("keyup", keyboard.keyEvent);

	app.ticker.autostart = false;
	app.ticker.stop ();
	app.ticker.add(delta => gameLoop(delta));
}

function loadProgressHandler(loader, resource) {
	console.log("loading: " + resource.url);
	console.log("progress: " + loader.progress + "%");
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameLoop(delta) {
    if (keyboard.getKeyStatus ("b") == "down") {
        alert("something");
        if (app.ticker.maxFPS == FPS) {
            app.ticker.maxFPS = 15;
            alert("toggle 1");
        }
        else if (app.ticker.maxFPS == 15){
            app.ticker.maxFPS = FPS;
            alert ("toggle 2");
        }
        else {
            alert("error");
        }
        fpsGraphic.text = app.ticker.maxFPS;
        addChildToStage (fpsGraphic);
    }

	state(delta);
	frame++;
}

function onMainMenu (delta) {
	if (showMainMenu) {
		mainMenu.update ();
	}
}

function play(delta) {
	if (keyboard.getKeyStatus ("Escape") == "pressed") {
		//areaController.unload ();
		mainMenu.resetMainMenu ();
		areaController.unload();
		state = onMainMenu;
	}
	else {
		updates();
    }
}
