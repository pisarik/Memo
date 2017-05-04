chrome.runtime.onMessage.addListener(function(card, sender, sendResponse) {

	/* card is only json wrap of members without methods,
	 * so next call not working:
	 * card.show();
	 * maybe construct sort of - new Card(card) and then use .show.
	*/

	chrome.alarms.create(card.id, { "when": card.showDate });
});

chrome.alarms.onAlarm.addListener(function(alarm){
	let id = alarm.name;
	
	StorageManager.getCardById(id, function(card){
		memoNotificator.notify(card);
		card.showCount++;

		memoScheduler.schedule(card);

		StorageManager.updateCardById(id, card);

		chrome.alarms.create(card.id, { "when": card.showDate });
	});

});

function updateCardAlarms(){
	StorageManager.CARDS(memoScheduler.rescheduleMissed);
}

chrome.management.onEnabled.addListener( updateCardAlarms );