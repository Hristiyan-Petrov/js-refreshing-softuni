function focus() {
    let wrapper = document.body.children[0];
    // console.log(wrapper);

    // let fisrtInput = wrapper.querySelector('div > input');
    // fisrtInput.addEventListener('focus', function(e) {
    // console.log(e.target);
    // })

    wrapper.addEventListener('focus', function (e) {
        if (e.target.tagName === 'INPUT') {
            e.target.parentElement.classList.add('focused');
        }
    }, true);

    wrapper.addEventListener('blur', function(e) {
        if (e.target.nodeName === 'INPUT') {
            e.target.parentElement.classList.remove('focused');
        }
    }, true);
}