function attachEvents() {
    let submitButton = document.getElementById('submit');
    let locationInput = document.getElementById('location');
    let forecastDiv = document.getElementById('forecast');
    let currentForecastDiv = document.getElementById('current');
    let upcomingForecastDiv = document.getElementById('upcoming');

    const conditions = {
        'Sunny': '☀',  // ☀
        'Cloudy': '☁', // ☁
        'Rainy': '☂' // ☂
    }

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
                        todayData = todayData[0];
                        upcomingData = upcomingData[0];

                        // Clear old forecast
                        if (document.querySelector('.forecasts') && document.querySelector('.forecast-info')) {
                            currentForecastDiv.removeChild(document.querySelector('.forecasts'));
                            currentForecastDiv.removeChild(document.querySelector('.forecast-info'));
                        }

                        // Today conditions DOM Manipulations
                        (function todayForecastDOM() {
                            forecastDiv.style.display = 'block';

                            let forecasts = createElement('div', 'forecasts');

                            let conditionSymbol = createElement('span', 'condition', 'symbol');
                            conditionSymbol.textContent = conditions[todayData.forecast.condition];
                            forecasts.appendChild(conditionSymbol);

                            let condition = createElement('span', 'condition');
                            let conditionFirstSpan = createElement('span', 'forecast-data');
                            conditionFirstSpan.textContent = todayData.name;

                            let conditionSecondSpan = createElement('span', 'forecast-data');
                            conditionSecondSpan.textContent = `${todayData.forecast.low}°/${todayData.forecast.high}°`;

                            let conditionThirdSpan = createElement('span', 'forecast-data');
                            conditionThirdSpan.textContent = todayData.forecast.condition;

                            condition.appendChild(conditionFirstSpan);
                            condition.appendChild(conditionSecondSpan);
                            condition.appendChild(conditionThirdSpan);

                            forecasts.appendChild(condition);

                            currentForecastDiv.appendChild(forecasts);
                        })();

                        // Upcoming conditions DOM Manipulations
                        (function upcomingForecastDOM() {
                            let forecastInfo = createElement('div', 'forecast-info');

                            let spansUpcomming = upcomingData.forecast.map(x => {
                                return `
                                <span class="upcoming">
                                    <span class="symbol">${conditions[x.condition]}</span>
                                    <span class="forecast-data">${x.low}°/${x.high}°</span>
                                    <span class="forecast-data">${x.condition}</span>
                                </span>`
                            })
                                .join('');

                            forecastInfo.innerHTML = spansUpcomming;

                            upcomingForecastDiv.appendChild(forecastInfo);
                        })();
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));


        function createElement(tagName, ...classes) {
            let el = document.createElement(tagName);
            el.classList.add(...classes);
            return el;
        }
    });
}

attachEvents();