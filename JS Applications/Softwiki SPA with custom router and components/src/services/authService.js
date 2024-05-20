import request from "./request.js";

const subdomain = 'willingyak-eu.backendless.app';

const endpoints = {
    login: `https://${subdomain}/api/users/login`,
}

export default {
    async login(login, password) {

        let response = await request.post(endpoints.login, {
            login,
            password
        });

        localStorage.setItem('auth', JSON.stringify({
            'user-token': response['user-token'],
            'email': response.email
        })); // Save data for logged user in localStorage
        return response;
    },

    async register(email, password) {
        let body = {
            email,
            password,
            // returnSecureToken: true
        };

        let response = await request(`${authUrl}signUp?key=${apiKey}`, 'POST', body);
        localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
        return response;
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