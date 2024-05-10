const apiKey = 'AIzaSyB8X6MY_E3j_WaWWOhQvQVRc4w6LcCfuhE';

const authService = {
    async login(email, password) {
        let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                // returnSecureToken: true
            })
        });

        let data = await response.json();
        localStorage.setItem('auth', JSON.stringify(data)); // Save data for logged user in localStorage
        return data;
    },

    getData() {
        let data = JSON.parse(localStorage.getItem('auth'));
        return {
            isAuthenticated: Boolean(data.idToken),
            email: data.email || ''
        };
    }
}