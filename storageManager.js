//let storage = chrome.storage.local;

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
				}
			}
		});

	}

	// async, therefore calls callback = function(isAdded)
	static addCard(card, callback){
		StorageManager.STORAGE.get({'cards': []}, function(result){
			let cards = result.cards;

			if (!isCardExist(cards, card)){
				cards.push(card);

				StorageManager.STORAGE.set({'cards': cards}, function(){
					StorageManager.STORAGE.get({'cards': []}, function(result){
						console.log("New cards: " + result.cards);
					});
				});
				callback(true);
			}
			else{
				console.log("This card already exists: " + card);
				callback(false);
			}
		});
	}


}