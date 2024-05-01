const routes = {
    '/home': document.getElementById('home-section'),
    '/create': document.getElementById('create-section'),
    '/details': document.getElementById('details-section'),
    '/profile': document.getElementById('profile-section'),
};

const router = pathname => {
    let [path, id] = pathname.split('/').filter(x => x); // filter only the thuthy values
    path = '/' + path;

    // Hide all contents on every route click
    Object.values(routes).forEach(section => section.style.display = 'none');

    // Show current content
    routes[path].style.display = 'block';

    switch (path) {
        case '/home':
            renderHomepage();
            break;

        case '/details':
            renderItemDetailsPage(id, routes[path]);
            break;
        default:
            break;
    }
}

function redirect(path) {
    history.pushState({}, '', path);
    router(path);
}

function renderItemDetailsPage(id, detailsContainerElement) {
    fetch(`https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture/${id}.json`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            let furnitureView = document.getElementById('item-details-template').innerHTML;
            let createTemplate = Handlebars.compile(furnitureView);
            let detailsHtml = createTemplate(data);
            detailsContainerElement.innerHTML += detailsHtml;
        })
        .catch(err => {
            console.log(err.message);
        });
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
    let url = new URL(e.target.href);
    redirect(url.pathname);
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
            redirect('/home');
        })
        .catch(err => {
            console.log(err.message);
        })

}

document.querySelector('nav').addEventListener('click', onRouteChange);

let formElement = document.getElementById('create-form');
formElement.addEventListener('submit', onCreateSubmit);

// routes[location.pathname].style.display = 'block'; // Load content on page reload
router(location.pathname);