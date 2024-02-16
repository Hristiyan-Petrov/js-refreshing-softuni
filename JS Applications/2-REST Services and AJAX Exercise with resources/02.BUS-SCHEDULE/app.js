function solve() {
    let url = '../databases/busSchedule.json';
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let infoTableElement = document.querySelector('#info .info');

    let busState = 'stopped';
    let initialStart = true;

    let currentStopId, currentStopName, nextStopId;

    function depart() {
        toggleButtonsOnBusState(busState);

        fetch(url)
            .then(res => res.json())
            .then(data => {

                initialStart ? currentStopId = 'depot' : currentStopId = nextStopId;
                
                currentStopName = data.schedule[currentStopId].name
                infoTableElement.textContent = `Next stop: ${currentStopName}`;
                nextStopId = data.schedule[currentStopId].next;
                initialStart = false;
                busState = 'moving';
            })
            .catch(err => {
               infoTableElement.textContent = 'Something went wrong :(';
               console.log(err);
               departButton.disabled = true;
               arriveButton.disabeld = true;
            });

    }

    function arrive() {
        toggleButtonsOnBusState(busState);
        infoTableElement.textContent = `Arriving at ${currentStopName}`;

        busState = 'stopped';
    }

    return {
        depart,
        arrive
    };

    function toggleButtonsOnBusState(state) {
        if (state === 'stopped') {
            departButton.disabled = true;
            arriveButton.disabled = false;
        } else if (state === 'moving') {
            departButton.disabled = false;
            arriveButton.disabled = true;
        }
    }
}

let result = solve();