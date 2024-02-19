/**
 * Class that represents a path containing a series of points that can be consumed
 * one after the other. A Path between two points can be created using the static
 * findPath method. 
 * 
 * @author Trae Claar
 */
class Path {
    /**
     * Constructor that creates an empty Path.
     */
    constructor() {
        this.steps = [];
    }

    /**
     * Add a step to the start of the path.
     * 
     * @param {Vector} step the point to add as a step
     */
    prepend(step) {
        this.steps.push(step);
    }

    /**
     * Consume the next step. Removes it from the Path and returns it.
     * 
     * @returns {Vector} the next step in the path
     */
    next() {
        return this.steps.pop();
    }

    /**
     * Indicates whether or not there is another step in the path.
     * 
     * @returns {boolean} true if there is another step in the path, false otherwise
     */
    hasNext() {
        return this.steps.length > 0;
    }

    /**
     * Builds and returns a Path between the two provided points.
     * 
     * @param {Vector} start the starting point of the Path
     * @param {Vector} end the ending point of the path
     * @returns {Path} a Path between start and end
     */
    static findPath(start, end) {
        const startCell = Vector.worldToCellSpace(start);
        const endCell = Vector.worldToCellSpace(end);
        const paths = new Array(Colony.SIZE).fill(0).map(() => []);
        const pq = new Path.PriorityQueue();
        for (let i = 0; i < Colony.SIZE; i++) {
            for (let j = 0; j < Colony.SIZE; j++) {
                if (!COLONY.buildings[i][j]) {
                    const node = {cell: new Vector(i, j), prev: null, len: Infinity};
                    paths[i][j] = node;
                    pq.insert(node);
                }
            }
        }

        pq.decrease(paths[startCell.x][startCell.y], 0);

        function comparePath(a, i, j) {
            if (paths[i] && paths[i][j]) {
                const b = paths[i][j];
                if (a.len + 1 < b.len) {
                    b.prev = a;
                    pq.decrease(b, a.len + 1);
                }
            }
        }
        let curr = pq.pop();
        while (!Vector.equal(curr.cell, endCell)) {
            comparePath(curr, curr.cell.x - 1, curr.cell.y);
            comparePath(curr, curr.cell.x + 1, curr.cell.y);
            comparePath(curr, curr.cell.x, curr.cell.y - 1);
            comparePath(curr, curr.cell.x, curr.cell.y + 1);

            curr = pq.pop();
        }

        const path = new Path();
        while (curr) {
            path.prepend(Colony.randCoordInCell(curr.cell, Astronaut.SCALED_SIZE));
            curr = curr.prev;
        }
        return path;
    }

    /**
     * A specialized PriorityQueue used by the findPath method for its pathfinding 
     * algorithm.
     * 
     * @author Trae Claar
     */
    static PriorityQueue = class MinHeap {
        constructor() {
            this.heap = [];
        }

        static parentIndexOf(i) {
            return Math.floor((i - 1) / 2);
        }
      
        updateIndex(i) {
            this.heap[i].heapIndex = i;
        }

        swap(i, j) {
            const temp = this.heap[i];
            this.heap[i] = this.heap[j];
            this.heap[j] = temp;
            this.updateIndex(i);
            this.updateIndex(j);
        }
      
        heapifyUp(i) {
            while (i > 0 && this.heap[i].len < this.heap[MinHeap.parentIndexOf(i)].len) {
                const parentI = MinHeap.parentIndexOf(i);
                this.swap(i, parentI);
                i = parentI;
            }
        }
      
        heapifyDown(i) {
            const heapLen = this.heap.length;
            while (2 * i + 1 < heapLen) {
                let minI = 2 * i + 1;
                if (2 * i + 2 < heapLen && this.heap[minI].len > this.heap[2 * i + 2].len) {
                    minI = 2 * i + 2;
                }

                this.swap(i, minI);
                i = minI;
            }
        }
      
        insert(e) {
            this.heap.push(e);

            const i = this.heap.length - 1;
            this.updateIndex(i);
            this.heapifyUp(i);
        }
      
        decrease(node, newLen) {
            const i = node.heapIndex;
            this.heap[i].len = newLen;
            this.heapifyUp(i);
        }
      
        pop() {
            if (this.heap.length == 1) {
                return this.heap.pop();
            }

            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.updateIndex(0);
            this.heapifyDown(0);

            return min;
        }
    }  
}