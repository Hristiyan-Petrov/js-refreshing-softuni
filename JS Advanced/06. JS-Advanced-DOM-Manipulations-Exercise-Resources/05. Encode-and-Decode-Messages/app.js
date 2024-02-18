const encryptionValue = { email: 2, password: 4, text: 1 }

function encodeAndDecodeMessages() {
    let firstSection = document.getElementById('main').firstElementChild;
    let secondSection = document.getElementById('main').lastElementChild;
    let sendButton = firstSection.lastElementChild;
    let readButton = secondSection.lastElementChild;

    let textInput = sendButton.previousElementSibling;
    let encryptedInput = readButton.previousElementSibling;

    sendButton.addEventListener('click', function () {
        let message = textInput.value;
        let encryptedText = '';

        for (let char of message) {
            let numASCII = char.charCodeAt() + encryptionValue.text;
            encryptedText += String.fromCharCode(numASCII);
        }

        textInput.value = '';
        encryptedInput.value = encryptedText;
    });

    readButton.addEventListener('click', function () {
        let encrypetedMessage = encryptedInput.value;
        let decodedText = '';

        for (let char of encrypetedMessage) {
            let numASCII = char.charCodeAt() - encryptionValue.text;
            decodedText += String.fromCharCode(numASCII);
        }

        encryptedInput.value = decodedText;
    });
}