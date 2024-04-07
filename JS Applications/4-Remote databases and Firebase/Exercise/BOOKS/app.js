const getAllBooksButton = document.getElementById('loadBooks');
const tableWrapper = document.getElementById('table-wrapper');
const addBookForm = document.getElementById('add-book');
const addButton = addBookForm.querySelector('#add-button');

const baseUrl = 'https://js-app-ex-rem-dbs-blogs-2024-default-rtdb.firebaseio.com/books';

// Get all books - GET request
getAllBooksButton.addEventListener('click', function (e) {
    fetch(baseUrl + '.json')
        .then(res => res.json())
        .then(bookData => {
            let messageEl = document.getElementById('message');
            messageEl.style.display = 'none';
            createTableDOM(bookData);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// Add book - POST request
addButton.addEventListener('click', function (e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let isbn = document.getElementById('isbn').value;


    let bodyData = {
        title,
        author,
        isbn
    }

    fetch(`${baseUrl}.json`, {
        method: 'POST',
        body: JSON.stringify(bodyData)
    })
        .then(res => res.json())
        .then(bookId => {
            console.log(bookId);

            let tableBodyEl = tableWrapper.querySelector('tbody');

            // If table is opened (GET all books)
            if (tableBodyEl) {
                // Add dynamically new row to the table after POST request
                let tr = document.createElement('tr');
                fillUpTr(bodyData, tr);

                // Append tr to tbody
                let tbody = tableWrapper.querySelector('tbody');
                tbody.appendChild(tr);
            }
        })
        .catch(err => {
            console.log(err.message);
        })
});

// Delete and Update functionality - DELETE & PACTH request
tableWrapper.addEventListener('click', function (e) {

    if (e.target.tagName !== 'BUTTON') {
        return;
    }

    // Delete functionality
    if (e.target.textContent === 'Delete') {
        let tr = e.target.closest('tr');
        let bookId = tr.getAttribute('data-book-id');

        // DELETE request to the server (Firebase in this case)
        fetch(`${baseUrl}/${bookId}.json`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(res => {
                // Dynamically remove the table row with deleted book element
                tr.remove();
                console.log('Succesfully deleted');

                console.log(res);
            }).catch(() => {
                console.log("An error occurred while trying to delete the item.");
            });

    }


    // Update functionality
    if (e.target.textContent === 'Edit') {

    }
});

function createTableDOM(bookData) {
    // <!-- Create table body -->

    // Create table
    const table = document.createElement('table');
    table.id = 'table-books';

    // Create thead
    const thead = document.createElement('thead');

    // Create tr
    const tr = document.createElement('tr');

    // Create th elements for Title, Author, Isbn, and Action
    const thTitle = document.createElement('th');
    thTitle.textContent = 'Title';
    const thAuthor = document.createElement('th');
    thAuthor.textContent = 'Author';
    const thIsbn = document.createElement('th');
    thIsbn.textContent = 'Isbn';
    const thAction = document.createElement('th');
    thAction.textContent = 'Action';

    // Append th elements to tr
    tr.appendChild(thTitle);
    tr.appendChild(thAuthor);
    tr.appendChild(thIsbn);
    tr.appendChild(thAction);

    // Append tr to thead
    thead.appendChild(tr);

    // Append thead to table
    table.appendChild(thead);

    // Append table to body or other parent element
    tableWrapper.appendChild(table);

    // <!-- Create table body -->
    let tbody = document.createElement('tbody');

    // Iterate through the books
    Object.keys(bookData).forEach(key => {
        let tr = document.createElement('tr');
        tr.setAttribute('data-book-id', key);

        fillUpTr(bookData[key], tr);
        // Append tr to tbody
        tbody.appendChild(tr);
    });

    // Append table body to the table element
    table.appendChild(tbody);
}

function fillUpTr(bodyData, tr) {
    // Create td elements for Title, Author, Isbn, and Buttons
    let tdTitle = document.createElement('td');
    tdTitle.textContent = bodyData.title;

    let tdAuthor = document.createElement('td');
    tdAuthor.textContent = bodyData.author;

    let tdIsbn = document.createElement('td');
    tdIsbn.textContent = bodyData.isbn;

    let tdButtons = document.createElement('td');
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    tdButtons.appendChild(editButton);
    tdButtons.appendChild(deleteButton);

    // Append td elements to tr
    tr.appendChild(tdTitle);
    tr.appendChild(tdAuthor);
    tr.appendChild(tdIsbn);
    tr.appendChild(tdButtons);
}