class StorageManager{
	constructor(){
	}

	static get STORAGE(){
		return chrome.storage.local;
	}

	// async, therefore calls callback = function(card)
	static getCardById(id, callback){
		StorageManager.STORAGE.get({'cards': []}, function(result){
			let cards = result.cards;

			for (let i = 0; i < cards.length; i++){
				if (cards[i].id === id){
					callback(cards[i]);
					break;
				}
			}
		});
	}

	// async, therefore calls callback = function(isUpdated)
	static updateCardById(id, newCard, callback){
		StorageManager.STORAGE.get({'cards': []}, function(result){
			let cards = result.cards;
			let isUpdated = false;

			for (let i = 0; i < cards.length; i++){
				if (cards[i].id === id){
					cards[i] = newCard

					StorageManager.STORAGE.set({'cards': cards});
					isUpdated = true;

					break;
				}
			}

			if (callback){
				callback(isUpdated);
			}
		});
	}

	// async, therefore calls callback = function(isAdded)
	static addCard(card, callback){
		StorageManager.STORAGE.get({'cards': []}, function(result){
			let cards = result.cards;
			let exist = isCardExist(cards, card);

			if (!exist){
				cards.push(card);

				StorageManager.STORAGE.set({'cards': cards});
			}
			else{
				console.log("This card already exists: " + card);
			}

			if (callback){
				let isAdded = !exist;
				callback(isAdded);
			}
		});
	}


}