// Optimized solution

const ratios = {
    days: 1,
    hours: 24,
    minutes: 1440,
    seconds: 86400
};

function attachEventsListeners() {
    Object.keys(ratios).forEach(unit => {
        document.getElementById(unit + 'Btn').addEventListener('click', convertTime);
    });
}

function convertTime() {
    let unit = this.id.replace('Btn', '');
    let inputValue = document.getElementById(unit).value;

    if (isNaN(inputValue) || inputValue == '0') {
        showErrorMessage(unit);
        return;
    }

    let timeInDays = inputValue / ratios[unit];
    Object.keys(ratios).forEach(unit => {
        document.getElementById(unit).value = timeInDays * ratios[unit];
    });
}

function showErrorMessage(unit) {
    document.getElementById(unit).value = '';
    let errorMessageElement = document.getElementById('errorMessage');
    errorMessageElement.style.setProperty('display', 'block');
    setTimeout(() => {
        errorMessageElement.style.setProperty('display', 'none');
    }, 2000);
}