// Helper functions

const apiKey = 'AIzaSyB8X6MY_E3j_WaWWOhQvQVRc4w6LcCfuhE';
const dataBaseUrl = 'https://movies-dd028.firebaseio.com';
const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const request = async (url, method, body) => {
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

const authService = {
    async login(email, password) {

        // let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password,
        //         // returnSecureToken: true
        //     })
        // });

        let body = {
            email,
            password,
            // returnSecureToken: true
        };

        let response = await request(`${authUrl}signInWithPassword?key=${apiKey}`, 'POST', body);
        localStorage.setItem('auth', JSON.stringify(response)); // Save data for logged user in localStorage
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

    getUserId() {
        return JSON.parse(localStorage.getItem('auth')).localId;
    }
}

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