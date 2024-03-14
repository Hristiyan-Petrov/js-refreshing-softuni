// Write a class for a rectangle object.It needs to have a width(Number),
//  height(Number) and color(String) properties, 
//  which are set from the constructor and a calcArea() method, that calculates and returns the rectangle’s area.

class Rectangle {
    constructor(width, height, color) {
        this.width = width;
        this.heigh = height;
        this.color = color;
    }
     

    calcArea() {
        return this. width * this.heigh;
    }
}