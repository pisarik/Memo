// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
	let table = createTable();
  
  chrome.storage.local.get({'cards': []}, function(result){
		let cards = result.cards;

		let tbody = document.createElement('tbody');
		for (let i = 0; i < cards.length; i++){	
			tbody.appendChild(createRow(cards[i].word, cards[i].translation,
																	cards[i].showDate, cards[i].showCount));
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

			header.appendChild(wordCol);
			header.appendChild(translationCol);
			header.appendChild(showDateCol);
			header.appendChild(progressCol);

		thead.appendChild(header);

	table.appendChild(thead);

	return table
}

function createRow(word, translation, showDate, showCount){
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
			progress.setAttribute('value', 20 - showCount);
			progress.setAttribute('max', "20");
		progressCol.appendChild(progress);

	row.appendChild(wordCol);
	row.appendChild(translationCol);
	row.appendChild(showDateCol);
	row.appendChild(progressCol);

	return row;
}

function addCard(){
	// Cancel the form submit
  event.preventDefault();

  let word = document.addCard.word.value;
  let translation = document.addCard.translation.value;

  if (word !== '' && translation != ''){
	  let card = new Card(word, translation);

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
								.appendChild(createRow(card.word, card.translation,
																			 card.showDate, card.showCount));
	  	}
		});	
	}
}