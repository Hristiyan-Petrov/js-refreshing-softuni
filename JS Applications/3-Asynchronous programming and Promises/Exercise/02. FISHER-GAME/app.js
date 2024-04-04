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

        let formElement = document.querySelector('#addForm');

        let bodyData = createBodyData(formElement);

        // let anglerInput = form.querySelector('.angler');
        // let weightInput = form.querySelector('.weight');
        // let speciesInput = form.querySelector('.species');
        // let locationInput = form.querySelector('.location');
        // let baitInput = form.querySelector('.bait');
        // let captureTimeInput = form.querySelector('.captureTime');

        // let bodyData = (JSON.stringify({
        //     "angler": anglerInput.value,
        //     "weight": weightInput.value,
        //     "species": speciesInput.value,
        //     "location": locationInput.value,
        //     "bait": baitInput.value,
        //     "captureTime": captureTimeInput.value
        // }));

        // console.log(bodyData);

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

    mainElement.addEventListener('click', function (e) {
        e.preventDefault();

        if (e.target.classList.value !== 'delete' && e.target.classList.value !== 'update') {
            return;
        }

        let id = e.target.parentElement.attributes.getNamedItem('data-id').value
        let currentUrl = baseUrl + `/${id}`;

        // Delete button
        if (e.target.classList.value === 'delete') {
            deleteCatchObject(currentUrl, id);
        }

        // Update button
        if (e.target.classList.value === 'update') {
            updateCatchObject(mainElement, currentUrl, id);;
        }
    });
}

function createBodyData(element) {
    let anglerInput = element.querySelector('.angler');
    let weightInput = element.querySelector('.weight');
    let speciesInput = element.querySelector('.species');
    let locationInput = element.querySelector('.location');
    let baitInput = element.querySelector('.bait');
    let captureTimeInput = element.querySelector('.captureTime');

    return (JSON.stringify({
        "angler": anglerInput.value,
        "weight": weightInput.value,
        "species": speciesInput.value,
        "location": locationInput.value,
        "bait": baitInput.value,
        "captureTime": captureTimeInput.value
    }));
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

function deleteCatchObject(currentUrl, id) {

    fetch(currentUrl, {
        method: 'DELETE'
    })
        .then(res => {

            if (res.ok) {
                console.log(`Deleted item with id: ${id}`);
            } else {
                throw new Error(`Delete request failed with status ${res.status}`);
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

function updateCatchObject(mainElement, currentUrl, id) {

    let currentCatchDiv = Array.from(mainElement.children).find(catchDiv => catchDiv.attributes.getNamedItem('data-id').value === id);
    let bodyData = createBodyData(currentCatchDiv);

    fetch(currentUrl, {
        method: 'PUT',
        body: bodyData
    })
        .then(res => {

            if (res.ok) {
                console.log(`Updated item with id: ${id}`);
            } else {
                throw new Error(`Update request failed with status ${res.status}`);
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

attachEvents();

