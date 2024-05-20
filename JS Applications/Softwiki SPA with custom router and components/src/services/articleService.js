import request from "./request.js";

const subdomain = 'willingyak-eu.backendless.app';
const dataBaseEndpoint = `https://${subdomain}/api/data/Articles`;

const applicationJsonHeaders = {
    'Content-Type': 'application/json'
}

export default {
    async create(articleBody) {
        let headers = Object.assign(applicationJsonHeaders, {
            'user-token': this.getUserToken()
        });
        return await request.post(dataBaseEndpoint, headers, articleBody);
    },


    getUserToken() {
        return JSON.parse(localStorage.getItem('auth'))['user-token'];
    }

}