// Using Backendless as db

const subdomain = 'willingyak-eu.backendless.app';
const dataBaseUrl = `https://${subdomain}/api/data/Articles`;
const authUrl = `https://${subdomain}/api/users`;

const endpoints = {
    login: `${authUrl}/login`,
    register: `${authUrl}/register`,
};

function assembleUrl(url) {
    let resultUrl = dataBaseUrl + url + '.json';

    // let auth = getUserData();

    // Firebase wants auth token attached to the request for security.
    if (auth != null) {
        resultUrl += `?auth=${auth.idToken}`;
    }

    return resultUrl;
};

async function request(url, method, body) {
    let options = {
        method,
        headers: {
            'content-type': 'application/json'
        },
    }

    if (body) {
        Object.assign(options, {
            body: JSON.stringify(body)
        });
    }

    let response = await fetch(url, options);
    let data = await response.json();
    return data;
}

// Decorators !!!
async function get(url) {
    return request(url, 'GET');
}

async function post(url, body) {
    return request(url, 'POST', body);
}

async function del(url) {
    return request(url, 'DELETE');
}

async function patch(url) {
    return request(url, 'PATCH');
}

// Auth Services

export async function login(email, password) {

    let response = await post(endpoints.login, {
        email,
        password,
        // returnSecureToken: true
    });

    sessionStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in sessionStorage
    return response;
}

export async function register(email, password) {
    let response = await post(endpoints.register, {
        email,
        password,
        // returnSecureToken: true  // for Firebase 
    });

    sessionStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in sessionStorage
    return response;
}

window.login = login;
window.register = register;

// const authService = {
//     getUserId() {
//         return JSON.parse(sessionStorage.getItem('auth')).localId;
//     }
// }

// DB Services