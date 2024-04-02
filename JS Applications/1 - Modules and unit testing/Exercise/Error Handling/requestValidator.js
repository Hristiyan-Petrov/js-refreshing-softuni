function HtppRequestValidator(HttpRequestObject) {
    const headersOrder = ['method', 'uri', 'version', 'message'];
    const validMethods = ['GET', 'POST', 'DELETE', 'CONNECT'];
    const validVersions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1', 'HTTP/2.0'];

    function isValidURI(uri) {
        // regular expression for a resource address
        const uriRegex = /^([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/;
        return uri === "*" || uriRegex.test(uri);
    }

    function isValidMessage(message) {
        // regular expression for the message
        const messageRegex = /^[^<>\\&'"]*$/;
        return messageRegex.test(message);
    }

    Array.from(Object.entries(HttpRequestObject)).forEach(([key, value]) => {
        let currentHeader = headersOrder.shift();
        switch (key) {
            case 'method':
                if (!validMethods.includes(value) || key !== currentHeader) {
                    throwError(currentHeader);
                }

                break;

            case 'uri':
                if (!isValidURI(value) || key !== currentHeader) {
                    throwError(currentHeader);
                }

                break;

            case 'version':
                if (!validVersions.includes(value) || key !== currentHeader) {
                    throwError(currentHeader);
                }

                break;

            case 'message':
                if (!isValidMessage(value) || key !== currentHeader) {
                    throwError(currentHeader);
                }

                break;
        }
    });

    return HttpRequestObject;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function throwError(prop) {
        let errorMessage = 'Invalid request header: Invalid ';
        throw new Error(errorMessage + capitalizeFirstLetter(prop));
    }
}

let obj = {
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
  }
  

let result = HtppRequestValidator(obj);
console.log(result);