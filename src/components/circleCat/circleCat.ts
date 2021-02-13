import {Circle} from "./circle";

let circle: Circle | undefined;

/**
 * 初始化地图
 */
function reset() {
    circle = new Circle();
    circle.init();
}

/**
 * 设置障碍物
 * @param x 障碍物的横坐标
 * @param y 障碍物的纵坐标
 */
function setBarrier(x: number, y: number) {
    circle.setBarrier(x, y);
}

/**
 * 返回猫移动后的坐标
 */
function catMove() {
    return circle.moveCatWithBFS();
}

export {
    reset, setBarrier, catMove
}
