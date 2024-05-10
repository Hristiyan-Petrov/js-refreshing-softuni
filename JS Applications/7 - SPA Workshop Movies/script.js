(function addEvenetListeners() {
    document.querySelector('.navigation').addEventListener('click', e => {
        e.preventDefault();

        if (!e.target.classList.contains('nav-link')) { // Contains is key word for Nodelist API (In this case DOMTokenList); little different from .tagName attr
            return;
        }

        let url = new URL(e.target.href); // Skip string operations
        history.pushState({}, '', url.pathname); // Change route / url
    });

})();