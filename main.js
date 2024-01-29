const GAME = new GameEngine();

const ASSET_MANAGER = new AssetManager();
const PATHFINDER = new Pathfinder();
let ASTRONAUT;

ASSET_MANAGER.queueDownload("./astronaut.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	GAME.init(ctx);

	ASTRONAUT = new Astronaut(10, 10)
	GAME.addEntity(new Rock(2, 0, 2, 2));
	GAME.addEntity(new Rock(7, 6, 2, 2));
	GAME.addEntity(new Rock(5, 3, 4, 1));
	GAME.addEntity(new Rock(3, 7, 1, 1));
	GAME.addEntity(ASTRONAUT);

	GAME.start();
});
