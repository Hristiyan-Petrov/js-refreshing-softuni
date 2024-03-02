// Not so good solution but still working

function attachEventsListeners() {

    let divParentElements = document.querySelector('main').querySelectorAll('div');

    divParentElements.forEach(element => {
        let buttonElement = element.lastElementChild;
        let elementId = buttonElement.getAttribute('id');

        buttonElement.addEventListener('click', function (e) {
            let daysInputElement = document.getElementById('days');
            let hoursInputElement = document.getElementById('hours');
            let minutesInputElement = document.getElementById('minutes');
            let secondsInputElement = document.getElementById('seconds');

            switch (elementId) {

                case 'daysBtn':
                    if (isNaN(daysInputElement.value) || daysInputElement.value == '0') {
                        showErrorMessage(daysInputElement);
                        break;
                    }

                    hoursInputElement.value = daysInputElement.value * 24;
                    minutesInputElement.value = hoursInputElement.value * 60;
                    secondsInputElement.value = minutesInputElement.value * 60;
                    break;

                case 'hoursBtn':
                    if (isNaN(hoursInputElement.value) || hoursInputElement.value == '0') {
                        showErrorMessage(daysInputElement);
                        break;
                    }

                    minutesInputElement.value = hoursInputElement.value * 60;
                    daysInputElement.value = hoursInputElement.value / 24;
                    secondsInputElement.value = minutesInputElement.value * 60;
                    break;

                case 'minutesBtn':
                    if (isNaN(minutesInputElement.value) || minutesInputElement.value == '0') {
                        showErrorMessage(daysInputElement);
                        break;
                    }

                    secondsInputElement.value = minutesInputElement.value * 60;
                    hoursInputElement.value = minutesInputElement.value / 60;
                    daysInputElement.value = hoursInputElement.value / 24;
                    break;

                case 'secondsBtn':
                    if (isNaN(secondsInputElement.value) || secondsInputElement.value == '0') {
                        showErrorMessage(daysInputElement);
                        break;
                    }

                    minutesInputElement.value = secondsInputElement.value / 60;
                    hoursInputElement.value = minutesInputElement.value / 60;
                    daysInputElement.value = hoursInputElement.value / 24;
                    break;
            }
        });
    });
}


function showErrorMessage(input) {
    input.value = '';
    let errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.style.setProperty('display', 'block');
    setTimeout(() => {
        errorMessageElement.style.setProperty('display', 'none');
    }, 2000);
}