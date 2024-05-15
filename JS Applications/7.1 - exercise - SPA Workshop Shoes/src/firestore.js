// Helper functions

const apiKey = 'AIzaSyBcIr7fqdVoidKUobm7dDRC5wFq52xX8as';
const dataBaseUrl = 'https://firestore.googleapis.com/v1/projects/shoeshelf-251a2/databases/(default)/documents/offers';
const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const endpoints = {
    LOGIN: `${authUrl}signInWithPassword?key=`,
    REGISTER: `${authUrl}signUp?key=`,
    OFFERS: 'offers.json'
};

async function request(url, method, body) {
    let options = {
        method
    }

    if (body) {
        Object.assign(options, {
            headers: {
                'content-type': 'application/json'
            },
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

// Services

async function login(email, password) {

    let response = await post(endpoints.LOGIN + apiKey, {
        email,
        password,
        // returnSecureToken: true
    });

    localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
    return response;
}

async function register(email, password) {
    let response = await request(endpoints.REGISTER + apiKey, 'POST', {
        email,
        password,
        // returnSecureToken: true
    });

    localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
    return response;
}

window.login = login;
window.register = register;

const authService = {
    getUserId() {
        return JSON.parse(localStorage.getItem('auth')).localId;
    }
}

async function getOffers() {
    return get(dataBaseUrl);
}

window.getOffers = getOffers;


const movieService = {
    async add(movieData) {
        return await request(dataBaseUrl + '/movies.json', 'POST', movieData);
    },

    async getAll() {
        let res = await request(dataBaseUrl + '/movies.json', 'GET');
        return Object.keys(res).map(key => ({ key, ...res[key] })); // Set the movie key into the object from associative array response
    },

    async getOne(key) {
        let res = await request(dataBaseUrl + `/movies/${key}.json`, 'GET');
        console.log(res);
        return {
            ...res,
            isCreator: res.creator === authService.getUserId(),
            isLiked: res.likes ? Boolean(res.likes.includes(authService.getUserId())) : false,
            likesNumber: res.likes ? res.likes.length : false
        };
    },

    async deleteMovie(key) {
        return await request(dataBaseUrl + `/movies/${key}.json`, 'DELETE');
    },

    async editMovie(key, movieData) {
        return await request(dataBaseUrl + `/movies/${key}.json`, 'PUT', movieData);
    },

    async likeMovie(key) {
        let movieData = await request(dataBaseUrl + `/movies/${key}.json`, 'GET');
        const userId = authService.getUserId(); // Get current user's id

        if (!movieData.likes) {
            movieData.likes = [userId]; // If 'likes' attribute does not exist, initialize it as an empty array
        } else {
            movieData.likes.push(userId); // Push the current userId to the 'likes' array
        }

        // Send a PATCH request to update the movie data (PUT will also work)
        return await request(dataBaseUrl + `/movies/${key}.json`, 'PATCH', movieData);
    }
}