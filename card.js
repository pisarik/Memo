class Card{
	constructor(word, translation){
		this.id = guid();

		this.word = word;
		this.translation = translation;

		// this members will settled, when card firstly snapped to alarm
		this.showDate = null; // in ms from epoch (as Date.getTime())
		this.showCount = 0; // count of card shows (also used as level of knowledge of the card)
		this.period = 30; // minimal time period for show card
	}

	equalsById(card){
		return this.id === card.id;
	}

	equals(card){
		return this.word === card.word && 
					 this.translation === card.translation;
	}

	toString(){
		return "id: " + this.id + "\nword: " + this.word + "\ntranslation: " + this.translation;
	}	
}