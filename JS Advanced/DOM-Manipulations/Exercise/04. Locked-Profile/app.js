function lockedProfile() {
    let profiles = document.querySelectorAll('main .profile');

    profiles.forEach((profile, index) => {
        profile.lastElementChild.addEventListener('click', e => {
            let currentButton = e.currentTarget;
            let hiddenInfo = document.getElementById(`user${index + 1}HiddenFields`);
            let inputLocked = currentButton.parentElement.querySelector('input'); // select input type radio
            let isLocked = inputLocked.checked;

            if (isLocked) {
                return;
            }

            if (currentButton.textContent === 'Show more') {
                hiddenInfo.style.setProperty('display', 'block');
                currentButton.textContent = 'Show less';
            } else {
                hiddenInfo.style.setProperty('display', 'none');
                currentButton.textContent = 'Show more';
            }
        });
    });

}