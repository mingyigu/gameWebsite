import { fisherYates } from "../../utils/arrayUtils";

class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    isEqual(p: Point) {
        if (p.x == this.x && p.y == this.y) {
            return true;
        } else {
            return false;
        }
    }
}

class Circle {
    circle: boolean[][];
    length: number;
    cat: Point;

    constructor(length: number = 11) {
        this.length = length;
        for (let i = 0; i < length; i++) {
            let temp: boolean[] = [];
            for (let j = 0; j < length; j++) {
                temp.push(true);
            }
            this.circle.push(temp);
        }
        this.cat = new Point(Math.floor(length / 2), Math.floor(length / 2));
    }

    init(num: number = 8) {
        for (let i = 0; i < num; i++) {
            const x = Math.floor(Math.random() * this.length);
            const y = Math.floor(Math.random() * this.length);
            this.circle[x][y] = false;
        }
    }

    // 判断坐标是否违法
    isValid(x: number) {
        if (x < 0 || x >= this.length) {
            return true;
        } else {
            return false;
        }
    }

    // 返回当前点可移动到的所有位置
    availableMove(point: Point) { // x为横坐标，y为纵坐标
        const x = point.x;
        const y = point.y;
        if (this.isValid(x) || this.isValid(y)) {
            return [];
        }
        let res: Point[] = [];
        if (!this.isValid(x-1) && this.circle[x-1][y]) {
            res.push(new Point(x-1, y));
        }
        if (!this.isValid(x+1) && this.circle[x+1][y]) {
            res.push(new Point(x+1, y));
        }
        if (!this.isValid(y-1) && this.circle[x][y-1]) {
            res.push(new Point(x, y-1));
        }
        if (!this.isValid(y+1) && this.circle[x][y+1]) {
            res.push(new Point(x, y+1))
        }
        if (y % 2 == 0) {
            if (!this.isValid(x-1) && !this.isValid(y-1) && this.circle[x-1][y-1]) {
                res.push(new Point(x-1, y-1));
            }
            if (!this.isValid(x+1) && !this.isValid(y+1) && this.circle[x-1][y+1]) {
                res.push(new Point(x+1, y+1));
            }
        } else {
            if (!this.isValid(x-1) && !this.isValid(y+1) && this.circle[x-1][y+1]) {
                res.push(new Point(x-1, y+1));
            }
            if (!this.isValid(x+1) && !this.isValid(y-1) && this.circle[x+1][y-1]) {
                res.push(new Point(x+1, y-1));
            }
        }
        return fisherYates(res);
    }

    // 返回当前点是否可以逃脱
    isEscape(point: Point) {
        const x = point.x;
        const y = point.y;
        if (x == 0 || x == this.length-1 || y == 0 || y == this.length-1) {
            return true;
        } else {
            return false;
        }
    }

    // 以BFS策略移动猫
    moveCatWithBFS() {
        let queue: Point[];
        let pre: Point[][];
        queue.push(this.cat);
        let temp: boolean[][] = new Array(new Array(this.length));
        for (let i = 0; i < this.length; i++) {
            for (let j = 0; j < this.length; j++) {
                temp[i][j] = false;
            }
        }
        let isFind: Point | undefined;
        while (queue.length > 0 && !isFind) {
            const p = queue[0];
            if (this.isEscape(p)) {
                isFind = p;
                break;
            }
            temp[p.x][p.y] = true;
            queue.shift();
            const arr = this.availableMove(p);
            for (const i of arr) {
                if (!temp[i.x][i.y]) {
                    pre[i.x][i.y] = p;
                    queue.push(i);
                }
            }
        }
        if (!isFind) {
            return undefined;
        }
        while (!pre[isFind.x][isFind.y].isEqual(this.cat)) {
            isFind = pre[isFind.x][isFind.y];
        }
        return isFind;
    }

    // 设置障碍物
    setBarrier(x: number, y: number) {
        if (!this.isValid(x) && !this.isValid(y)) {
            this.circle[x][y] = false;
        }
    }
}

export { Circle, Point };