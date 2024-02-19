class Colony {
    constructor() {
        this.colonists = [];
        this.enemies = [];
        this.items = [];
        this.buildings = new Array(Colony.SIZE).fill(0).map(() => []);
    };

    static get SIZE() {
        return 20;
    }

    static get CELL_SIZE() {
        return 64;
    }

    static randCoordInCell(cell, padding = new Vector(0, 0)) {
        function randOffset(padding) {
            return (Colony.CELL_SIZE - padding) * Math.random();
        }
        return Vector.add(Vector.cellToWorldSpace(cell), new Vector(randOffset(padding.x), randOffset(padding.y)));
    }

    init() {

        GAME.addEntity(SELECTOR);

        const astronaut = new Astronaut(new Vector(10, 10));
        GAME.addEntity(new Rock(2, 0, 2, 2));
        GAME.addEntity(new Rock(7, 6, 2, 2));
        GAME.addEntity(new Rock(5, 3, 4, 1));
        GAME.addEntity(new Rock(3, 7, 1, 1));
        GAME.addEntity(astronaut);
        this.colonists.push(astronaut);

        for (let i = 0; i < Colony.SIZE; i++) {
            for (let j = 0; j < Colony.SIZE; j++) {
                GAME.addEntity(new Ground(new Vector(i, j)));
            }
        }
    }

    addBuilding(building) {
        const x = building.cellX;
        const y = building.cellY;
        for (let i = x; i < x + building.sizeX; i++) {
            for (let j = y; j < y + building.sizeY; j++) {
                this.buildings[i][j] = building;
            }
        }
    }
}