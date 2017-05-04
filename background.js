function createCardAlarm(card){
	chrome.alarms.create(card.id, { "when": card.showDate });
}

chrome.runtime.onMessage.addListener(function(card, sender, sendResponse) {

	/* card is only json wrap of members without methods,
	 * so next call not working:
	 * card.show();
	 * maybe construct sort of - new Card(card) and then use .show.
	*/

	createCardAlarm(card);
});

chrome.alarms.onAlarm.addListener(function(alarm){
	let id = alarm.name;
	
	StorageManager.getCardById(id, function(card){
		memoNotificator.notify(card);
		card.showCount++;

		memoScheduler.schedule(card);

		createCardAlarm(card);
		StorageManager.updateCardById(id, card);
	});

});

function updateCardAlarms(){
	StorageManager.CARDS(function(cards){
		let missed_idxes = memoScheduler.rescheduleMissed(cards);

		for (let i = 0; i < missed_idxes.length; i++){
			createCardAlarm(cards[missed_idxes[i]]);
		}

		StorageManager.STORAGE.set({'cards': cards});
	});
}

updateCardAlarms();