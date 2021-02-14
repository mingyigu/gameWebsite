import { fisherYates } from "../../utils/arrayUtils.js";

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    isEqual(p) {
        if (p.x == this.x && p.y == this.y) {
            return true;
        }
        else {
            return false;
        }
    }
}

class Circle {
    constructor(length = 11) {
        this.length = length;
        this.circle = [];
        for (let i = 0; i < length; i++) {
            let temp = [];
            for (let j = 0; j < length; j++) {
                temp.push(true);
            }
            this.circle.push(temp);
        }
        this.cat = new Point(Math.floor(length / 2), Math.floor(length / 2));
    }

    init(num = 8) {
        for (let i = 0; i < num; i++) {
            const x = Math.floor(Math.random() * this.length);
            const y = Math.floor(Math.random() * this.length);
            if (this.cat.x == x && this.cat.y == y) {
                continue;
            }
            this.circle[x][y] = false;
        }
    }

    // 判断坐标是否违法
    isValid(x) {
        if (x < 0 || x >= this.length) {
            return true;
        }
        else {
            return false;
        }
    }

    // 返回当前点可移动到的所有位置
    availableMove(point) {
        const x = point.x;
        const y = point.y;
        if (this.isValid(x) || this.isValid(y)) {
            return [];
        }
        let res = [];
        if (!this.isValid(x - 1) && this.circle[x - 1][y]) {
            res.push(new Point(x - 1, y));
        }
        if (!this.isValid(x + 1) && this.circle[x + 1][y]) {
            res.push(new Point(x + 1, y));
        }
        if (!this.isValid(y - 1) && this.circle[x][y - 1]) {
            res.push(new Point(x, y - 1));
        }
        if (!this.isValid(y + 1) && this.circle[x][y + 1]) {
            res.push(new Point(x, y + 1));
        }
        if (x % 2 == 1) {
            if (!this.isValid(x - 1) && !this.isValid(y + 1) && this.circle[x - 1][y + 1]) {
                res.push(new Point(x - 1, y + 1));
            }
            if (!this.isValid(x + 1) && !this.isValid(y + 1) && this.circle[x + 1][y + 1]) {
                res.push(new Point(x + 1, y + 1));
            }
        }
        else {
            if (!this.isValid(x + 1) && !this.isValid(y - 1) && this.circle[x + 1][y - 1]) {
                res.push(new Point(x + 1, y - 1));
            }
            if (!this.isValid(x - 1) && !this.isValid(y - 1) && this.circle[x - 1][y - 1]) {
                res.push(new Point(x - 1, y - 1));
            }
        }
        return fisherYates(res);
    }

    // 返回当前点是否可以逃脱
    isEscape(point) {
        const x = point.x;
        const y = point.y;
        if (x == 0 || x == this.length - 1 || y == 0 || y == this.length - 1) {
            return true;
        }
        else {
            return false;
        }
    }

    // 以BFS策略移动猫
    moveCatWithBFS() {
        if (this.isEscape(this.cat)) {
            return this.cat;
        }
        let queue = [];
        let pre = [];
        queue.push(this.cat);
        let temp = [];
        for (let i = 0; i < this.length; i++) {
            let t = [];
            let p = [];
            for (let j = 0; j < this.length; j++) {
                t.push(false);
                p.push(undefined);
            }
            temp.push(t);
            pre.push(p);
        }
        temp[this.cat.x][this.cat.y] = true;
        let isFind;
        while (queue.length > 0 && !isFind) {
            const p = queue[0];
            if (this.isEscape(p)) {
                isFind = p;
                break;
            }
            queue.shift();
            const arr = this.availableMove(p);
            for (const i of arr) {
                if (!temp[i.x][i.y] && this.circle[i.x][i.y]) {
                    pre[i.x][i.y] = p;
                    queue.push(i);
                    temp[i.x][i.y] = true;
                }
            }
        }
        if (!isFind) {
            return undefined;
        }
        while (!pre[isFind.x][isFind.y].isEqual(this.cat)) {
            isFind = pre[isFind.x][isFind.y];
        }
        this.cat = isFind;
        return isFind;
    }

    // 设置障碍物
    setBarrier(x, y) {
        if (!this.isValid(x) && !this.isValid(y)) {
            this.circle[x][y] = false;
        }
    }
}

export { Circle, Point };
