import register from "../views/register.js";
import request from "./request.js";

const subdomain = 'willingyak-eu.backendless.app';

const endpoints = {
    login: `https://${subdomain}/api/users/login`,
    register: `https://${subdomain}/api/users/register`,
}

export default {
    async login(login, password) {
        let response = await request.post(endpoints.login, {
            login,
            password
        });

        localStorage.setItem('auth', JSON.stringify({
            'user-token': response['user-token'],   // For Backendless
            'email': response.email
        }));
        return response;
    },

    async register(email, password) {
        return await request.post(endpoints.register, {
            email,
            password,
        });
    },

    getData() {

        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data.idToken),
                email: data.email
            };
            // Handle case when user is not logged in, cause getData() is executed on every route 
        } catch (error) {
            return {
                isAuthenticated: false,
                email: ''
            }
        }

    },

    logout() {
        localStorage.removeItem('auth');
    },

    getUserToken() {
        return JSON.parse(localStorage.getItem('auth'))['user-token'];
    }
}