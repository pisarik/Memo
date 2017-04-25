let background = chrome.extension.getBackgroundPage()

let table = createTable();

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

function formatDate(date) {
  let monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  let day = date.getDate();
  let monthIndex = date.getMonth();
  let year = date.getFullYear();

  let hours = date.getHours();
  let mins = date.getMinutes();

  return hours + ':' + mins + '\n' + day + ' ' + monthNames[monthIndex];
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
		showDateCol.appendChild(document.createTextNode(formatDate(new Date(showDate))));		

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

chrome.storage.local.get({'cards': []}, function(result){
	let cards = result.cards;

	let tbody = document.createElement('tbody');
	for (let i = 0; i < cards.length; i++){	
		tbody.appendChild(createRow(cards[i].word, cards[i].translation,
																cards[i].showDate, cards[i].showCount);
	}

	table.appendChild(tbody);
	document.body.appendChild(table);
});
