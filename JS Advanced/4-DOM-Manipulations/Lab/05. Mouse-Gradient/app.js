function attachGradientEvents() {
    let gradientElement = document.getElementById('gradient');
    let resultField = document.getElementById('result');
    resultField.style.backgroundColor = 'green';
    resultField.style.width = '300px';


    // Getting the color of a specific pixel directly from a linear-gradient background is not currently possible with pure JavaScript.
    // CSS backgrounds are not part of the HTML canvas, and JavaScript does not provide a direct API to access CSS background pixel data.
    // However, you could simulate this by creating a hidden <canvas> element, drawing a gradient on it that matches your background,
    // and then sampling the color from the canvas using the mouse's coordinates.

    // Create a canvas that is the same size as the parent div.
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.width = gradientElement.offsetWidth;
    canvas.height = gradientElement.offsetHeight;

    // Create a linear gradient on the canvas that matches the background of our div.
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(1, 'white');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    gradientElement.addEventListener('mousemove', function (e) {
        let wrapper = e.currentTarget.getBoundingClientRect(); // returns a DOMRect object providing information about the size of an element and its position relative to the viewport
        let x = e.clientX - wrapper.left; // mouse X coordinates relative to the viewport/(parent?); actually you can get that directly with the built in e.offsetX
        let y = e.clientY - wrapper.top;
        resultField.textContent = `${(e.offsetX * 100 / wrapper.width).toFixed(0)}%`;


        // When the mouse moves over the div, get the color of the pixel at the mouse's coordinates on the canvas, and set it as result color 
        let pixel = ctx.getImageData(x, y, 1, 1);
        let data = pixel.data;

        let rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        resultField.style.color = rgba;
    });
}