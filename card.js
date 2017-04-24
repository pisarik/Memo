class Card{
	constructor(word, translation){
		this.id = guid();

		this.word = word;
		this.translation = translation;

		// this members will settled, when card firstly snapped to alarm
		this.showDate = null; // in ms from epoch (as Date.getTime())
		this.period = null; // last period in seconds
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