class StorageManager{
	constructor(){
	}

	static get STORAGE(){
		return chrome.storage.local;
	}

	static CARDS(callback){
 		StorageManager.STORAGE.get({'cards': []}, function(result){
 			let cards = result.cards;

 			callback(cards);
 		});
 	}

	// async, therefore calls callback = function(card)
	static getCardById(id, callback){
		StorageManager.CARDS(function(cards){
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
		StorageManager.CARDS(function(cards){
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
		StorageManager.CARDS(function(cards){
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

	static deleteCardById(id, callback){
		StorageManager.CARDS(function(cards){
			let isDeleted = false;

			for (let i = 0; i < cards.length; i++){
				if (cards[i].id === id){
					cards.splice(i, 1);

					StorageManager.STORAGE.set({'cards': cards});
					isDeleted = true;

					break;
				}
			}

			if (callback){
				callback(isDeleted);
			}
		});
	}

	static deleteCardByIndex(index, callback){
		StorageManager.CARDS(function(cards){
			let isExist = index >= 0 && index < cards.length;
			let id = null;

			if (isExist){
				id = cards[i].id
				cards.splice(i, 1);
			}

			if (callback){
				let isDeleted = isExist;
				callback(isDeleted, id);
			}
		});
	}


}