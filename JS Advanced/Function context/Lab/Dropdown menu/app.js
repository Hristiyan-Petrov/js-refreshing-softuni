function solve() {
    const chooseButton = document.getElementById('dropdown');
    const colorsUlElement = document.getElementById('dropdown-ul');
    const boxElement = document.getElementById('box');
    const boxInitialBackground = window.getComputedStyle(boxElement).backgroundColor;
  
    // Optimized click handler for toggle functionality:
    chooseButton.addEventListener('click', () => {
      colorsUlElement.style.display = colorsUlElement.style.display === 'block' ? 'none' : 'block';
      if (colorsUlElement.style.display === 'none') {
        boxElement.style.backgroundColor = boxInitialBackground; // Use direct style assignment for efficiency
      }
    });
  
    // Efficient event listener attachment for list items:
    colorsUlElement.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        boxElement.style.backgroundColor = event.target.textContent;
      }
    });
  }
  