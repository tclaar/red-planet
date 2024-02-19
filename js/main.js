const ASSET_MANAGER = new AssetManager();
const GAME = new GameEngine();
const CTX = document.getElementById("game-world").getContext("2d");
const SELECTOR = new Selector();
const COLONY = new Colony();

ASSET_MANAGER.queueDownload("./images/astronaut.png");
ASSET_MANAGER.queueDownload("./images/tile.png");

CTX.imageSmoothingEnabled = false;

ASSET_MANAGER.downloadAll(() => {
	GAME.init();

	COLONY.init();

	GAME.start();
});
