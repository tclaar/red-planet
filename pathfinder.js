class Pathfinder {
    constructor() {
        this.obstacles = new Array(Pathfinder.MAP_SIZE).fill(0).map(() => []);
    };

    static get MAP_SIZE() {
        return 20;
    }

    static get CELL_SIZE() {
        return 64;
    }

    static cellIndexOf(coordinate) {
        return Math.floor(coordinate / Pathfinder.CELL_SIZE);
    }

    static randCoordInCell(cellI) {
        //return Math.floor(Pathfinder.CELL_SIZE * (cellI + Math.random())) - 48;
        return Pathfinder.CELL_SIZE * cellI + 8;
    }

    addObstacle(obstacle) {
        const x = obstacle.cellX;
        const y = obstacle.cellY;
        for (let i = x; i < x + obstacle.sizeX; i++) {
            for (let j = y; j < y + obstacle.sizeY; j++) {
                this.obstacles[i][j] = obstacle;
            }
        }
    }

    findPath(startX, startY, endX, endY) {
        const startI = Pathfinder.cellIndexOf(startX);
        const startJ = Pathfinder.cellIndexOf(startY);
        const paths = new Array(Pathfinder.MAP_SIZE).fill(0).map(() => []);
        const pq = new Pathfinder.PQ();
        for (let i = 0; i < Pathfinder.MAP_SIZE; i++) {
            for (let j = 0; j < Pathfinder.MAP_SIZE; j++) {
                if (!this.obstacles[i][j]) {
                    const node = {i: i, j: j, prev: null, len: Infinity};
                    paths[i][j] = node;
                    pq.insert(node);
                }
            }
        }
        pq.decrease(paths[startI][startJ], 0);
        

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
        let i = startI;
        let j = startJ;
        while (i != Pathfinder.cellIndexOf(endX) || j != Pathfinder.cellIndexOf(endY)) {
            comparePath(curr, i - 1, j);
            comparePath(curr, i + 1, j);
            comparePath(curr, i, j - 1);
            comparePath(curr, i, j + 1);

            curr = pq.pop();
            i = curr.i;
            j = curr.j;
        }

        const path = new Path();
        while (curr) {
            path.prepend(Pathfinder.randCoordInCell(curr.i), Pathfinder.randCoordInCell(curr.j));
            curr = curr.prev;
        }
        
        return path;
    }
    static PQ = class MinHeap {
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

class Path {
    constructor() {
        this.steps = [];
    }

    prepend(x, y) {
        this.steps.push({x: x, y: y});
    }

    next() {
        return this.steps.pop();
    }

    hasNext() {
        return this.steps.length > 0;
    }
}