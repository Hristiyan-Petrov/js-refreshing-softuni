import request from "./request.js";
import authService from './authService.js';

const subdomain = 'willingyak-eu.backendless.app';
const dataBaseEndpoint = `https://${subdomain}/api/data/Articles`;

// const applicationJsonHeaders = {
//     'Content-Type': 'application/json'
// };

const backendlessLoggedHeaders = {
    'Content-Type': 'application/json',
    'user-token': authService.getUserToken()
}

export default {
    async create(articleBody) {
        return await request.post(dataBaseEndpoint, backendlessLoggedHeaders, articleBody);
    },

    async getAll() {
        return await request.get(dataBaseEndpoint, backendlessLoggedHeaders);
    },

}