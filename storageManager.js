//let storage = chrome.storage.local;

class StorageManager{
	constructor(){
	}

	static get STORAGE(){
		return chrome.storage.local;
	}

	static CARDS(callback){
		StorageManager.STORAGE.get({'cards': []}, callback);
	}

	static addCard(card){
		StorageManager.STORAGE.get({'cards': []}, function(result){
			let cards = result.cards;

			if (!isCardExist(cards, card)){
				cards.push(card);

				StorageManager.STORAGE.set({'cards': cards}, function(){
					StorageManager.STORAGE.get({'cards': []}, function(result){
						console.log("New cards: " + result.cards);
					});
				});
			}
			else{
				console.log("This card already exists: " + card);
			}
		});
	}


}