function loadRepos() {
	// const httpRequest = new XMLHttpRequest();
	const reposElement = document.getElementById('repos');
	const userElement = document.getElementById('username');

	// httpRequest.addEventListener('loadend', function () {
	// 	let repos = JSON.parse(this.responseText);
		
	// 	console.log(repos);
	// 	// target="_blank" -> open link in new tab :)
	// 	reposElement.innerHTML = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
	// });
	
	
	// httpRequest.open('GET', url);
	// httpRequest.send();
	
	
	const url = `https://api.github.com/users/${userElement.value}/repos`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			// let repos = data.responseText;
			reposElement.innerHTML = data.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
		})
}