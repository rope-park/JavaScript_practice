import { Shape } from '../class_test/script.js'; // 부모 클래스 import(import를 위해서는 반드시 export를 해야함)

class Square extends Shape {
    constructor(sideLength) {
        super('square', 4, sideLength);
        this.sideLength = sideLength;
    }

    calcArea() {
        console.log(this.sideLength * this.sideLength);
    }
}

const square = new Square(5);
square.calcArea(); // 25
square.calcPerimeter(); // 20