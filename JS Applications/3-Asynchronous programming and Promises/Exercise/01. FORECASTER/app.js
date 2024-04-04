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

                Promise.all([
                    fetch(baseUrl + `forecast/today/${code}`),
                    fetch(baseUrl + `forecast/upcoming/${code}`)
                ])
                .then(res => Promise.all(res).map(x => x.json()))
                .then(([today, upcomming]) => {
                    console.log(today);
                    console.log(upcomming);
                })
            })

    });
}

attachEvents();