function validate() {
    let emailField = document.querySelector('#email'); 
    emailField.addEventListener('change', e => {
        let emailCurrent = e.currentTarget;
        let emailRegex = /^[a-z]+@[a-z]+\.[a-z]+$/;

        if (emailRegex.test(emailCurrent.value)) {
            emailCurrent.value = '';
            emailCurrent.classList.remove('error');
            // alert("Email is valid");
        } else {
            emailCurrent.classList.add('error');
        }
    })
}