class Laser {
    constructor(start, end, color) {
        this.start = start;
        this.end = end;
        this.color = color;
        this.created = Date.now();
    }

    static get DURATION() {
        return 500;
    }

    update() {
        if (Date.now() - this.created > Laser.DURATION) {
            this.removeFromWorld = true;
        }
    }

    draw() {
        CTX.beginPath();
        CTX.strokeStyle = this.color;
        CTX.moveTo(this.start.x, this.start.y);
        CTX.lineTo(this.end.x, this.end.y);
        CTX.stroke();
    }
}