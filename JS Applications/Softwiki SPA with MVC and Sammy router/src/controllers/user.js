import { addPartials } from "../helpers.js";

export async function registerPage() {
    await addPartials(this);
    this.partial('/templates/user/registerPage.hbs');
}

export async function loginPage() {
    await addPartials(this);
    this.partial('/templates/user/loginPage.hbs');
}