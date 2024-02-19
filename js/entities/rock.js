class Rock {
    constructor(cellX, cellY, sizeX, sizeY) {
        this.cellX = cellX;
        this.cellY = cellY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;

        COLONY.addBuilding(this);
    }

    static get SPRITESHEET() {
        return "./images/rock.png";
    }

    update() {

    }

    draw() {
        CTX.fillStyle = "#33160a";
        CTX.fillRect(this.cellX * Colony.CELL_SIZE, this.cellY * Colony.CELL_SIZE, 
            this.sizeX * Colony.CELL_SIZE, this.sizeY * Colony.CELL_SIZE);
    }
}