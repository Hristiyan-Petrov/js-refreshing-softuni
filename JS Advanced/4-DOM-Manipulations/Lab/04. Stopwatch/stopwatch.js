function stopwatch() {
    let setIntervalId = null;
    let handleButtons = function (e) {
        let clickedElement = e.target;
        if (clickedElement.tagName !== 'BUTTON') {
            return;
        }

        clickedElement.setAttribute('disabled', 'true');

        let otherButton = null;
        if (clickedElement.nextElementSibling.tagName === 'BUTTON') {
            otherButton = clickedElement.nextElementSibling;
        } else {
            otherButton = clickedElement.previousElementSibling;
        }

        otherButton.removeAttribute('disabled');

        let timer = document.getElementById('time');
        let [minutes, seconds] = timer.textContent.split(":");

        if (clickedElement.textContent === 'Start') {
            setIntervalId = setInterval(function () {
                seconds = parseInt(seconds);
                minutes = parseInt(minutes);

                if (seconds !== 59) {
                    seconds++;
                } else {
                    minutes++;
                    seconds = '0';
                }

                timer.textContent = `${minutes.toString().padStart(2, 0)}:${seconds.toString().padStart(2, 0)}`;
            }, 1000);
        } else {
            clearInterval(setIntervalId);
        }
    }

    document.body.addEventListener('click', handleButtons);
}