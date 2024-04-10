document.querySelector('#container').addEventListener('submit', function (e) {
    let form = e.target;
    if (!form.nodeName === 'FORM') return;

    e.preventDefault();
    const inputs = Array.from(form.elements);

    inputs.forEach((input, i) => {
        console.log(i);
        // Skip if the input does not have the 'required' attribute 
        if (!input.hasAttribute('required')) return;

        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
});

// document.querySelector('form input.btn').addEventListener('click', function(e) {
//     console.log(e.target);
// })