function deleteByEmail() {
    let input = document.querySelector('label input');
    let customers = document.getElementById('customers').lastElementChild.children;
    let resultField = document.getElementById('result');
    let hasCustomer = Array.from(customers).find(el => el.lastElementChild.innerHTML === input.value);

    if (hasCustomer) {
        hasCustomer.remove();
        resultField.innerHTML = 'Deleted.'
    } else {
        resultField.innerHTML = 'Not found.'
    }

    setTimeout(() => {
        resultField.innerHTML = '';
    }, 2000);
}

