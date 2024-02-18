function lockedProfile() {
    let profiles = document.getElementById('main').querySelectorAll('.profile');

    profiles.forEach((profile, index) => {
        // profile.lastElementChild.addEventListener('click', function () {
        //     changeButtonAndShowInfo(this, index + 1);
        // });

        profile.lastElementChild.addEventListener('click', () => changeButtonAndShowInfo(profile.lastElementChild, index +1));
    });

}

function changeButtonAndShowInfo(buttonElement, index) {
    let hiddenInfo = document.getElementById(`user${index}HiddenFields`);

    let inputLocked = buttonElement.parentElement.querySelector('input');
    let isLocked = inputLocked.checked;

    if (isLocked) {
        return;
    }

    if (buttonElement.textContent === 'Show more') {
        hiddenInfo.style.setProperty('display', 'block');
        buttonElement.textContent = 'Show less';
    } else {
        hiddenInfo.style.setProperty('display', 'none');
        buttonElement.textContent = 'Show more';
    }

}