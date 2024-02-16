function attachEvents() {
    let url = '../databases/phonebook.json';
    let loadButtonElement = document.getElementById('btnLoad');
    let listElement = document.getElementById('phonebook');

    loadButtonElement.addEventListener('click', function (e) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                let phonebook = data.phonebook;
                Object.keys(phonebook).forEach(key => {
                    let liElement = document.createElement('li');
                    liElement.innerText = `${phonebook[key].person}: ${phonebook[key].phone}`;

                    let deleteButtonElement = document.createElement('button');
                    deleteButtonElement.setAttribute('id', 'delete');
                    deleteButtonElement.innerText = 'Delete';
                    // firework softuni server is out of date 
                    // deleteButtonElement.addEventListener('click', (e) {
                    //     let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
                    //     fetch(deleteUrl, {method: 'DELETE'});
                    // });

                    liElement.appendChild(deleteButtonElement);
                    listElement.append(liElement);

                });
            })
            // .catch(err => {
            //     console.log(err);
            // });
    });
}

attachEvents();