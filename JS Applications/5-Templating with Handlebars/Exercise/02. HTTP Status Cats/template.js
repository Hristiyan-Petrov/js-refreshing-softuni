(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const ulWrapper = document.getElementById('allCats');

        let catPartialView = document.getElementById('cat-li-partial').innerHTML;
        Handlebars.registerPartial('catPartial', catPartialView);

        let ulCatsView = document.getElementById('cats-ul').innerHTML;
        let createCatsHtml = Handlebars.compile(ulCatsView);

        let catsHtml = createCatsHtml({ cats });
        ulWrapper.innerHTML = catsHtml;
    }
})();

function showDetails(e) {
    e.preventDefault();
    let infoElement = e.target.nextElementSibling;

    if (e.target.textContent === 'Show status code') {
        infoElement.style.display = 'block';
        e.target.textContent = 'Hide status code'
    } else {
        e.target.textContent = 'Show status code';
        infoElement.style.display = 'none';
    }
}