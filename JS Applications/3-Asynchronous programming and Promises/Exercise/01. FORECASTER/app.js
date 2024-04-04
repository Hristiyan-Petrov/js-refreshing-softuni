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
                let { code } = currCity;

                Promise.all([
                    fetch(baseUrl + `today?code=${code}`),
                    fetch(baseUrl + `upcoming?code=${code}`)
                ])
                    .then(res => Promise.all((res).map(x => x.json())))
                    .then(([todayData, upcomingData]) => {
                        console.log("Today's weather: ", todayData);
                        console.log("Upcoming weather: ", upcomingData);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));


    });
}

attachEvents();