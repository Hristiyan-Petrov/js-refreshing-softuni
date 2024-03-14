class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(point1, point2) {
        let xOffset = Math.abs(point1.x - point2.x);
        let yOffset = Math.abs(point1.y - point2.y);

        let distance = Math.sqrt(xOffset ** 2 + yOffset ** 2);
        return distance;
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));
