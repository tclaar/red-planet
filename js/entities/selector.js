class Selector {
    constructor() {
        this.selection = [];
    }

    static get INDCTR_CORNER_SIZE() {
        return 10;
    }

    static get INDCTR_CORNER_THICKNESS() {
        return 3;
    }

    selectAt(pos) {
        let target = null;
        COLONY.colonists.forEach((colonist) => {
            if (isPointInArea(pos, colonist.pos, Astronaut.SCALED_SIZE)) {
                target = colonist;
            }
        });
        if (target) {
            this.selection.push(target);
        } else {
            this.selection = [];
        }
    }

    setSelectionTarget(target) {
        this.selection.forEach((colonist) => {
            colonist.setTarget(target, COLONY.buildingAt(target));
        });
       
    }

    update() {

    }

    draw() {
        const size = Selector.INDCTR_CORNER_SIZE;
        const thickness = Selector.INDCTR_CORNER_THICKNESS;

        this.selection.forEach((colonist) => {
            CTX.fillStyle = "white";

            // draw top left corner
            CTX.fillRect(colonist.pos.x - thickness, colonist.pos.y - thickness, 
                size, thickness);
            CTX.fillRect(colonist.pos.x - thickness, colonist.pos.y - thickness, 
                thickness, size);

            // draw top right corner
            CTX.fillRect(colonist.pos.x + Astronaut.SCALED_SIZE.x - size, colonist.pos.y - thickness, 
                size, thickness);
            CTX.fillRect(colonist.pos.x + Astronaut.SCALED_SIZE.x - thickness, colonist.pos.y - thickness, 
                thickness, size);

            // draw bottom left corner
            CTX.fillRect(colonist.pos.x - thickness, colonist.pos.y + Astronaut.SCALED_SIZE.y, 
                size, thickness);
            CTX.fillRect(colonist.pos.x - thickness, colonist.pos.y + Astronaut.SCALED_SIZE.y - size + thickness, 
                thickness, size);

            // draw top right corner
            CTX.fillRect(colonist.pos.x + Astronaut.SCALED_SIZE.x - size, colonist.pos.y + Astronaut.SCALED_SIZE.y, 
                size, thickness);
            CTX.fillRect(colonist.pos.x + Astronaut.SCALED_SIZE.x - thickness,colonist.pos.y + Astronaut.SCALED_SIZE.y - size + thickness, 
                thickness, size);
        });
    }
}