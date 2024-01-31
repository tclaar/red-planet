class Astronaut {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetX = x;
        this.targetY = y;
        this.state = "idle";
        this.facing = "left";

        this.loadAnimations();
    }

    setDest(x, y) {
        this.targetX = this.x;
        this.targetY = this.y;
        this.path = PATHFINDER.findPath(this.x, this.y, x, y);
    }

    update() {
        let deltaX = this.targetX - this.x;
        let deltaY = this.targetY - this.y;
        let targetDist = Math.hypot(deltaX, deltaY);

        if (targetDist < 10) {
            if (this.path && this.path.hasNext()) {
                console.log("ok");
                const step = this.path.next();
                this.targetX = step.x;
                this.targetY = step.y;
            } else {
                this.state = "idle";
            }
        } else {
            this.state = "walking";
            this.facing = (deltaX < 0) ? "left" : "right";
            this.x += deltaX / targetDist * GAME.clockTick * 50;
            this.y += deltaY / targetDist * GAME.clockTick * 50;
        }
    }

    draw() {
        this.animations[this.facing][this.state].drawFrame(GAME.clockTick, GAME.ctx, this.x, this.y, 3)
    }

    loadAnimations() {
        this.animations = [];
        this.animations["left"] = [];
        this.animations["right"] = [];

        this.animations["left"]["idle"] = new Animator(ASSET_MANAGER.getAsset("./astronaut.png"), 0, 0, 16, 16, 1, 1);
        this.animations["right"]["idle"] = new Animator(ASSET_MANAGER.getAsset("./astronaut.png"), 0, 16, 16, 16, 1, 1);

        this.animations["left"]["walking"] = new Animator(ASSET_MANAGER.getAsset("./astronaut.png"), 16, 0, 16, 16, 4, 0.16);
        this.animations["right"]["walking"] = new Animator(ASSET_MANAGER.getAsset("./astronaut.png"), 16, 16, 16, 16, 4, 0.16);
    }
}