function solve(area, vol, input) {

    // let figures = JSON.parse(input);

    return JSON.parse(input).map(function(figure) {
        return {
            area: Math.abs(area.apply(figure)),
            volume: Math.abs(vol.call(figure))
        };
    });

    for (let figure of figures) {
        figure[area] = Math.abs(area.apply(figure));
        figure[vol] = Math.abs(vol.call(figure));
        // console.log(figure);
    }

    let result = [];

    Object.values(figures).forEach(figure => {
        result.push({
            area: figure[area],
            volume: figure[vol]
        })
    });

    return result;
    // result.forEach(x => console.log(x));
}

function area() {
    return this.x * this.y;
};
function vol() {
    return this.x * this.y * this.z;
};
let data = '[{"x":"10","y":"-22","z":"10"},{"x":"47","y":"7","z":"-5"},{"x":"55","y":"8","z":"0"},{"x":"100","y":"100","z":"100"},{"x":"55","y":"80","z":"250"}]';

solve(area, vol, data);