// Abstract function
// Named export
const request = async (method, url, headers, body) => {
    let options = {
        method
    }

    if (headers) {
        Object.assign(options, {
            headers
        });
    }

    if (body) {
        Object.assign(options, {
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);

    if (url.includes('logout')) {
        return response;
    }

    let data = await response.json();
    return data;
}

// Additional abstraction
export default {
    get: request.bind(this, 'GET'),
    post: request.bind(this, 'POST'),
    put: request.bind(this, 'PUT'),
    patch: request.bind(this, 'PATCH'),
    delete: request.bind(this, 'DELETE')
}