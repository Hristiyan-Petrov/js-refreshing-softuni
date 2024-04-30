document.querySelector('nav').addEventListener('click', e => {
    if (e.target.tagName !== 'A') {
        return;
    }

    e.preventDefault();

    history.pushState({}, '', e.target.href);
});