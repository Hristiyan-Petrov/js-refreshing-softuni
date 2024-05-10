(function addEvenetListeners() {
    document.querySelector('.navigation').addEventListener('click', naviagateHandler);

})();

function naviagateHandler(e) {
    e.preventDefault();

    if (!e.target.classList.contains('nav-link')) { // Contains is key word for Nodelist API (In this case DOMTokenList); little different from .tagName attr
        return;
    }

    let url = new URL(e.target.href); // Skip string operations
    history.pushState({}, '', url.pathname); // Change route / url

    router(url.pathname.slice(1));
}

function onLoginSubmit(e) {
    e.preventDefault();
    
    let loginFormData = new FormData(document.forms['login-form']); // Get form by its id from doucment property 'forms'

    let email = loginFormData.get('email'); // Get by name attr from HTML input element
    let password = loginFormData.get('password');

}