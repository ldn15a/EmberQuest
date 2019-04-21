var FPS = 60;
var frame = 0;

var WIDTH = 1280;
var HEIGHT = 768;

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

var controls = ["w", "a", "s", "d", " ", "e", "j", "i", "o", "p", "Escape"];
var keyboard = Keyboard(controls);
var textBox = TextBox();

var fileReader = FileController ();
var mapLoader = MapLoader ();
var audio = AudioController ();
var mainMenu = MainMenu ();
var showMainMenu = false;

var childNum;
var scrollSpeed = 10;
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

var npcVariables = NPCVariables();
var lastNPCVariables = npcVariables();
var areaController = Area();

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

//areas
var debugArea;
var lightMarsh;

//global variables related to the player
var naiasCharm = false;

//Add audio to PIXI loader
PIXI.Loader.shared.add ("bigDamage", "assets/audio/soundeffects/bigDamage1.mp3");
PIXI.Loader.shared.add ("cancel", "assets/audio/soundeffects/cancel.mp3");
PIXI.Loader.shared.add ("confirm", "assets/audio/soundeffects/confirm.mp3");
PIXI.Loader.shared.add ("damage1", "assets/audio/soundeffects/damage1.mp3");
PIXI.Loader.shared.add ("enemyHit", "assets/audio/soundeffects/enemeyHit.wav");
PIXI.Loader.shared.add ("laser1", "assets/audio/soundeffects/laser1.mp3");
PIXI.Loader.shared.add ("laser2", "assets/audio/soundeffects/laser2.mp3");
PIXI.Loader.shared.add ("loseLife", "assets/audio/soundeffects/loseLife.mp3");
PIXI.Loader.shared.add ("recoveringHealth", "assets/audio/soundeffects/recoveringHealth.wav");
PIXI.Loader.shared.add ("lo-fi", "assets/audio/soundtracks/lo-fi.wav");
PIXI.Loader.shared.add ("meldoic", "assets/audio/soundtracks/meldoic.wav");
PIXI.Loader.shared.add ("spooky", "assets/audio/soundtracks/spooky.wav");

//Add dialogue to PIXI loader
PIXI.Loader.shared.add ("CherryVillager", "dialogue/CheeryVillager.txt");
PIXI.Loader.shared.add ("MerchantCompanyAgent1", "dialogue/MerchantCompanyAgent1.txt");
PIXI.Loader.shared.add ("Naia1", "dialogue/Naia1.txt");
PIXI.Loader.shared.add ("Naia2", "dialogue/Naia2.txt");
PIXI.Loader.shared.add ("NPCText", "dialogue/NPCText.txt");
PIXI.Loader.shared.add ("TestDialogue", "dialogue/TestDialogue.txt");

//Add maps to PIXI loader
PIXI.Loader.shared.add ("Maps/debugMap.csv");

//textures are loaded in Asset
PIXI.Loader.shared.on("progress", loadProgressHandler);
PIXI.Loader.shared.load(setup);
PIXI.Loader.shared.onComplete.add(() => {
	app.ticker.maxFPS = FPS;
	app.ticker.start();
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
		var px = app.view.width / 2;
		var py = app.view.height / 2;
	}

	//these global variables are used in the render functions
	scrollXOffset = (app.view.width / 2 - px) / scrollSpeed;
	scrollYOffset = (app.view.height / 2 - py) / scrollSpeed;

	if (scrollXOffset != 0 && scrollYOffset != 0) {

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

	areaController.loadArea("debugArea");

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
		unload ();
		mainMenu.resetMainMenu ();
		state = onMainMenu;
	}
	else {
		updates();
	}
}
