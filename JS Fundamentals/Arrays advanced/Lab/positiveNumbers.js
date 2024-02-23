let solve = (arr) => {
  let rearrangedArray = [];
  arr.forEach((number) => {
    number >= 0
      ? rearrangedArray.push(number)
      : rearrangedArray.unshift(number);
  });
  return rearrangedArray.join("\n");
};

let result = solve([3, -2, 0, -1]);
console.log(result);
