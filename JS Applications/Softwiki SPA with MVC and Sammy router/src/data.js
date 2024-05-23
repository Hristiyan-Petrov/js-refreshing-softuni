// Using Backendless as db

import { getUserToken, setUserData } from "./helpers.js";

const subdomain = 'willingyak-eu.backendless.app';
const authUrl = `https://${subdomain}/api/users`;

const endpoints = {
    login: `${authUrl}/login`,
    register: `${authUrl}/register`,
    articles: `https://${subdomain}/api/data/Articles`,
    artilceByID: `https://${subdomain}/api/data/Articles/`,
    
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

    if (!url.includes(authUrl)) {
        // Every article operation needs 'user-token'in headers 
        options.headers['user-token'] = getUserToken();
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

// Auth Services

export async function login(email, password) {

    let response = await post(endpoints.login, {
        login: email,
        password,
        // returnSecureToken: true
    });

    setUserData(response);
    return response;
};

export async function register(email, password) {
    let registerRes = await post(endpoints.register, {
        email,
        password,
        // returnSecureToken: true  // for Firebase 
    });

    let loginRes = await login(registerRes.email, password);

    setUserData(loginRes);
    return loginRes;
};

window.login = login;
window.register = register;


// DB Services

export const createArticle = async (body) => await post(endpoints.articles, body);

export const getAllArticles = async () => await get(endpoints.articles);

export const getOneById = async (id) => await get(endpoints.artilceByID + id);

export const editArticle = async (id, body) => await put(endpoints.artilceByID + id, body);

export const deleteArticle = async (id) => await del(endpoints.artilceByID + id);


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

async function put(url, body) {
    return request(url, 'PUT', body);
}