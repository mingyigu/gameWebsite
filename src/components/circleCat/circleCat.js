import { Circle } from "./circle.js";

let circle;

/**
 * 初始化地图
 */
function reset(size = 11, barrier = 8) {
    circle = new Circle(size);
    circle.init(barrier);
    return circle;
}

/**
 * 设置障碍物
 * @param x 障碍物的纵坐标
 * @param y 障碍物的横坐标
 */
function setBarrier(x, y) {
    circle.setBarrier(x, y);
}

/**
 * 返回猫移动后的坐标, 若为undefined表明已经围住
 */
function catMove() {
    cat = circle.moveCatWithBFS();
    if (cat) {
        if (circle.isEscape(cat)) {
            console.log("已逃脱");
            return undefined;
        } else {
            return cat;
        }
    } else {
        console.log("已围住");
        return undefined;
    }
}

export { reset, setBarrier, catMove };
