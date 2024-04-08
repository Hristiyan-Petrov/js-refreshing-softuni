(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        const ulWrapper = document.getElementById('allCats');

        fetch('./template.hbs')
            .then(res => res.text())
            .then(template => {
                // Create a temporary HTML element to host the fetched templates
                let tempElement = document.createElement('div');
                tempElement.innerHTML = template;

                let catPartialView = tempElement.querySelector('#cat-li-partial').innerHTML;
                Handlebars.registerPartial('catPartial', catPartialView);

                let ulCatsView = tempElement.querySelector('#cats-ul').innerHTML;
                let createCatsHtml = Handlebars.compile(ulCatsView);

                let catsHtml = createCatsHtml({ cats });
                ulWrapper.innerHTML = catsHtml;
            })

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