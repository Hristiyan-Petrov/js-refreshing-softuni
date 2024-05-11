// Helper functions

const apiKey = 'AIzaSyB8X6MY_E3j_WaWWOhQvQVRc4w6LcCfuhE';
const dataBaseUrl = 'https://movies-dd028.firebaseio.com';
const authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

const request = async (url, method, body) => {
    let response = await fetch(url, {
        method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    });

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
    }
}

const movieService = {
    async add(movieData) {
        let response = await request(dataBaseUrl + '/movies.json', 'POST', movieData);
        return response;
    }
}