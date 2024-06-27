import request from "./request.js";
import authService from './authService.js';

// const subdomain = 'willingyak-eu.backendless.app';
// const dataBaseEndpoint = `https://${subdomain}/api/data/Articles`;

const dataBaseEndpoint = 'http://localhost:5000/api/articles'

// const applicationJsonHeaders = {
//     'Content-Type': 'application/json'
// };

const jsonHeaders = {
    'Content-Type': 'application/json',
}

const createHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authService.getData()['user-token']}`
});


export default {
    async create(articleBody) {
        return await request.post(dataBaseEndpoint, createHeaders(), articleBody);
    },

    async getAll() {
        try {
            return await request.get(dataBaseEndpoint, createHeaders());
        } catch (error) {
            console.log('err from artcile service: ' + error);
            throw error;
        }
    },

    async getOne(id) {
        return await request.get(`${dataBaseEndpoint}/${id}`, createHeaders());
    },

    async edit(id, articleBody) {
        return await request.put(`${dataBaseEndpoint}/${id}`, createHeaders(), articleBody);
    },

    async delete(id) {
        return await request.delete(`${dataBaseEndpoint}/${id}`, createHeaders());
    }
}