
$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        // $.ajax({
        //     url: "./template.hbs",
        //     success: function (template) {

        //         let tempElement = document.createElement('div');
        //         tempElement.innerHTML = template;

        //         let catPartialView = tempElement.querySelector('#cat-li-partial').innerHTML;
        //         Handlebars.registerPartial('catPartial', catPartialView);

        //         let ulCatsView = tempElement.querySelector('#cats-ul').innerHTML;
        //         let createCatsHtml = Handlebars.compile(ulCatsView);

        //         let catsHtml = createCatsHtml({ cats });

        //         $("#allCats").html(catsHtml);
        //     }
        // });

        $.get({
            url: "./template.hbs",
        })
            .done(function (template) {
                let $tempElement = $('<div>').html(template);

                let catPartialView = $tempElement.find('#cat-li-partial').html();
                Handlebars.registerPartial('catPartial', catPartialView);
                
                let ulCatsView = $tempElement.find('#cats-ul').html();
                let createCatsHtml = Handlebars.compile(ulCatsView);
                
                let catsHtml = createCatsHtml({ cats });

                $("#allCats").html(catsHtml);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                $("#allCats").html(`${errorThrown}! ${textStatus}: ${jqXHR.status}`);
                $("#allCats").css({
                    'color': 'red',
                    'background-color': 'lightyellow',
                    'border': 'solid 1px red',
                    'padding': '10px',
                    'margin': '10px',
                    'font-size': '20px',
                    'text-align': 'center',
                });
            });
        }
});

function showDetails(e) {
    $(e.target).next().slideToggle(500);
    
    // let infoElement = e.target.nextElementSibling;
    
    // if (e.target.textContent === 'Show status code') {
    //     infoElement.style.display = 'block';
    //     e.target.textContent = 'Hide status code'
    // } else {
    //     e.target.textContent = 'Show status code';
    //     infoElement.style.display = 'none';
    // }
}

// Vanilla JS
// (() => {
//     renderCatTemplate();

//     function renderCatTemplate() {
//         const ulWrapper = document.getElementById('allCats');

//         fetch('./template.hbs')
//             .then(res => res.text())
//             .then(template => {
                
//                 // Create a temporary HTML element to host the fetched templates
//                 let tempElement = document.createElement('div');
//                 tempElement.innerHTML = template;

//                 let catPartialView = tempElement.querySelector('#cat-li-partial').innerHTML;
//                 Handlebars.registerPartial('catPartial', catPartialView);

//                 let ulCatsView = tempElement.querySelector('#cats-ul').innerHTML;
//                 let createCatsHtml = Handlebars.compile(ulCatsView);

//                 let catsHtml = createCatsHtml({ cats });
//                 ulWrapper.innerHTML = catsHtml;
//             })
//     }
// })();

// function showDetails(e) {
//     let infoElement = e.target.nextElementSibling;

//     if (e.target.textContent === 'Show status code') {
//         infoElement.style.display = 'block';
//         e.target.textContent = 'Hide status code'
//     } else {
    //         e.target.textContent = 'Show status code';
    //         infoElement.style.display = 'none';
    //     }
    // }
    