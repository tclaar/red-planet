/**
 * A class which represents a 2-dimensional vector that can be used for positions,
 * sizes, or other constructs with two numerical fields.
 * 
 * While you should directly access the fields of this class to read their values, 
 * please avoid mutating them. Instead, make use of the provided methods to create
 * new instances.
 * 
 * @author Trae Claar
 */
class Vector {
    /**
     * Constructor for a Vector. 
     * 
     * @param {number} x the x-component of the Vector
     * @param {number} y the y-component of the Vector
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    /**
     * Add two Vector instances together.
     * 
     * @param {Vector} a the first Vector to add
     * @param {Vector} b the second Vector to add
     * @returns {Vector} the sum of a and b
     */
    static add(a, b) {
        return new Vector(a.x + b.x, a.y + b.y);
    };

    /**
     * Subtract one Vector instance from another.
     * 
     * @param {Vector} a the Vector from which to subtract the other
     * @param {Vector} b the Vector to subtract from the other
     * @returns {Vector} the quotient of a and b (a - b)
     */
    static subtract(a, b) {
        return new Vector(a.x - b.x, a.y - b.y);
    };

    /**
     * Multiplies a Vector by a scalar.
     * 
     * @param {Vector} v the Vector to multiply
     * @param {number} s the number by which to multiply the Vector
     * @returns {Vector} the product of v and s
     */
    static multiply(v, s) {
        return new Vector(s * v.x, s * v.y);
    };

    /**
     * Calculates the magnitude of the provided Vector. 
     * |v| = sqrt(x^2 + y^2), where x and y are v's x- and and y-component respectively.
     * 
     * @param v the Vector for which to calculate magnitude
     * @returns {number} the Vector's magnitude
     */
    static magnitude(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2);
    };

    /**
     * Calculates the unit vector for the provided Vector. 
     * u = v/|v| 
     * 
     * @param v the Vector for which to calculate the unit vector
     * @returns {Vector} the unit vector corresponding to the current instance
     */
    static unit(v) {
        const magnitude = Vector.magnitude(v);
        return new Vector(v.x / magnitude, v.y / magnitude);
    };

    /**
     * Finds the distance between two Vector instances.
     * 
     * @param {Vector} a the first Vector
     * @param {Vector} b the second Vector
     * @returns {number} the distance between a and b
     */
    static distance(a, b) {
        return Vector.magnitude(Vector.subtract(a, b));
    };

    /**
     * Calculates the vector corresponding to the direction between two Vector instances.
     * The returned vector will always be a unit vector.
     * 
     * @param {Vector} a the Vector to find the direction from
     * @param {Vector} b the Vector to find the direction to
     * @returns {Vector} the direction from a to b
     */
    static direction(a, b) {
        return Vector.unit(Vector.subtract(b, a));
    };

    /**
     * Round the provided Vector's fields.
     * 
     * @param {Vector} v the Vector to round
     * @returns {Vector} a Vector with integer field values
     */
    static round(v) {
        return new Vector(Math.round(v.x), Math.round(v.y));
    }

    /**
     * Convert the provided Vector from world to cell coordinates.
     * 
     * @param {Vector} v the Vector to convert
     * @returns {Vector} a new Vector instance in cell coordinates
     */
    static worldToCellSpace(v) {
        return new Vector(Math.floor(v.x / Colony.CELL_SIZE), Math.floor(v.y / Colony.CELL_SIZE));
    }

    /**
     * Convert the provided Vector from cell to world coordinates.
     * 
     * @param {Vector} v the Vector to convert
     * @returns {Vector} a new Vector instance in world coordinates
     */
    static cellToWorldSpace(v) {
        return Vector.multiply(v, Colony.CELL_SIZE);
    }

    /**
     * Check whether the provided Vectors are equal.
     * 
     * @param {Vector} a the first Vector to compare
     * @param {Vector} b the second Vector to compare
     * @returns {boolean} true if the Vectors are equal, false otherwise
     */
    static equal(a, b) {
        return a.x === b.x && a.y === b.y;
    }
}