function loadRepos() {
   const url = 'https://api.github.com/users/testnakov/repos';
   const httpRequest = new XMLHttpRequest();
   const resElement = document.getElementById('res');

   httpRequest.addEventListener('loadend', function () {
      let repos = JSON.parse(this.responseText);
      
      console.log(repos);
      // target="_blank" -> open link in new tab :)
      resElement.innerHTML = repos.map(x => `<a href="${x.html_url}" target="_blank">${x.name}</a></p>`).join('');
   });
   
   httpRequest.open('GET', url);
   httpRequest.send();

}