class Card{
	constructor(word, translation){
		this.word = word;
		this.translation = translation;
	}

	equals(card){
		return this.word === card.word && 
					 this.translation === card.translation;
	}

	toString(){
		return "word: " + this.word + "\ntranslation: " + this.translation;
	}

	show(){
		let options = {
		  type: "basic",
		  title: "Do you know that " + this.word + " translated as: ",
		  message: this.translation,
		  iconUrl: "icon_48.png"
		};

		chrome.notifications.create(null, options);
	}
	
}