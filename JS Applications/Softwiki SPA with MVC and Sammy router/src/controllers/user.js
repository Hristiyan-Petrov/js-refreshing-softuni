import { login, register } from "../data.js";
import { addPartials } from "../helpers.js";

export async function registerPage() {
    await addPartials(this);
    this.partial('/templates/user/registerPage.hbs');
}

export async function loginPage() {
    await addPartials(this);
    this.partial('/templates/user/loginPage.hbs');
}

export async function postRegister(ctx) {
    const { email, password, rePass } = (ctx.params);

    if (email.length === 0 || password.length === 0) {
        throw new Error('All fields must have value!');
    } else if (password !== rePass) {
        throw new Error('Passwords must match!');
    }

    register(email, password)
        .then(res => {
            ctx.app.userData = res;     // Update app context dynamically
            ctx.redirect('/home');
        })
        .catch(err => {
            console.log('Error from catch');
            throw new Error(err.message);
        });
}

export async function postLogin(ctx) {
    const { email, password } = (ctx.params);

    if (email.length === 0 || password.length === 0) {
        throw new Error('All fields must have value!');
    }

    login(email, password)
        .then(res => {
            ctx.app.userData = res;     // Update app context dynamically
            ctx.redirect('/home');
        })
        .catch(err => {
            console.log('Error from catch');
            throw new Error(err);
        });
}