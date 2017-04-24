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