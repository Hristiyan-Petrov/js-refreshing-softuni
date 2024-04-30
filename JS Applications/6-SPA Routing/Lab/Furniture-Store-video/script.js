const routeMap = {
    '/home': document.getElementById('home-section'),
    '/create': document.getElementById('create-section'),
    '/details': document.getElementById('details-section'),
    '/profile': document.getElementById('profile-section'),
};

const router = path => {
    // Hide all contents on every route click
    Object.values(routeMap).forEach(section => section.style.display = 'none');

    // Show current content
    routeMap[location.pathname].style.display = 'block';

    switch (path) {
        case '/home':
            renderHomepage();
            break;
        default:
            break;
    }
}

function renderHomepage() {
    // Get all furnitures
    fetch('https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Convert object to array
            let furnitureArray = Object.keys(data).map(key => ({ ...data[key], id: key }));

            // Use template to render
            let furnituresView = document.getElementById('home-section-template').innerHTML;
            let createTemplate = Handlebars.compile(furnituresView);
            let allFurnituresHtml = createTemplate({ furniture: furnitureArray });

            // Append to DOM
            document.getElementById('home-section').innerHTML += allFurnituresHtml;
        })
        .catch(err => {
            console.log(err.message);
        });
}

function onRouteChange(e) {
    if (e.target.tagName !== 'A') {
        return;
    }

    // Prevent reload
    e.preventDefault();

    // Go to the route
    history.pushState({}, '', e.target.href);

    router(location.pathname);
}

// Add furniture
function onCreateSubmit(e) {
    e.preventDefault();

    const url = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json';

    let make = formElement.querySelector('#new-make').value;
    let price = formElement.querySelector('#new-price').value;
    let model = formElement.querySelector('#new-model').value;
    let imageUrl = formElement.querySelector('#new-image').value;
    let year = formElement.querySelector('#new-year').value;
    let material = formElement.querySelector('#new-material').value;
    let description = formElement.querySelector('#new-description').value;

    let newFurniture = {
        make,
        price,
        model,
        imageUrl,
        year,
        material,
        description
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'applicatoin/json'
        },
        body: JSON.stringify(newFurniture)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err.message);
        })

}

document.querySelector('nav').addEventListener('click', onRouteChange);

let formElement = document.getElementById('create-form');
formElement.addEventListener('submit', onCreateSubmit);

routeMap[location.pathname].style.display = 'block'; // Load content on page reload