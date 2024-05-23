// Responsible for rendering articles

import { getAllArticles } from "../data.js";
import { addPartials, mapCategories } from "../helpers.js";

export async function homePage() {
    await addPartials(this);

    const context = {};
    
    if (this.app.userData) {
        context.user = this.app.userData;    // this.app is the App context from Sammy features. Other contextes are Event and ?Render?
    } else {
        this.redirect('/login');
        return;
    }

    this.partials.articleItem = await this.load('../../templates/catalog/articleItem.hbs');
    
    Object.assign(context, mapCategories(await getAllArticles()))

    this.partial('/templates/catalog/homePage.hbs', context);
}