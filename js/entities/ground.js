class Ground {
    constructor(cellPos) {
        this.pos = Vector.cellToWorldSpace(cellPos);
        this.animation = new Animator("./images/tile.png", new Vector(0, 0), Ground.SIZE, 1, 1);
    }

    static get SIZE() {
        return new Vector(64, 64);
    }

    update() {

    }

    draw() {
        this.animation.drawFrame(this.pos, 2);
    }
}