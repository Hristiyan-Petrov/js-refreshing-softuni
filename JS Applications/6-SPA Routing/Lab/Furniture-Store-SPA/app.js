document.querySelector('#container').addEventListener('submit', handleForm);

function handleForm(e) {
    let form = e.target;
    if (!form.nodeName === 'FORM') return;
    e.preventDefault();

    // Define a flag to check if all inputs are valid
    let allInputsValid = true;

    let inputs = Array.from(form.elements);
    console.log(inputs[0]);

    validate();

    if (!allInputsValid) return;

    addFurnitureToDataBase();

    function validate() {

        inputs.forEach((input, i) => {
            console.log(i);
            // Skip if the input does not have the 'required' attribute 
            if (!input.hasAttribute('required')) return;

            if (!input.checkValidity()) {
                input.classList.add('is-invalid');
                allInputsValid = false;
            } else {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            }
        });
    }

    function addFurnitureToDataBase() {
        let dbUrl = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json';

        let bodyData = JSON.stringify({
            'make': inputs[0].value,
            'model': inputs[1].value,
            'year': inputs[2].value,
            'description': inputs[3].value,
            'price': inputs[4].value,
            'imageUrl': inputs[5].value,
            'material': inputs[6].value,
        });

        fetch(dbUrl, {
            method: 'POST',
            body: bodyData
        })
            .then(res => res.json())
            .then(furniture => {
                console.log('successfully added to DB');

                history.pushState({}, '', '/furniture/all');
                // location.replace('/furniture/all');
                router();
            })
            .catch(err => {
                console.log(err);
            })
    }
}