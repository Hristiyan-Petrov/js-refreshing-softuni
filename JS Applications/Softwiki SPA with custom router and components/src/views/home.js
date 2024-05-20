// import { html, render } from 'lit-html';  // For webpack
import { html, render } from 'lit-html';

import articleItem from '../views/article-item.js';

export default ({
    articles,
    navigationHandler,  // Comes from: ...props
}) => {
    return html`
<div class="content">
        <section class="js">
            <h2>JavaScript</h2>
            <div class="articles">
                <!-- Render all articles; ? -> Optional chaining  -->
                ${articles?.filter(x => x.category === 'js').map(x => articleItem({ ...x, navigationHandler }))}
            </div>
        </section>
        <section class="CSharp">
            <h2>C#</h2>
            <div class="articles">
                ${articles?.filter(x => x.category === 'csharp').map(x => articleItem({ ...x, navigationHandler }))}
                
            </div>
        </section>
        <section class="Java">
            <h2>Java</h2>
            <div class="articles">
                ${articles?.filter(x => x.category === 'java').map(x => articleItem({ ...x, navigationHandler }))}
            </div>
        </section>
        <section class="Pyton">
            <h2>Pyton</h2>
            <div class="articles">
                ${articles?.filter(x => x.category === 'python').map(x => articleItem({ ...x, navigationHandler }))}
                
            </div>
        </section>
    </div>
`;
}