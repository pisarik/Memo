// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
	let table = createTable();
  
	StorageManager.CARDS(function(cards) {
		let tbody = document.createElement('tbody');
		for (let i = 0; i < cards.length; i++){	
			tbody.appendChild(createRow(cards[i].id, 
																	cards[i].word, cards[i].translation,
																	cards[i].showDate, cards[i].showNumber));
		}

		table.appendChild(tbody);
		document.body.appendChild(table);
	});

	document.getElementById('addCard').addEventListener('submit', addCard);
});

function createTable(){
	let table = document.createElement('table');

		let thead = document.createElement('thead');

			let header = document.createElement('tr');
			
				let wordCol = document.createElement('th');
					wordCol.setAttribute("align", "center");
				wordCol.appendChild(document.createTextNode("Word"));

				let translationCol = document.createElement('th');
					translationCol.setAttribute("align", "center");
				translationCol.appendChild(document.createTextNode("Translation"));

				let showDateCol = document.createElement('th');
					showDateCol.setAttribute("align", "center");
				showDateCol.appendChild(document.createTextNode("When"));		

				let progressCol = document.createElement('th');
					progressCol.setAttribute("align", "center");
				progressCol.appendChild(document.createTextNode("Progress"));

				let removeCol = document.createElement('th');

			header.appendChild(wordCol);
			header.appendChild(translationCol);
			header.appendChild(showDateCol);
			header.appendChild(progressCol);
			header.appendChild(removeCol);

		thead.appendChild(header);

	table.appendChild(thead);

	return table
}

function createRow(id, word, translation, showDate, showNumber){
	let row = document.createElement('tr');
		
		let wordCol = document.createElement('td');
			wordCol.setAttribute("align", "center");
		wordCol.appendChild(document.createTextNode(word));

		let translationCol = document.createElement('td');
			translationCol.setAttribute("align", "center");
		translationCol.appendChild(document.createTextNode(translation));

		let showDateCol = document.createElement('td');
			showDateCol.setAttribute("align", "center");
		let lines = formatDate(new Date(showDate));
		for (let i = 0; i < lines.length - 1; i++){
			showDateCol.appendChild(document.createTextNode(lines[i]));
			showDateCol.appendChild(document.createElement('br'));
		}
		showDateCol.appendChild(document.createTextNode(lines[lines.length - 1]));		

		let progressCol = document.createElement('td');
			let progress = document.createElement('progress');
				progress.setAttribute('value', 21 - showNumber);
				progress.setAttribute('max', "21");
		progressCol.appendChild(progress);

		let removeCol = document.createElement('td');
			removeCol.setAttribute("align", "center");
			let button = document.createElement('button');
				button.setAttribute("class", "removeButton");
				button.setAttribute("id", id);
				button.innerHTML = '&#x2573;';
				button.addEventListener("click", removeCard);
		removeCol.appendChild(button);

	row.appendChild(wordCol);
	row.appendChild(translationCol);
	row.appendChild(showDateCol);
	row.appendChild(progressCol);
	row.appendChild(removeCol);

	return row;
}

function removeCard(event){
	let id = event.target.id;
	let row = event.target.parentElement.parentElement;
	let tbody = row.parentElement;
	if (window.confirm("Are you sure?")){
		StorageManager.deleteCardById(id, function(isDeleted){
			if (isDeleted){
				chrome.alarms.clear(id);
				chrome.notifications.clear(id);
				tbody.removeChild(row);
			} 
		});
	}
}

function addCard(){
	// Cancel the form submit
  event.preventDefault();

  let word = document.addCard.word.value;
  let translation = document.addCard.translation.value;

  if (word !== '' && translation != ''){
	  let card = new Card(word, translation);

	  memoProgresser.initCardProgress(card);
	  memoScheduler.schedule(card);

	  //should be added here, because it preserves methods in object
		//but sendMessage not!!! 
		StorageManager.addCard(card, function(isAdded){
			if (isAdded){
				//notify background for adding new alarm
				let msg = { type: "start_handle_card",
										card: card
									};
	  		chrome.runtime.sendMessage(null, msg);

	  		//update table
				document.getElementsByTagName('table')[0]
								.appendChild(createRow(card.id, card.word, card.translation,
																			 card.showDate, card.showNumber));
	  	}
		});	
	}
}