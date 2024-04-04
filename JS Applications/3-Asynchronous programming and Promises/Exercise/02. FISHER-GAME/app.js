function attachEvents() {
    let baseUrl = 'http://localhost:3000/catches';

    let loadButton = document.querySelector('.load');

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

