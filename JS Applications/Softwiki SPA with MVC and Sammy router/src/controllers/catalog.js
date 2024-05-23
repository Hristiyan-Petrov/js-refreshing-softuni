// Responsible for rendering articles

import { addPartials } from "../helpers.js";

export async function homePage() {
    console.log('homeee');

    await addPartials(this);

    this.partial('/templates/catalog/homePage.hbs');
}