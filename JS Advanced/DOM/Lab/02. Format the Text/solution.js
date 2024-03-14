function solve() {
  let inputParagraphElement = document.querySelector('#exercise #input');
  let outputElement = document.querySelector('#exercise #output');

  let pragraphTextArray = inputParagraphElement.innerHTML.split('. ');

  for (let i = 0; i < pragraphTextArray.length; i += 3) {
    let pElement = document.createElement('p');
    pElement.innerHTML = `${pragraphTextArray[i]}.`;

    if (pragraphTextArray[i + 1] !== undefined) {
      pElement.innerHTML += ` ${pragraphTextArray[i + 1]}.`;
      // console.log(pElement.innerHTML);

    } else if (pragraphTextArray[i + 2] !== undefined) {
      pElement.innerHTML += ` ${pragraphTextArray[i + 2]}.`;
      // console.log(pElement.innerHTML);
    }


    outputElement.appendChild(pElement);
  }

}