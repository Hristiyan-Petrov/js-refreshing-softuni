function solve() {
    let tableBodyElement = document.querySelector('.minimalistBlack tbody');
    let tableRowsElements = document.querySelectorAll('.minimalistBlack tr');
    const backColorRGB = hexToRgb('#413f5e');
    const originalColorRGB = window.getComputedStyle(tableRowsElements[0]).backgroundColor;

    // [...tableRowsElements].forEach(tr => {
    //     tr.addEventListener('click', function(e) {
    //         console.log(this); // this === e.currentTarget 
    //     })
    // })


    tableBodyElement.addEventListener('click', function (e) {
        let clicked = e.target.parentElement;
        let otherClicked = [...tableRowsElements].find(el => el.style.backgroundColor === backColorRGB);
        
        if (otherClicked && otherClicked !== clicked) {
            otherClicked.style.backgroundColor = originalColorRGB;
        }

        if (clicked.tagName === 'TR') {
            clicked.style.backgroundColor = clicked.style.backgroundColor === backColorRGB ? originalColorRGB : backColorRGB ; 
        }
        
    });

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
}
