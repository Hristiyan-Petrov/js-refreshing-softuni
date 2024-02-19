let validatePassword = (input) => {

    // let passwordChecks = [checkLength(input), checkCharacters(input)];

    let checkLength = (input) => {
        inputArray = convertToArray(input);

        if (inputArray.length < 6 || inputArray.length > 10) {
            // let errorMessage = "Password must be between 6 and 10 characters";
            // return errorMessage;
            return errorMessage('Password must be between 6 and 10 characters');
        }

        return false;
    }

    let checkCharacters = (input) => {
        inputArray = convertToArray(input);

        for (let element of inputArray) {
            let elementCode = element.charCodeAt();

            // ascii codes from 48-57, 65-90, 97-122
            if (elementCode < 48 ||
                elementCode > 57 && elementCode < 65 ||
                elementCode > 90 && elementCode < 97 ||
                elementCode > 122) {
                // let errorMessage = "Password must consist only of letters and digits";
                // return errorMessage;
                return errorMessage('Password must consist only of letters and digits');
            }
        }
        return false;
    }

    let checkDigits = (input) => {
        inputArray = convertToArray(input);
        let counter = 0;

        for (let element of inputArray) {
            if (element.charCodeAt() >= 48 && element.charCodeAt() <= 57) {
                counter++;
            }
        }

        if (counter >= 2) {
            return false;
        } else {
            // let errorMessage = "Password must has at least 2 digits";
            // return errorMessage;
            return errorMessage('Password must has at least 2 digits')
        }
    }

    function convertToArray(input) {
        return input.split('');
    }
    
    let errorMessage = function(message) {
        return message;
    }

    let checks = {
        length: checkLength(input),
        character: checkCharacters(input),
        digits: checkDigits(input)
    }


    let hasError = false;
    Object.keys(checks).forEach(key => {

        //if the key value is trulish, it represents the error message itself
        if (checks[key]) {
            console.log(checks[key]);
            hasError = true;
        }
    });

    if (!hasError) {
        console.log('Password is valid!');
    }
}


validatePassword('logIn4444');