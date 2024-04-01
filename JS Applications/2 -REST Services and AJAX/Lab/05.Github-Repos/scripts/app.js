function loadRepos() {
	const httpRequest = new XMLHttpRequest();
	const reposElement = document.getElementById('repos');
	const userElement = document.getElementById('username');

	httpRequest.addEventListener('loadend', function () {
		let repos = JSON.parse(this.responseText);
		
		console.log(repos);
		// target="_blank" -> open link in new tab :)
		reposElement.innerHTML = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
	});
	
	const url = `https://api.github.com/users/${userElement.value}/repos`;
	
	httpRequest.open('GET', url);
	httpRequest.send();
}