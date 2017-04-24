class Card{
	constructor(word, translation){
		this.id = guid();

		this.word = word;
		this.translation = translation;
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