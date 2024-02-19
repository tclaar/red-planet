class Martian {
    constructor(pos) {
        this.pos = pos;
        this.target = pos;
        this.state = "idle";
        this.lastAttack = 0;

        this.loadAnimations();
    }

    static get SPRITESHEET() {
        return "./images/martian.png";
    }

    static get SIZE() {
        return new Vector(16, 16);
    }

    static get SPEED() {
        return 80;
    }

    static get ATTACK_DISTANCE() {
        return 64;
    }

    static get ATTACK_INTERVAL() {
        return 1000;
    }

    static get SCALED_SIZE() {
        return Vector.multiply(Martian.SIZE, 2);
    }

    setTarget(target) {
        this.target = this.pos;
        this.path = Path.findPath(this.pos, target);
    }

    getFacing() {
        return (this.target.x - this.pos.x < 0) ? "left" : "right";
    }

    fireLaser(target) {
        let start = new Vector(this.pos.x, this.pos.y + Martian.SCALED_SIZE.y / 2);
        if (this.getFacing() === "right") {
            start = Vector.add(start, new Vector(Martian.SCALED_SIZE.x, 0));
        }
        GAME.addEntity(new Laser(start, target, "green"));
    }

    update() {

        let victim;
        COLONY.colonists.forEach((colonist) => {
            if (Vector.distance(colonist.pos, this.pos) < Martian.ATTACK_DISTANCE) {
                victim = colonist;
            }
        });

        if (victim) {
            this.state = "attacking";
            if (Date.now() - this.lastAttack > Martian.ATTACK_INTERVAL) {
                this.lastAttack = Date.now();
                this.fireLaser(Vector.add(victim.pos, Vector.multiply(Astronaut.SCALED_SIZE, 1/2)));
            }
            return;
        }

        if (Vector.distance(this.pos, this.target) < 10) {
            if (this.path && this.path.hasNext()) {
                this.target = this.path.next();
            } else {
                this.state = "idle";
            }
        } else {
            this.state = "walking";
            this.pos = Vector.add(this.pos, Vector.multiply(
                Vector.direction(this.pos, this.target), GAME.clockTick * Martian.SPEED));
        }
    }

    draw() {
        this.animations[this.getFacing()][this.state].drawFrame(this.pos, 2);
    }

    loadAnimations() {
        this.animations = [];
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(Martian.SPRITESHEET, new Vector(0, 0), Martian.SIZE, 1, 1);
        this.animations["right"]["idle"] = new Animator(Martian.SPRITESHEET, new Vector(0, 16), Martian.SIZE, 1, 1);

        this.animations["left"]["walking"] = new Animator(Martian.SPRITESHEET, new Vector(0, 0), Martian.SIZE, 4, 0.16);
        this.animations["right"]["walking"] = new Animator(Martian.SPRITESHEET, new Vector(0, 16),Martian.SIZE, 4, 0.16);
        
        this.animations["left"]["attacking"] = new Animator(Martian.SPRITESHEET, new Vector(0, 32), Martian.SIZE, 1, 1);
        this.animations["right"]["attacking"] = new Animator(Martian.SPRITESHEET, new Vector(16, 32), Martian.SIZE, 1, 1);
    }
}