async function getInfo() {
    // let availableStops = ['1287', '1308', '1327', '2334']; - HARDCODED
    let url = '../databases/busStops.json';

    // I am using 2 different approaches to resolve a problem - SoftUni task number 1 from Exercise: REST Services and AJAX - JS Applications - октомври 2020
    // First aproach is using fetch and Object.keys    VS   Second aproach using async await method and Object.entries

    // Promise aproach for setting dynamic list of available stops according to the database (availableStops.json)

    let availableStops;
    fetch(url)
        .then(res => res.json())
        .then(res => {
            availableStops = Object.keys(res.businfo);

            // move all the code that depends on availableStops inside this block

            let stopId = document.getElementById('stopId');
            let stopValue = stopId.value;

            let stopNameElement = document.getElementById('stopName');
            let busesListElement = document.getElementById('buses');

            //clears list if there are already stops from previous result
            let liCount = busesListElement.getElementsByTagName('li');
            if (liCount.length) {
                busesListElement.innerHTML = '';
            }

            let checkIsNum = isNaN(stopValue);

            if (checkIsNum) {
                stopNameElement.innerText = 'Please use numbers only!';
            } else {
                if (Boolean(availableStops.includes(stopValue))) {
                    // let url = `https://judgetests.firebaseio.com/businfo/${stopValue}.json`; - But server is down and cannot use it

                    fetch(url)
                        .then(response => response.json())
                        .then(response => {
                            let stopData = response.businfo[stopValue];
                            stopNameElement.innerText = stopData.name;

                            console.log(stopData.buses);

                            Object.keys(stopData.buses).forEach(key => {
                                let liElement = document.createElement('li');
                                liElement.innerText = `Bus ${key} arrives at ${stopData.buses[key]} minutes.`;
                                busesListElement.appendChild(liElement);
                            });
                        });
                } else {
                    let stopNameElement = document.getElementById('stopName');
                    stopNameElement.innerText = 'No such stop!';
                    return;
                }
            }
        });





    // Async await aproach - when using add 'async' to the main function getInfo() !!!
    
    //  dynamic list of available stops according to the database (availableStops.json)

    // let availableStops = await fetchavailableStops(url);

    // async function fetchavailableStops(url) {
    //     try {
    //         let res = await fetch(url); // wait for the fetch to finish
    //         let data = await res.json(); // wait for the json parsing to finish
    //         console.log(Object.keys(data.businfo)); // log the bus IDs
    //         return Object.keys(data.businfo);
    //         // do other functionality here
    //     } catch (error) {
    //         // handle any errors here
    //         stopNameElement.innerText = error;
    //     }
    // }

    // let stopId = document.getElementById('stopId');
    // let stopValue = stopId.value;

    // let stopNameElement = document.getElementById('stopName');
    // let busesListElement = document.getElementById('buses');

    // //clears list if there are already stops from previous result
    // let liCount = busesListElement.getElementsByTagName('li');
    // if (liCount.length) {
    //     busesListElement.innerHTML = '';
    // }

    // let checkIsNum = isNaN(stopValue);

    // if (checkIsNum) {
    //     stopNameElement.innerText = 'Please use numbers only!';
    // } else {
    //     if (availableStops.includes(stopValue)) {
    //         // let url = `https://judgetests.firebaseio.com/businfo/${stopValue}.json`; - But server is down and cannot use it

    //         fetch(url)
    //             .then(response => response.json())
    //             .then(response => {
    //                 let stopData = response.businfo[stopValue];
    //                 stopNameElement.innerText = stopData.name;

    //                 console.log(stopData.buses);

    //                 Object.entries(stopData.buses).forEach(([key, value]) => {
    //                     let liElement = document.createElement('li');
    //                     liElement.innerText = `Bus ${key} arrives at ${value} minutes.`;
    //                     busesListElement.appendChild(liElement);
    //                 });
    //             });
    //     } else {
    //         stopNameElement.innerText = 'No such stop!';
    //         return;
    //     }
    // }

}