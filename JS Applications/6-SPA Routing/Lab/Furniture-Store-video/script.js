document.addEventListener('DOMContentLoaded', (event) => {

    const routes = {
        '/home': document.getElementById('home-section'),
        '/create': document.getElementById('create-section'),
        '/details': document.getElementById('details-section'),
        '/profile': document.getElementById('profile-section'),
        '/error': document.getElementById('error-section'),
    };

    const router = pathname => {
        let [path, id] = pathname.split('/').filter(x => x); // filter only the thuthy values
        path = '/' + path;

        // Check if route exists and redirect to error page if not
        if (!Object.keys(routes).includes(path)) {
            redirect('/error');
            return;
        }

        // Hide all contents on every route click
        Object.values(routes).forEach(section => section.style.display = 'none');

        // Show current content
        routes[path].style.display = 'block';

        switch (path) {
            case '/home':
                renderHomepage();
                break;

            case '/details':
                renderItemDetailsPage(id, routes[path]);
                break;
            default:
                break;
        }

        // Filters
        document.getElementById('search-input')?.addEventListener('input', onSearchChange);
        document.getElementById('year-filter')?.addEventListener('change', onFilterChange);
    }

    function redirect(path) {
        history.pushState({}, '', path);
        router(path);
    }

    function renderItemDetailsPage(id, detailsContainerElement) {
        fetch(`https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture/${id}.json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);

                let furnitureView = document.getElementById('item-details-template').innerHTML;
                let createTemplate = Handlebars.compile(furnitureView);
                let detailsHtml = createTemplate(data);
                detailsContainerElement.innerHTML += detailsHtml;
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    function renderHomepage() {
        fetch('https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json')
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData);

                // Convert object data to array
                data = Object.keys(responseData).map(key => ({ ...responseData[key], id: key }));
                filteredData = [...data]; // Initially, all data is set as filtered data
                searchData = [...data]; // Initially, all data is set as searched data

                renderData(data);
                
                // Filters
                // Attach event listener to the container
                // document.getElementById('container').addEventListener('change', function (e) {
                //     if (e.target.id === 'year-filter') {
                //         onFilterChange(e);
                //     }
                // });

                document.getElementById('year-filter')?.addEventListener('change', onFilterChange);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    function renderData(dataToRender) {
        // Use the Handlebars template to render
        let furnituresView = document.getElementById('home-section-template').innerHTML;
        let createTemplate = Handlebars.compile(furnituresView);
        let allFurnituresHtml = createTemplate({ furniture: dataToRender });

        // Append to DOM
        document.getElementById('home-section').innerHTML = allFurnituresHtml;
    }

    function onRouteChange(e) {
        if (e.target.tagName !== 'A') {
            return;
        }

        // Prevent reload
        e.preventDefault();

        // Go to the route
        let url = new URL(e.target.href);
        redirect(url.pathname);
    }

    // Add furniture
    function onCreateSubmit(e) {
        if (!e.target.nodeName === 'FORM') return;

        e.preventDefault();

        // Fields Validation
        let allInputsValid = true; // Define a flag to check if all inputs are valid
        let inputs = Array.from(e.target.elements);
        validate();
        if (!allInputsValid) return;

        // Start making request
        const url = 'https://js-apps-routing-lab-furniture-default-rtdb.firebaseio.com/furniture.json';
        let make = formElement.querySelector('#new-make').value;
        let price = formElement.querySelector('#new-price').value;
        let model = formElement.querySelector('#new-model').value;
        let imageUrl = formElement.querySelector('#new-image').value;
        let year = formElement.querySelector('#new-year').value;
        let material = formElement.querySelector('#new-material').value;
        let description = formElement.querySelector('#new-description').value;

        let newFurniture = {
            make,
            price,
            model,
            imageUrl,
            year,
            material,
            description
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'applicatoin/json'
            },
            body: JSON.stringify(newFurniture)
        })
            .then(res => res.json())
            .then(data => {
                redirect('/home');
            })
            .catch(err => {
                console.log(err.message);
            });

        function validate() {

            inputs.forEach((input, i) => {
                // Skip if the input does not have the 'required' attribute 
                if (!input.hasAttribute('required')) return;

                if (!input.checkValidity()) {
                    input.classList.add('is-invalid');
                    allInputsValid = false;
                } else {
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }
            });
        }
    }

    let formElement = document.getElementById('create-form');
    formElement.addEventListener('submit', onCreateSubmit);

    // Navigation
    document.querySelector('nav').addEventListener('click', onRouteChange);

    // Filters
    let filteredData = [];
    let searchData = [];

    function onSearchChange(e) {
        const searchText = e.target.value.toLowerCase();
        searchData = filteredData.filter(item => item.make.toLowerCase().includes(searchText) || item.model.toLowerCase().includes(searchText));
        renderData(searchData);
    }

    function onFilterChange(e) {
        console.log('filteeer');
        const filterYear = e.target.value;
        if (filterYear !== '') {
            filteredData = data.filter(item => item.year === filterYear);
        } else {
            filteredData = [...data];
        }
        renderData(filteredData);
    }

    // routes[location.pathname].style.display = 'block'; // Load content on page reload
    router(location.pathname); // Initial app load

});