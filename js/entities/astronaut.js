class Astronaut {
    constructor(pos) {
        this.pos = pos;
        this.target = pos;
        this.state = "idle";
        this.lastAttack = 0;

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

    static get ATTACK_INTERVAL() {
        return 1000;
    }

    static get SCALED_SIZE() {
        return Vector.multiply(Astronaut.SIZE, Astronaut.SCALE);
    }

    setTarget(target, building) {
        this.targetBuilding = building;
        this.target = this.pos;
        this.path = Path.findPath(this.pos, target);
    }

    getFacing() {
        return (this.target.x - this.pos.x < 0) ? "left" : "right";
    }

    fireLaser(target) {
        let start = new Vector(this.pos.x, this.pos.y + Astronaut.SCALED_SIZE.y / 2);
        if (this.getFacing() === "right") {
            start = Vector.add(start, new Vector(Astronaut.SCALED_SIZE.x, 0));
        }
        GAME.addEntity(new Laser(start, target, "red"));
    }

    update() {
        if (Vector.distance(this.pos, this.target) < 10) {
            if (this.path && this.path.hasNext()) {
                this.target = this.path.next();
            } else {
                if (this.targetBuilding) {
                    if (this.targetBuilding instanceof Rock) {
                        this.state = "mining";
                    }
                } else {
                    this.state = "idle";
                }
            }
        } else {
            this.state = "walking";
            this.pos = Vector.add(this.pos, Vector.multiply(
                Vector.direction(this.pos, this.target), GAME.clockTick * Astronaut.SPEED));
        }

        if (this.state === "mining" 
            && Date.now() - this.lastAttack > Astronaut.ATTACK_INTERVAL) {
            
            this.lastAttack = Date.now();
            this.fireLaser(Vector.add(this.targetBuilding.pos, Vector.multiply(this.targetBuilding.size, 1/2)));
            COLONY.ore += 1;
            console.log(COLONY.ore);
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
        
        this.animations["left"]["mining"] = new Animator("./images/astronaut.png", new Vector(0, 32), Astronaut.SIZE, 1, 1);
        this.animations["right"]["mining"] = new Animator("./images/astronaut.png", new Vector(16, 32), Astronaut.SIZE, 1, 1);
    }
}