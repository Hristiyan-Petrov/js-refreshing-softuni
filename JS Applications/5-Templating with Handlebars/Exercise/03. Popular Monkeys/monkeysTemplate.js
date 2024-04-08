// Jquery approach

$(() => {
    const divWrapper = $('.monkeys');

    const monkeyPartialSource = $('#monkey-partial-template').html();
    Handlebars.registerPartial('monkeyPartial', monkeyPartialSource);

    const allMonkeysParialSource = $('#monkeys-template').html();
    const createMokeysTemplate = Handlebars.compile(allMonkeysParialSource);

    let monkeysHtml = createMokeysTemplate({ monkeys });

    divWrapper.html(monkeysHtml);

    divWrapper.on('click', 'button', function () {
        $(this).next().fadeToggle();
        // this refers to e.target
        // .next() is used to select the next element sibling and toggle is out of the box 
    });
});

// Vanilla JS

// (() => {
//     const divWrapper = document.querySelector('.monkeys');

//     const monkeyPartialSource = document.getElementById('monkey-partial-template').innerHTML;
//     Handlebars.registerPartial('monkeyPartial', monkeyPartialSource);

//     const allMonkeysParialSource = document.querySelector('#monkeys-template').innerHTML;
//     const createMokeysTemplate = Handlebars.compile(allMonkeysParialSource);

//     let monkeysHtml = createMokeysTemplate({ monkeys });

//     divWrapper.innerHTML = monkeysHtml;

//     divWrapper.addEventListener('click', function (e) {
//         if (e.target.textContent !== 'Info') {
//             return;
//         }

//         let infoElement = e.target.nextElementSibling;

//         console.log(infoElement.style.display);

//         if (infoElement.style.display === 'none') {
//             infoElement.style.display = 'block';
//         } else {
//             infoElement.style.display = 'none';
//         }
//     });
// })();