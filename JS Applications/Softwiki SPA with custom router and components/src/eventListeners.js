import authService from "./services/authService.js";
import { router } from "./router.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let login = formdata.get('email');
    let password = formdata.get('password');

    authService.login(login, password)
        .then(userData => {
            localStorage.setItem('auth', JSON.stringify({
                'user-token': userData['user-token'],   // For Backendless
                'email': userData.email
            }));
            console.log('logged');
            router('/');
        })
};

export const onRegisterSubmit = e => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let email = formdata.get('email');
    let password = formdata.get('password');
    let rePassword = formdata.get('rep-pass');

    if (password !== rePassword) {
        console.log('passwords must match!');
        return;
    }

    authService.register(email, password)
        .then(userData => {
            console.log(userData);
            console.log('registered');
            // history.pushState({}, '', '/login');
            router('/login');
        })
};

export const onLogout = e => {
    e.preventDefault();
    authService.logout(authService.getData()["user-token"])
        .then(() => {
            localStorage.removeItem('auth');
            console.log('logged out');
            router('/login');
        })
}