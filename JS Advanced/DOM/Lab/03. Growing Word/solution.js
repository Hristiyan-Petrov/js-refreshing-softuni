function growingWord() {
  let pElement = document.querySelector('#exercise p');

  let colors = Array.from(document.getElementById('colors').querySelectorAll('div'))
    .map(el => el.innerHTML.toLowerCase());

    let firstColorElement = document.querySelector('#exercise div div');

  if (!pElement.style.fontSize) {
    pElement.style.fontSize = '2px';
    pElement.style.color = firstColorElement.innerHTML.toLowerCase();
    // pElement.style.color = colors[0];
  } else {
    pElement.style.fontSize = `${Number(pElement.style.fontSize.slice(0, -2)) * 2}px`;
    pElement.style.color = firstColorElement.innerHTML.toLowerCase();
    // colors.indexOf(pElement.style.color) === 2 ? pElement.style.color = colors[0] : pElement.style.color = colors[colors.indexOf(pElement.style.color) + 1];
  }
   
  let colorsWrapper = document.getElementById('colors');
  colorsWrapper.removeChild(firstColorElement);
  colorsWrapper.appendChild(firstColorElement);
}