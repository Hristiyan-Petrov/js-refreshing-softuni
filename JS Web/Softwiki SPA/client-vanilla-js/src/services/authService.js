import request from "./request.js";

// const subdomain = 'willingyak-eu.backendless.app';
// const authEndpointBase = `https://${subdomain}/api/users`;

const authEndpointBase = 'http://localhost:5000/api/auth'

const endpoints = {
    login: `${authEndpointBase}/login`,
    register: `${authEndpointBase}/register`,
    logout: `${authEndpointBase}/logout`
}

const applicationJsonHeaders = {
    'Content-Type': 'application/json'
}

export default {
    async login(login, password) {
        return await request.post(endpoints.login, applicationJsonHeaders, {
            login,
            password
        });
    },

    async register(email, password, rePassword) {
        return await request.post(endpoints.register, applicationJsonHeaders, {
            email,
            password,
            rePassword
        });
    },

    async logout() {
        let headers = {
            'user-token': this.getData()['user-token']
        };

        return await request.get(endpoints.logout, headers);
    },

    getData() {

        try {
            let data = JSON.parse(localStorage.getItem('auth'));

            return {
                isAuthenticated: Boolean(data['user-token']),
                email: data.email,
                'user-token': data['user-token'],
                uid: data.uid
            };
            // Handle case when user is not logged in, cause getData() is executed on every route 
        } catch (error) {
            return {
                isAuthenticated: false,
                email: '',
                'user-token': '',
                uid: ''
            }
        }
    },
}