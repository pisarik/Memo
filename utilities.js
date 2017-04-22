
function isCardExist(cards, card){
	for (let i = 0; i < cards.length; i++){
		if (card.equals(cards[i])){
			return true;
		}
	}

	return false;
}