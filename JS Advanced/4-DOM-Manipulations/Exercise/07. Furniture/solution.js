function solve() {
	let tableDB = document.querySelector('.wrapper tbody');
	let [newFurnitureInput, resultField] = document.querySelectorAll('#container textarea');

	// GENERATE button
	let generateButtonElement = document.querySelector('#container button');
	generateButtonElement.addEventListener('click', addNewFurniture);

	function addNewFurniture(e) {
		let newFurnitureArray = JSON.parse(newFurnitureInput.value.trim());

		newFurnitureArray.forEach(furniturePiece => {
			let tableRowElement = document.createElement('tr'); // For each piece of incomming new furniture 

			Object.entries(furniturePiece).forEach(([data, value]) => { // get each piece data
				createTableRowWithData(tableRowElement, data, value);
			});

			addCheckBoxToCurrentPice(tableRowElement);
			tableDB.appendChild(tableRowElement);
		});

		document.querySelector('#container textarea').value = '';
	}

	// BUY button
	let buyButtonElement = document.querySelectorAll('#exercise button')[1];
	buyButtonElement.addEventListener('click', showResult);

	function showResult(e) {
		//get all checkboxes that are marked 
		let checkedPieces = [...tableDB.children].filter(tr => tr.lastElementChild.lastElementChild.checked);

		// show them in the result textbox
		let names = checkedPieces
			.map(tr => tr.children[1].querySelector('p').textContent)
			.join(', ');
		resultField.textContent = `Bought furniture: ${names}\n`;

		let totalPrice = checkedPieces
			.map(tr => Number(tr.children[2].querySelector('p').textContent))
			.reduce((acc, price) => acc + price, 0);
		resultField.textContent += `Total price: ${totalPrice.toFixed(2)}\n`;

		let averagedecFactor = checkedPieces
			.map(tr => Number(tr.children[3].querySelector('p').textContent))
			.reduce((acc, factor) => acc + factor) / checkedPieces.length;
		resultField.textContent += `Average decoration factor: ${averagedecFactor.toFixed(1)}`;

	}

	// Helpers ?
	function createTableRowWithData(tableRowElement, data, value) {
		let tableDataElement = document.createElement('td');	// create td inside tr for each line of data // check HTML table architecture

		if (data === 'img') {
			let imgElement = document.createElement('img');
			imgElement.setAttribute('src', value);
			tableDataElement.appendChild(imgElement);
			tableRowElement.prepend(tableDataElement);
		} else {
			let pElement = document.createElement('p');
			pElement.textContent = value;
			tableDataElement.appendChild(pElement);
			tableRowElement.appendChild(tableDataElement);
		}
	}

	function addCheckBoxToCurrentPice(tableRowElement) {
		let tableDataElement = document.createElement('td');
		let pieceCheckBoxElement = document.createElement('input');
		pieceCheckBoxElement.setAttribute('type', 'checkbox');
		tableDataElement.appendChild(pieceCheckBoxElement);
		tableRowElement.appendChild(tableDataElement);
	}
}




[
	{
		"name": "Sofa",
		"img": "https://res.cloudinary.com/maisonsdumonde/image/upload/q_auto,f_auto/w_200/img/grey-3-seater-sofa-bed-200-13-0-175521_9.jpg",
		"price": 150,
		"decFactor": 1.2
	}
]