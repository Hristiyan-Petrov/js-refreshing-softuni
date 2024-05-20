import authService from "./services/authService.js";

export const onLoginSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData(e.target);
    let login = formdata.get('email');
    let password = formdata.get('password');

    authService.login(login, password)  
        .then(userData => {
            console.log(userData);
            console.log('logged');
        })
}