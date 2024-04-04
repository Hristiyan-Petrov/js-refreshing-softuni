function createElement(tagName, ...classes) {
    let el = document.createElement(tagName);
    el.classList.add(...classes);
    return el;
}

function fetchWeatherData(cityValue, baseUrl) {
    // Fetch location data
    return fetch(baseUrl + 'locations')
        .then(res => res.json())
        .then(res => {
            let currCity = res.find(x => x.name === cityValue);
            let { code } = currCity;

            // Fetch weather data
            return Promise.all([
                fetch(baseUrl + `today?code=${code}`).then(res => res.json()),
                fetch(baseUrl + `upcoming?code=${code}`).then(res => res.json())
            ]);
        });
}

function updateDOM([todayData, upcomingData], conditions, currentForecastDiv, upcomingForecastDiv, forecastDiv) {
    todayData = todayData[0];
    upcomingData = upcomingData[0];

    // Clear old forecast
    ['.forecasts', '.forecast-info'].forEach((selector, index) => {
        const parent = index === 0 ? currentForecastDiv : upcomingForecastDiv;
        const element = document.querySelector(selector);
        if (element && parent.contains(element)) {
            parent.removeChild(element);
        }
    });

    // Today conditions DOM Manipulations
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

    // Upcoming conditions DOM Manipulations
    let forecastInfo = createElement('div', 'forecast-info');

    let spansUpcoming = upcomingData.forecast.map(x => {
        return `
        <span class="upcoming">
            <span class="symbol">${conditions[x.condition]}</span>
            <span class="forecast-data">${x.low}°/${x.high}°</span>
            <span class="forecast-data">${x.condition}</span>
        </span>`
    }).join('');

    forecastInfo.innerHTML = spansUpcoming;
    upcomingForecastDiv.appendChild(forecastInfo);
}

function attachEvents() {
    let submitButton = document.getElementById('submit');
    let locationInput = document.getElementById('location');
    let forecastDiv = document.getElementById('forecast');
    let currentForecastDiv = document.getElementById('current');
    let upcomingForecastDiv = document.getElementById('upcoming');

    const conditions = {
        'Sunny': '☀',
        'Cloudy': '☁',
        'Rainy': '☂'
    }

    let baseUrl = 'http://localhost:3000/';

    submitButton.addEventListener('click', function () {
        let cityValue = locationInput.value;

        fetchWeatherData(cityValue, baseUrl)
            .then(data => updateDOM(data, conditions, currentForecastDiv, upcomingForecastDiv, forecastDiv))
            .catch(err => {
                console.error(err);
                // Update the UI with a user-friendly error message
                forecastDiv.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
            });
    });
}

attachEvents();