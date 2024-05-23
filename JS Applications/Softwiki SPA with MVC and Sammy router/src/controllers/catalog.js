// Responsible for rendering articles

import { getAllArticles } from "../data.js";
import { addPartials, mapCategories } from "../helpers.js";

export async function homePage() {
    await addPartials(this);

    this.partials.articleItem = await this.load('../../templates/catalog/articleItem.hbs');

    const context = mapCategories(await getAllArticles());


    this.partial('/templates/catalog/homePage.hbs', context);
}