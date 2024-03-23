// function solution() {
//     // let dotFc = (v1, v2) => {
//     //     let result = 0;
//     //     for (let i = 0; i < 1; i++) {
//     //         result += v1[i] * v2[i];
//     //     }
//     //     return result;
//     // }

//     return {
//         add: (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]],
//         multiply: (v, scalar) => [v[0] * scalar, v[1] * scalar],
//         length: v => Math.sqrt(v[0] * v[0] + v[1] * v[1]),
//         // dot: dotFc,
//         dot: (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1],
//         cross: ([v1c1, v1c2], [v2c1, v2c2]) => v1c1 * v2c2 - v1c2 * v2c1
//     }
// }

solution = {
    add: (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1]],
    multiply: (v, scalar) => [v[0] * scalar, v[1] * scalar],
    length: v => Math.sqrt(v[0] * v[0] + v[1] * v[1]),
    // dot: dotFc,
    dot: (v1, v2) => v1[0] * v2[0] + v1[1] * v2[1],
    cross: ([v1c1, v1c2], [v2c1, v2c2]) => v1c1 * v2c2 - v1c2 * v2c1
}


console.log(solution.cross([1, 1], [-1, 1]));

console.log(solution.add([1, 1], [1, 0]));
console.log(solution.multiply([3.5, -2], 2));
console.log(solution.length([3, -4]));
console.log(solution.dot([1, 0], [0, -1]));
console.log(solution.cross([3, 7], [1, 0]));
