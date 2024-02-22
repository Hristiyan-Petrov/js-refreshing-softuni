let proccessNumbers = (array) => {
  // let proccessedArray = [];
  return array
    .filter((n, i) => i % 2 !== 0)
    .map(n => n * 2)
    .reverse()
    .join(' ');
};

console.log(proccessNumbers([10, 15, 20, 25]));