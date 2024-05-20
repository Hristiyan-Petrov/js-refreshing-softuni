import { html, render } from 'lit-html';

export default ({
    onArticleCreateSubmit
}) => html`
  <div class="container">
        <form action="#" method="" @submit=${onArticleCreateSubmit}>
            <fieldset>
                <legend>Create article</legend>
                <p class="field title">
                    <input type="text" id="title" name="title" placeholder="Arrays">
                    <label for="title">Title:</label>
                </p>

                <p class="field category">
                    <select class="category-select" name="category">
                        <option class="category-option" value="javascript">JavaScript</option>
                        <option class="category-option" value="c#">C#</option>
                        <option class="category-option" value="python">Python</option>
                        <option class="category-option" value="java">Java</option>
                    </select>
                    <label for="category">Category:</label>
                </p>
                <p class="field content">
                    <textarea name="content" id="content"></textarea>
                    <label for="content">Content:</label>
                </p>

                <p class="field submit">
                    <button class="btn submit" type="submit">Create</button>
                </p>

            </fieldset>
        </form>
    </div>
`;