function attachEvents() {
    let submitButton = document.getElementById('submit');
    let locationInput = document.getElementById('location');
    let baseUrl = 'http://localhost:3000/';

    submitButton.addEventListener('click', function () {
        let cityValue = locationInput.value;

        fetch(baseUrl + 'locations')
            .then(res => res.json())
            .then(res => {
                let currCity = res.find(x => x.name === cityValue);
                let code = currCity.code;
            })

    });
}

attachEvents();