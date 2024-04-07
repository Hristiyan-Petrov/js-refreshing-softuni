const getAllBooksButton = document.getElementById('loadBooks');
const tableWrapper = document.getElementById('table-wrapper');

const baseUrl = 'https://js-app-ex-rem-dbs-blogs-2024-default-rtdb.firebaseio.com/books';

getAllBooksButton.addEventListener('click', function (e) {
    fetch(baseUrl + '.json')
        .then(res => res.json())
        .then(bookData => {

            createTableDOM(bookData);


        });
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

        // Create td elements for Title, Author, Isbn, and Buttons
        let tdTitle = document.createElement('td');
        tdTitle.textContent = bookData[key].title;

        let tdAuthor = document.createElement('td');
        tdAuthor.textContent = bookData[key].author;

        let tdIsbn = document.createElement('td');
        tdIsbn.textContent = bookData[key].isbn;

        let tdButtons = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        let deleteButton = document.createElement('delete');
        deleteButton.textContent = 'Delete';
        tdButtons.appendChild(editButton);
        tdButtons.appendChild(deleteButton);

        // Append td elements to tr
        tr.appendChild(tdTitle);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdIsbn);
        tr.appendChild(tdButtons);

        // Append tr to tbody
        tbody.appendChild(tr);
    });

    // Append table body to the table element
    table.appendChild(tbody);
}