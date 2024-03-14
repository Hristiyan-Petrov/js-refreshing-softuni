function createArticle() {
	let wrapperArticlesElement = document.querySelector('#articles');

	let newArticleElement = document.createElement('article');
	let headerElement = document.createElement('h3');
	let contentElement = document.createElement('p');

	let titleTextElement = document.getElementById('createTitle');
	let titleText = titleTextElement.value;
	let contentTextElement = document.getElementById('createContent');
	let contentText = contentTextElement.value;

	if (titleText === '' || contentText === '') {
		alert( 'Please fill in all fields.' );
		return;
	}

	headerElement.innerHTML = titleText;
	contentElement.innerHTML = contentText;
	newArticleElement.appendChild(headerElement);
	newArticleElement.appendChild(contentElement);
	wrapperArticlesElement.appendChild(newArticleElement);

	// clear values
	titleTextElement.value = '';
	contentTextElement.value = '';

}