class Shape {
    constructor(name, sides, sideLength) {
        this.name = name;
        this.sides = sides;
        this.sideLength = sideLength;
    }

    calcPerimeter() {
        console.log(this.sides * this.sideLength);
    }
}

const square = new Shape('square', 4, 5);
square.calcPerimeter(); // 20

const triangle = new Shape('triangle', 3, 3);
triangle.calcPerimeter(); // 9