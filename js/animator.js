class Animator {
    constructor(spritesheetPath, start, size, frameCount, frameDuration) {
        Object.assign(this, {start, size, frameCount, frameDuration});

        this.spritesheet = ASSET_MANAGER.getAsset(spritesheetPath);
        this.elapsedTime = 0;
        this.totalTime = frameCount * frameDuration;
    };

    drawFrame(pos, scale) {
        this.elapsedTime += GAME.clockTick;
        if (this.elapsedTime >= this.totalTime) {
            this.elapsedTime = 0;
        }
        
        CTX.drawImage(this.spritesheet, this.start.x + this.currentFrame() * this.size.x, 
            this.start.y, this.size.x, this.size.y, pos.x, pos.y, this.size.x * scale, 
            this.size.y * scale);
        
    }

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    }
}