// Using Backendless as db

import { getUserToken, removeUserData, setUserData } from "./helpers.js";

const subdomain = 'willingyak-eu.backendless.app';
const authUrl = `https://${subdomain}/api/users`;

const endpoints = {
    login: `${authUrl}/login`,
    register: `${authUrl}/register`,
    logout: `${authUrl}/logout`,
    articles: `https://${subdomain}/api/data/Articles`,
    artilceByID: `https://${subdomain}/api/data/Articles/`,
    
};

async function request(url, method, body) {
    let options = {
        method,
        headers: {
            'content-type': 'application/json'
        },
    }

    if (url !== endpoints.login && url !== endpoints.register) {
        // Every article operation needs 'user-token'in headers 
        options.headers['user-token'] = getUserToken();
    }

    if (body) {
        Object.assign(options, {
            body: JSON.stringify(body)
        });
    }
    

    let response = await fetch(url, options);
    let data;

    if (url !== endpoints.logout) {
        data = await response.json();
    }

    if (data && data.errorData) {
        throw new Error (data.message);
    }

    return data;
}

// Auth Services

export async function login(email, password) {

    let response = await post(endpoints.login, {
        login: email,
        password,
        // returnSecureToken: true  // For Firebase
    });

    // if (response.errorData) {
    //     throw new Error (response.message);
    // }

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

export async function logout() {
    let response = await get(endpoints.logout);
    removeUserData();
    return response;
}

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