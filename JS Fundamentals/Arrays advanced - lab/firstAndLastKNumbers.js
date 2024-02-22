function proccessArray(arr) {
  let elementsNumber = arr.shift();
  let firstElements = arr.slice(0, elementsNumber);
  let lastElements = arr.slice(arr.length - elementsNumber);
  
  return `${firstElements.join(" ")}\n${(lastElements.join(" "))}`;
}

let result = proccessArray([3, 6, 7, 8, 9]);
console.log(result);
