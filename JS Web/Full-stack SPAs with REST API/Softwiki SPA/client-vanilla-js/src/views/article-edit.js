import { html, render } from 'lit-html';

export default ({
    title,
    category,
    content,
    onArticleEditSubmit,
    params
}) => html`
  <div class="container">
    <form action="#" method="" @submit=${onArticleEditSubmit} data-articleId=${params.id}>
        <fieldset>
            <legend>Edit article</legend>
            <p class="field title">
                <input type="text" name="title" id="title" placeholder="${title}" value="${title}">
                <label for="title">Title:</label>
            </p>
            <p class="field category">
                <select class="category-select" name="category">
                    <option class="category-option" value="js" ?selected=${category === 'js'}>JavaScript</option>
                    <option class="category-option" value="csharp" ?selected=${category === 'csharp'}>C#</option>
                    <option class="category-option" value="python" ?selected=${category === 'python'}>Python</option>
                    <option class="category-option" value="java" ?selected=${category === 'java'}>Java</option>
                </select>
                <label for="category">Category:</label>
            </p>
            <p class="field content">
                <textarea name="content" id="content">${content}</textarea>
                <label for="content">Content:</label>
            </p>

            <p class="field submit">
                <button class="btn submit" type="submit">Edit</button>
            </p>

        </fieldset>
    </form>
</div>
`;