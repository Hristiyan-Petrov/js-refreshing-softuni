function attachEvents() {
    let baseUrl = 'http://localhost:3000/catches';

    const loadButton = document.querySelector('.load');
    const addButton = document.querySelector('.add');

    const mainElement = document.querySelector('#catches');

    loadButton.addEventListener('click', function () {
        fetch(baseUrl)
            .then(res => res.json())
            .then(catches => {
                catches.forEach(catchObj => {
                    renderCatches(catchObj, mainElement);
                });
            })
    });

    addButton.addEventListener('click', function (e) {
        e.preventDefault();

        let form = document.querySelector('#addForm');

        let anglerInput = form.querySelector('.angler');
        let weightInput = form.querySelector('.weight');
        let speciesInput = form.querySelector('.species');
        let locationInput = form.querySelector('.location');
        let baitInput = form.querySelector('.bait');
        let captureTimeInput = form.querySelector('.captureTime');

        let bodyData = (JSON.stringify({
            "angler": anglerInput.value,
            "weight": weightInput.value,
            "species": speciesInput.value,
            "location": locationInput.value,
            "bait": baitInput.value,
            "captureTime": captureTimeInput.value
        }));

        console.log(bodyData);

        fetch(baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyData
        })
            .then(res => res.json())
            .then(newData => console.log(newData))
            .catch(err => {
                console.log(err);
            })

    });
}

function renderCatches(catchObject, mainElement) {
    let currCatchDiv = document.createElement('div');
    currCatchDiv.classList.add('catch');
    currCatchDiv.setAttribute('data-id', catchObject.id);

    currCatchDiv.innerHTML = `
        <label>Angler</label>
        <input type="text" class="angler" value="${catchObject.angler}" />
        <hr>
        <label>Weight</label>      
        <input type="number" class="weight" value="${catchObject.weight}" />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value="${catchObject.species}" />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value="${catchObject.location}" />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value="${catchObject.bait}" />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value="${catchObject.captureTime}" />
        <hr>
        <button class="update">Update</button>
        <button class="delete">Delete</button>
    `;

    mainElement.appendChild(currCatchDiv);
}

attachEvents();

