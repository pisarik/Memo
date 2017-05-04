function isCardExist(cards, card){
	for (let i = 0; i < cards.length; i++){
		if (card.equals(cards[i])){
			return true;
		}
	}

	return false;
}

function isStaticPageText(node){
	return node.nodeName !== "INPUT" && node.nodeName !== "TEXTAREA";
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function positiveZeroPad(num, size) {
    let s = num+"";
    while (s.length < size) 
    	s = "0" + s;

    return s;
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

  return [positiveZeroPad(hours, 2) + ':' + positiveZeroPad(mins, 2), 
  				day + ' ' + monthNames[monthIndex]
  ];
}