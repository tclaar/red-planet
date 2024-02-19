class Astronaut {
    constructor(pos) {
        this.pos = pos;
        this.target = pos;
        this.state = "idle";

        this.loadAnimations();
    }

    static get SPEED() {
        return 50;
    }

    static get SIZE() {
        return new Vector(16, 16);
    }

    static get SCALE() {
        return 2;
    }

    static get SCALED_SIZE() {
        return Vector.multiply(Astronaut.SIZE, Astronaut.SCALE);
    }

    setTarget(target) {
        this.target = this.pos;
        this.path = Path.findPath(this.pos, target);
    }

    getFacing() {
        return (this.target.x - this.pos.x < 0) ? "left" : "right";
    }

    update() {
        if (Vector.distance(this.pos, this.target) < 10) {
            if (this.path && this.path.hasNext()) {
                this.target = this.path.next();
            } else {
                this.state = "idle";
            }
        } else {
            this.state = "walking";
            this.pos = Vector.add(this.pos, Vector.multiply(
                Vector.direction(this.pos, this.target), GAME.clockTick * Astronaut.SPEED));
        }
    }

    draw() {
        this.animations[this.getFacing()][this.state].drawFrame(this.pos, Astronaut.SCALE);
    }

    loadAnimations() {
        this.animations = [];
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator("./images/astronaut.png", new Vector(0, 0), Astronaut.SIZE, 1, 1);
        this.animations["right"]["idle"] = new Animator("./images/astronaut.png", new Vector(0, 16), Astronaut.SIZE, 1, 1);

        this.animations["left"]["walking"] = new Animator("./images/astronaut.png", new Vector(16, 0), Astronaut.SIZE, 4, 0.16);
        this.animations["right"]["walking"] = new Animator("./images/astronaut.png", new Vector(16, 16), Astronaut.SIZE, 4, 0.16);
    }
}