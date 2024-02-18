const encryptionValue = { email: 2, password: 4, text: 1 }

function encodeAndDecodeMessages() {
    let [firstSection, secondSection] = Array.from(document.querySelectorAll('#main > div'));
    let [textInput, sendButton] = [firstSection.querySelector('textarea'), firstSection.querySelector('button')];
    let [encryptedInput, readButton] = [secondSection.querySelector('textarea'), secondSection.querySelector('button')];
    readButton.disabled = true;

    // const convertMessage = (message, operator) => Array.from(message, char => String.fromCharCode(char.charCodeAt() + operator * encryptionValue.text)).join('');

    function convertMessage(message, operator) {
        	return Array.from(message, function(char) {
                return String.fromCharCode(char.charCodeAt() + operator * encryptionValue.text); 
            }).join('');
    }

    sendButton.addEventListener('click', () => {
        let encryptedText = convertMessage(textInput.value, 1);
        textInput.value = '';
        encryptedInput.value = encryptedText;
        readButton.disabled = false;
    });

    readButton.addEventListener('click', () => {
        encryptedInput.value = convertMessage(encryptedInput.value, -1);
        readButton.disabled = true;
    });
}