const getAllBooksButton = document.getElementById('loadBooks');
const tableWrapper = document.getElementById('table-wrapper');
const addBookForm = document.getElementById('add-book-form');
const editBookForm = document.getElementById('edit-book-form');

const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');

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

    let tr = e.target.closest('tr');
    let bookId = tr.getAttribute('data-book-id');

    // Delete functionality - DELETE request
    if (e.target.textContent === 'Delete') {

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

    // Update functionality - PUT request
    if (e.target.textContent === 'Edit') {

        // Hide Add book form and create new form for editing
        addBookForm.style.display = 'none';
        editBookForm.style.display = 'block';
        // Add dynamically book id to the form as there is no other way of getting the bookId in the "Edit" button event handler  
        editBookForm.setAttribute('data-edit-book-id', bookId);

        // Set the current values to the edit form
        let tds = tr.querySelectorAll('td');

        let title = tds[0].textContent;
        let author = tds[1].textContent;
        let isbn = tds[2].textContent;

        let editTitleEl = editBookForm.querySelector('#edit-title');
        editTitleEl.value = title;
        let editAuthorEl = editBookForm.querySelector('#edit-author');
        editAuthorEl.value = author;
        let editIsbnEl = editBookForm.querySelector('#edit-isbn');
        editIsbnEl.value = isbn;

        //Set the body data for the PUT request

    }
});

editButton.addEventListener('click', function (e) {
    e.preventDefault();

    let form = e.target.parentElement;
    let bookId = form.getAttribute('data-edit-book-id');

    let inputs = form.querySelectorAll(`input`);  // replace this with your actual selector

    let title = inputs[0].value;
    let author = inputs[1].value;
    let isbn = inputs[2].value;

    let bodyData = {
        title,
        author,
        isbn
    };

    // PUT request to the server (Firebase in this case)
    fetch(`${baseUrl}/${bookId}.json`, {
        method: 'PUT',
        body: JSON.stringify(bodyData)
    })
        .then(res => res.json())
        .then(bookData => {
            // Update dynamically DOM
            let tr = document.querySelector(`tr[data-book-id="${bookId}"]`); 
            let tds = tr.children;
            tds[0].textContent = bookData.title;
            tds[1].textContent = bookData.author;
            tds[2].textContent = bookData.isbn;

        })
        .catch(err => {
            console.log(err.message);
        })
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