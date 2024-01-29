class Rock {
    constructor(cellX, cellY, sizeX, sizeY) {
        this.cellX = cellX;
        this.cellY = cellY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        PATHFINDER.addObstacle(this);
    }

    update() {

    }

    draw() {
        GAME.ctx.fillStyle = "#33160a";
        GAME.ctx.fillRect(this.cellX * Pathfinder.CELL_SIZE, this.cellY * Pathfinder.CELL_SIZE, 
            this.sizeX * Pathfinder.CELL_SIZE, this.sizeY * Pathfinder.CELL_SIZE);
    }
}