const router = {
    '/home': document.getElementById('home-section'),
    '/create': document.getElementById('create-section'),
    '/details': document.getElementById('details-section'),
    '/profile': document.getElementById('profile-section'),
}

function onRouteChange(e) {
    if (e.target.tagName !== 'A') {
        return;
    }

    // Prevent reload
    e.preventDefault();

    // Go to the route
    history.pushState({}, '', e.target.href);

    // Hide all contents on every route click
    Object.values(router).forEach(section => section.style.display = 'none');

    // Show current content
    router[location.pathname].style.display = 'block';
}

function onCreateSubmit(e) {
    e.preventDefault();

    const url = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com';

    let make = formElement.querySelector('#new-make').value;
    let price = formElement.querySelector('#new-price').value;
    let model = formElement.querySelector('#new-model').value;
    let image = formElement.querySelector('#new-image').value;
    let year = formElement.querySelector('#new-year').value;
    let material = formElement.querySelector('#new-material').value;
    let description = formElement.querySelector('#new-description').value;

    let newFurniture = {
        make,
        price,
        model,
        image,
        year,
        material,
        description
    };

    fetch(`${url}/furniture.json`, {
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


router[location.pathname].style.display = 'block'; // Load content on page reload