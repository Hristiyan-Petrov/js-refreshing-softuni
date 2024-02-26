function hanldeProvision(currentStockArray, orderArray) {
    let currentStock = {};

    setItems(currentStockArray);
    setItems(orderArray);

    Object.entries(currentStock).forEach(([key, value]) => {
        console.log(`${key} -> ${value}`);
    });

    function setItems(array) {
        for (let i = 0; i < array.length; i += 2) {
            let item = array[i];
            let quantity = Number(array[i + 1]);

            if (currentStock[item]) {
                currentStock[item] += quantity;
            } else {
                currentStock[item] = quantity;
            }
        }
    }

    // for (let i = 0; i < currentStockArray.length; i += 2) {
    //     let item = currentStockArray[i];
    //     let quantity = Number(currentStockArray[i + 1]);

    //     currentStock[item] = quantity;
    // }

    // for (let i = 0; i < orderArray.length; i += 2) {
    //     let item = orderArray[i];
    //     let quantity = Number(orderArray[i + 1]);

    //     if (currentStock[item]) {
    //         currentStock[item] += quantity;
    //     } else {
    //         currentStock[item] = quantity;
    //     }
    // }
}

hanldeProvision(
    [
        'Salt', '2', 'Fanta', '4', 'Apple', '14', 'Water', '4', 'Juice', '5'
    ],
    [
        'Sugar', '44', 'Oil', '12', 'Apple', '7', 'Tomatoes', '7', 'Bananas', '30'
    ]

)