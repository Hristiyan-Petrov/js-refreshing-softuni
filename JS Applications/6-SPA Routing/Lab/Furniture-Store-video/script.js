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

document.querySelector('nav').addEventListener('click', onRouteChange);