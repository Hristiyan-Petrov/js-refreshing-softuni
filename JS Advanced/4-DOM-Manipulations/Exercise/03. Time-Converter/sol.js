// Optimized solution

const ratios = {
    days: 1,
    hours: 24,
    minutes: 1440,
    seconds: 86400
};

function handleReaetButton() {
    let resetButton = document.getElementById('resetBtn');
    resetButton.style.cursor = 'pointer';
    resetButton.addEventListener( 'click', e => {
        document.querySelectorAll('input[type=text]').forEach(el => el.value = '');
    });

}

function attachEventsListeners() {
    Object.keys(ratios).forEach(unit => {
        let curentButtonElement = document.getElementById(unit + 'Btn');
        curentButtonElement.addEventListener('click', convertTime);
        curentButtonElement.previousElementSibling.addEventListener('keypress', convertTime);
        curentButtonElement.setAttribute('style', 'cursor: pointer');
    });

    handleReaetButton();
}

function convertTime(e) {
    if (e.key && e.key !== 'Enter') {
        return;
    }

    let unit = e.currentTarget.id.replace('Btn', '');
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
    errorMessageElement.style.display = 'block';

    setTimeout(() => {
        errorMessageElement.style.display = 'none';
    }, 3000);
}