class Colony {
    constructor() {
        this.colonists = [];
        this.enemies = [];
        this.items = [];
        this.buildings = new Array(Colony.SIZE).fill(0).map(() => []);
        this.ore = 0;
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
        for (let i = 0; i < Colony.SIZE; i++) {
            for (let j = 0; j < Colony.SIZE; j++) {
                GAME.addEntity(new Ground(new Vector(i, j)));
            }
        }

        const astronaut = new Astronaut(new Vector(10, 10));
        GAME.addEntity(new Rock(new Vector(2, 0)));
        GAME.addEntity(new Rock(new Vector(5, 5)));
        GAME.addEntity(new Rock(new Vector(3, 2)));
        GAME.addEntity(new Rock(new Vector(7, 3)));
        GAME.addEntity(astronaut);
        GAME.addEntity(new Martian(new Vector(500, 500)));
        this.colonists.push(astronaut);

        GAME.addEntity(SELECTOR);
    }

    addBuilding(building, size) {
        const cell = Vector.worldToCellSpace(building.pos);
        for (let i = cell.x; i < cell.x + size.x; i++) {
            for (let j = cell.y; j < cell.y + size.y; j++) {
                this.buildings[i][j] = building;
            }
        }
    }

    buildingAt(pos) {
        const cell = Vector.worldToCellSpace(pos);
        console.log(this.buildings[cell.x][cell.y]);
        return this.buildings[cell.x][cell.y];
    }
}