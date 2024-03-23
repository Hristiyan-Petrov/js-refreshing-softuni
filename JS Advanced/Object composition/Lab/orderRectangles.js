function solve(input) {

    let rectangles = input.map(([width, height]) => {
        return {
            width,
            height,
            area: () => width * height,
            compareTo(other) {
                let result = this.area() - other.area();
                if (result < 0) {
                    return 'smaller';
                } else if (result === 0) {
                    return 'equal';
                } else {
                    return 'larger';
                }
            }
        }
    });

    let sorting = (a, b) => b.area() - a.area() || b.width - a.width;
    // let sorted = rectangles.sort(sorting);
    return rectangles.sort(sorting);
    // console.log(sorted);

    // console.log(sorted[2].compareTo(sorted[1]));
}

solve([[10, 5], [5, 10], [5, 12]]);