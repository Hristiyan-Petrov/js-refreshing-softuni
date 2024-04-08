function loadTowns(e) {
    e.preventDefault();

    // Create array of objects, each with property 'name' = {the name}
    let inputEl = document.getElementById('towns');
    let towns = inputEl.value
        .split(', ')
        .map(x => ({ name: x }));

    // Register partial template
    let townView = document.getElementById('town-parial').innerHTML;
    Handlebars.registerPartial('townPartial', townView);

    // Set up the parent template
    let townsView = document.getElementById('towns-view').innerHTML;
    let createTownsHtml = Handlebars.compile(townsView); // Create function createTownsHtml()

    // Create and append the html 
    let townsFullHtml = createTownsHtml({ towns }); // Returns string
    let rootElement = document.getElementById('root');
    rootElement.innerHTML = townsFullHtml;
}