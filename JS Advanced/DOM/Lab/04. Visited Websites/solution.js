function solve() {
  let buttonElements = document.getElementsByClassName('link-1');

  for (const element of buttonElements) {
    element.addEventListener('click', function () {
      let currentClicks = Number(this.lastElementChild.innerHTML.match(/\d+/g));
      currentClicks++;
      this.lastElementChild.innerHTML = `visited ${currentClicks} times`;
    });
  }
}
