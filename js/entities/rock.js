class Rock {
    constructor(cell) {
        this.pos = Vector.cellToWorldSpace(cell);
        this.size = Vector.multiply(Rock.SIZE, 2);

        this.animator = new Animator(
            Rock.SPRITESHEET, 
            new Vector(0, 0), 
            Rock.SIZE,
            1, 1);

        COLONY.addBuilding(this, Rock.CELL_SIZE);
    }

    static get SPRITESHEET() {
        return "./images/rock.png";
    }

    static get SIZE() {
        return new Vector(32, 32);
    }

    static get CELL_SIZE() {
        return new Vector(1, 1);
    }

    update() {

    }

    draw() {
        this.animator.drawFrame(this.pos, 2);
    }
}