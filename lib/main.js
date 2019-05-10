var FPS = 60;
var frame = 0;
var WIDTH = 1280;
var HEIGHT = 768;
var fpsGraphic = new PIXI.Text("", {fontFamily : 'Arial', fontSize: 24, fill : 0xFFFF00, align : 'center'});
fpsGraphic.position.set (0, 0);

//Create a Pixi Application
let app = new PIXI.Application({
	width: WIDTH,         // default: 1280
	height: HEIGHT,        // default: 768
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
var showMainMenu = false;

var childNum;
var scrollSpeed = 12;
var scrollXOffset;
var scrollYOffset;
var globalX = 0;
var globalY = 0;
var updateDepth = false;

//area assets
var marsh_stoneHouse = Asset("marsh_stoneHouse", "assets/images/The Marsh/Marsh Stone House GV.png", .5, .5, 1, 1, 0.5, 0.5);
var marsh_stump = Asset("marsh_stump", "assets/images/The Marsh/Trunk GV.png", .40, .95, 1, 1, 0.5, 0.5);
var marsh_brokenStump = Asset("marsh_brokenStump", "assets/images/The Marsh/Broken Tree Stump GV.png", .05, .06, 1, 1, 0.5, 0.5);
var marsh_grass_tile = Asset("marsh_grass_tile", "assets/images/The Marsh/Marshland Grass Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_grass_mud_tile = Asset("marsh_grass_mud_tile", "assets/images/The Marsh/Marshland Grass Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_grass_tile = Asset("marsh_mud_grass_tile", "assets/images/The Marsh/Marshland Mud Grass Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_tile = Asset("marsh_mud_tile", "assets/images/The Marsh/Marshland Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_water_tile = Asset("marsh_mud_water_tile", "assets/images/The Marsh/Marshland Mud Water Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_mud_tile = Asset("marsh_water_mud_tile", "assets/images/The Marsh/Marshland Water Mud Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_mud_water_middle_tile = Asset("marsh_mud_water_middle_tile", "assets/images/The Marsh/Marshland Mud Water Middle Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_mud_middle_tile = Asset("marsh_water_mud_middle_tile", "assets/images/The Marsh/Marshland Water Mud Middle Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_water_tile = Asset("marsh_water_tile", "assets/images/The Marsh/Marshland Water Tile.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_backgroundSkyUp = Asset("marsh_backgroundSkyUp", "assets/images/The Marsh/background/backgroundSkyUp GV.png", 1, 1, 1, 1, 0.5, 0.5);
var marsh_background = Asset("marsh_background", "assets/images/The Marsh/background/marshbackground GV.png", 1, 1, 1, 0.5, 0.5);
var tree_branch= Asset("tree_branch", "assets/images/The Marsh/Trunk Stuff/Tree_branch GV.png", 1, 1, 1, 1, 0.5, 0.5);
var tree_branch_base = Asset("tree_branch_base", "assets/images/The Marsh/Trunk Stuff/Tree_branch_base GV.png", 1, 1, 1, 1, 0.5, 0.5);
var tree_rings = Asset("tree_rings", "assets/images/The Marsh/Trunk Stuff/Tree_rings GV.png", 1, 1, 1, 1, 0.5, 0.5);
var tree_top = Asset("tree_top", "assets/images/The Marsh/Trunk Stuff/treeTop GV.png", 1, 1, 1, 1, 0.5, 0.5);
var trunk_stack = Asset("trunk_stack", "assets/images/The Marsh/Trunk Stuff/Trunk_stack GV.png", 1, 1, 1, 1, 0.5, 0.5);
var trunk_w_0Rings = Asset("trunk_w_0Rings", "assets/images/The Marsh/Trunk Stuff/Trunk_w-oRings GV.png", 1, 1, 1, 1, 0.5, 0.5);
var trunk_w = Asset("trunk_w-rings", "assets/images/The Marsh/Trunk Stuff/Trunk_w-rings GV.png", 1, 1, 1, 1, 0.5, 0.5);
var banner1 = Asset("banner1", "assets/images/The Marsh/Banner1 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var banner2 = Asset("banner2", "assets/images/The Marsh/Banner2 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var banner3 = Asset("banner3", "assets/images/The Marsh/Banner3 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var bannerSlum1 = Asset("bannerSlum1", "assets/images/The Marsh/BannerSlum1 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var bannerSlum2 = Asset("bannerSlum2", "assets/images/The Marsh/BannerSlum2 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var bannerSlum3 = Asset("bannerSlum3", "assets/images/The Marsh/BannerSlum3 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var closed_gate = Asset("closed_gate", "assets/images/The Marsh/Closed Gate GV.png", 1, 1, 1, 1, 0.5, 0.5);
var doorway_general = Asset("doorway_general", "assets/images/The Marsh/doorwayGeneral GV.png", 1, 1, 1, 1, 0.5, 0.5);
var grass_platform = Asset("grass_platform", "assets/images/The Marsh/GrassPlatform GV.png", 1, 1, 1, 1, 0.5, 0.5);
var grass_platform_quart = Asset("grass_platform_quart", "assets/images/The Marsh/GrassPlatformQuart GV.png", 1, 1, 1, 1, 0.5, 0.5);
var roof_tile = Asset("roof_tile", "assets/images/The Marsh/roofTile GV.png", 1, 1, 1, 1, 0.5, 0.5);
var brick_tile_bord = Asset("brick_tile_bord", "assets/images/Brick Tile Bord GV.png", 1, 1, 1, 1, 0.5 , 0.5);
var brick_tile = Asset ("brick_tile", "assets/images/Brick Tile GV.png", 1, 1, 1, 1, 0.5, 0.5);
var brick_tile2 = Asset ("brick_tile2", "assets/images/Brick Tile2 GV.png", 1, 1, 1, 1, 0.5, 0.5);

//character assets
var playerHeart = Asset("playerHeart", "assets/images/HPheart GV.png", 0.125, 0.125, 0.125, 0.125, 0.5, 0.5);
var redFlameParticleAsset1 = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset2 = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset3 = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameParticleAsset4 = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redFlameStillAsset = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0002_Red-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var redFlameMovingAsset = Asset("flameRed", "assets/images/sprites/Red Flame GV/Red-Flame-Game_0000_Red-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var redOrangeFlameParticleAsset1 = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redOrangeFlameParticleAsset2 = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redOrangeFlameParticleAsset3 = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redOrangeFlameParticleAsset4 = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var redOrangeFlameStillAsset = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0002_Red-Orange-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var redOrangeFlameMovingAsset = Asset("flameRedOrange", "assets/images/sprites/Red-Orange Flame GV/Red-Orange-Flame_0000_Red-Orange-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var orangeFlameParticleAsset1 = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var orangeFlameParticleAsset2 = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var orangeFlameParticleAsset3 = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var orangeFlameParticleAsset4 = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var orangeFlameStillAsset = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0002_Orange-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var orangeFlameMovingAsset = Asset("flameOrange", "assets/images/sprites/Orange Flame GV/Orange-Flame-Game_0000_Orange-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var blueFlameParticleAsset1 = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset2 = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset3 = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameParticleAsset4 = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 0.4, 0.4, 0.5, 0.5);
var blueFlameStillAsset = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0002_White-BaseN.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);
var blueFlameMovingAsset = Asset("flameBlue", "assets/images/sprites/Blue Flame GV/Blue-Flame-Game_0000_White-BaseR.png", 0.9, 0.75, 0.4, 0.4, 0.5, 0.6);

// From Will
var naia_flame = Asset("naia_flame", "assets/images/sprites/Naia/NaiaFlame GV.png", 1, 1, 1, 1, 0.5, 0.5);
var naia_flame_left = Asset("naia_flame_left", "assets/images/sprites/Naia/NaiaFlameLeft GV.png", 1, 1, 1, 1, 0.5, 0.5);
var naia_flame_right = Asset("naia_flame_right", "assets/images/sprites/Naia/NaiaFlameRight GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame = Asset("npc_flame", "assets/images/sprites/NPC/NPCflame GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame_left = Asset("npc_flame_left", "assets/images/sprites/NPC/NPCflameLeft GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame_right = Asset("npc_flame_right", "assets/images/sprites/NPC/NPCflameRight GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame_2 = Asset("npc_flame_2", "assets/images/sprites/NPC/NPCflame2 GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame_2_left = Asset("npc_flame_2_left", "assets/images/sprites/NPC/NPCflame2Left GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_flame_2_right = Asset("npc_flame_2_right", "assets/images/sprites/NPC/NPCflame2Right GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_unique = Asset("npc_unique", "assets/images/sprites/Unique NPC/NPCunique GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_unique_left = Asset("npc_unique_left", "assets/images/sprites/Unique NPC/NPCuniqueLeft GV.png", 1, 1, 1, 1, 0.5, 0.5);
var npc_unique_right = Asset("npc_unique_right", "assets/images/sprites/Unique NPC/NPCuniqueRight GV.png", 1, 1, 1, 1, 0.5, 0.5);
var water_wraith = Asset("water_wraith", "assets/images/sprites/Water Wraith/waterWraith GV.png", 1, 1, 1, 1, 0.5, 0.5);
var water_wraith_left = Asset("water_wraith_left", "assets/images/sprites/Water Wraith/waterWraithLeft GV.png", 1, 1, 1, 1, 0.5, 0.5);
var water_wraith_right = Asset("water_wraith_right", "assets/images/sprites/Water Wraith/waterWraithRight GV.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame = Asset("yellow_flame", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0002_Yellow-BaseN.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame_right = Asset("yellow_flame_right", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0000_Yellow-BaseR.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame_particle_1 = Asset("yellow_flame_particle_1", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame_particle_2 = Asset("yellow_flame_particle_2", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame_particle_3 = Asset("yellow_flame_particle_3", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 1, 1, 0.5, 0.5);
var yellow_flame_particle_4 = Asset("yellow_flame_particle_4", "assets/images/sprites/Yellow Flame GV/Yellow-Flame_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame = Asset("white_flame", "assets/images/sprites/White Flame GV/White-Flame_0002_White-BaseN.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame_right = Asset("white_flame_right", "assets/images/sprites/White Flame GV/White-Flame_0000_White-BaseR.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame_particle_1 = Asset("white_flame_particle_1", "assets/images/sprites/White Flame GV/White-Flame_0002s_0003_Red-Base-ParticlesN-1.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame_particle_2 = Asset("white_flame_particle_2", "assets/images/sprites/White Flame GV/White-Flame_0002s_0002_Red-Base-ParticlesN-2.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame_particle_3 = Asset("white_flame_particle_3", "assets/images/sprites/White Flame GV/White-Flame_0002s_0001_Red-Base-ParticlesN-3.png", 1, 1, 1, 1, 0.5, 0.5);
var white_flame_particle_4 = Asset("white_flame_particle_4", "assets/images/sprites/White Flame GV/White-Flame_0002s_0000_Red-Base-ParticlesN-4.png", 1, 1, 1, 1, 0.5, 0.5);
var brick_platform = Asset("brick_platform", "assets/images/The Marsh/Platform GV.png", 1, 1, 1, 1, 0.5, 0.5);
var true_trunk = Asset("true_trunk", "assets/images/The Marsh/TheOneTrueTrunk GV.png", 1, 1, 1, 1, 0.5, 0.5);

//Items

var item_coal = Asset("item_coal", "assets/images/Player Items/coal GV.png", 1, 1, 1, 1, 0.5, 0.5);
var item_flash_powder = Asset("item_flash_powder", "assets/images/Player Items/flashPowder GV.png", 1, 1, 1, 1, 0.5, 0.5);
var item_comp_card = Asset("item_comp_card", "assets/images/Player Items/IgnisCoCard GV.png", 1, 1, 1, 1, 0.5, 0.5);
var item_comp_package = Asset("item_comp_package", "assets/images/Player Items/IgnisPkg GV.png", 1, 1, 1, 1, 0.5, 0.5);
var item_naia_charm = Asset("item_naia_charm", "assets/images/Player Items/NaiaCharm GV.png", 1, 1, 1, 1, 0.5, 0.5);

//assets for testing
var wallAsset = Asset("wall", "assets/images/spr_castleOuterWallBIG_0.png", 1, 1, 1, 1, 0.5, 0.5);
var otherWallAsset = Asset("wall", "assets/images/spr_otherWall_0.png", 1, 1, 1, 1, 0.5, 0.5);

//main menu assets
var mainMenuBackground = Asset("menuBackground", "assets/images/mainMenuBackgrd srt_qt.png", 1, 1, 1, 1, 0, 0);
var mainMenuSelector = Asset("menuSelector", "assets/images/menuSelector GV.png", 1, 1, 1, 1, 0, 0);

var backgroundArray = [];
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

var mainMenu;

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
PIXI.Loader.shared.add ("Main menu background", "assets/audio/soundtracks/Main menu background.wav");
PIXI.Loader.shared.add ("endCaptions", "assets/audio/soundtracks/EndCaptions.mp3");
PIXI.Loader.shared.add ("grotto", "assets/audio/soundtracks/Grotto.wav");
PIXI.Loader.shared.add ("lightMarshAudio", "assets/audio/soundtracks/lightMarshAudio.wav");
PIXI.Loader.shared.add ("playDuringCaptions", "assets/audio/soundtracks/PlayduringCaptions.mp3");
PIXI.Loader.shared.add ("villagePart1And2", "assets/audio/soundtracks/villagePart1And2.ogg");

//Add dialogue to PIXI loader
PIXI.Loader.shared.add ("CheeryVillager", "dialogue/CheeryVillager.txt");
PIXI.Loader.shared.add ("MerchantCompanyAgent1", "dialogue/MerchantCompanyAgent1.txt");
PIXI.Loader.shared.add ("Naia1", "dialogue/Naia1.txt");
PIXI.Loader.shared.add ("Naia2", "dialogue/Naia2.txt");
PIXI.Loader.shared.add ("NPCText", "dialogue/NPCText.txt");
PIXI.Loader.shared.add ("TestDialogue", "dialogue/TestDialogue.txt");

//Add maps to PIXI loader
// Maps are special cases where file names must be complete path for both reference and path args
PIXI.Loader.shared.add ("Maps/debugMap.csv", "Maps/debugMap.csv");
PIXI.Loader.shared.add ("Maps/lightMarsh.csv", "Maps/lightMarsh.csv")

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
    mainMenu = MainMenu ();
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

		var arrays = [backgroundArray, wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

		for (var i = 0; i < arrays.length; i++) {
			for (var j = 0; j < arrays[i].length; j++) {
				arrays [i][j].scroll ();
			}
		}
	}
}

var depths = function () {
	childNum = 0;

	var arrays = [backgroundArray, wallArray, playerArray, enemyArray, controllerArray, generatedObjectsArray, NPCArray];

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
		areaController.unload ();
		mainMenu.resetMainMenu ();
		areaController.unload();
		state = onMainMenu;
	}
	else {
		updates();
    }
}
