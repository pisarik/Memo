function createCardAlarm(card){
	chrome.alarms.create(card.id, { "when": card.showDate });
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

	/* msg require field type: string! 
	 * (not very cool to use string as type.. but still enough)
	 *
	 * msg.card is only json wrap of members without methods,
	 * so next call not working:
	 * msg.card.show();
	 * maybe construct sort of - new Card(msg.card) and then use .show.
	*/

	if (msg.type === "start_handle_card"){
		createCardAlarm(msg.card);
	}
	else if (msg.type === "load_popover"){
		chrome.storage.sync.get({showPopover: true}, function(result){
			if (result.showPopover){
				loadPopover();
			}

			sendResponse({isLoaded: result.showPopover})
		});

		//for asynchronous sendResponse
		return true;
	}
});

chrome.alarms.onAlarm.addListener(function(alarm){
	let id = alarm.name;
	
	StorageManager.getCardById(id, function(card){
		memoNotificator.notify(card);

		/* in case of test, we assume, that test is failed.
		 * if it's not, then in test result listener (notificationManager)
		 * we update card and alarm with proper progress.
		 */
		memoProgresser.cardShowed(card);

		memoScheduler.schedule(card);

		createCardAlarm(card);
		StorageManager.updateCardById(id, card);
	});

});

function loadPopover(){
	chrome.tabs.executeScript(null, { file: "3rdparty/jquery-3.2.1.min.js"});
	chrome.tabs.executeScript(null, { file: "3rdparty/bootstrap-3.3.7.min.js"});
	chrome.tabs.executeScript(null, { file: "storageManager.js"});
	chrome.tabs.executeScript(null, { file: "card.js"});
	chrome.tabs.executeScript(null, { file: "popover/popover.js"});
	chrome.tabs.executeScript(null, { file: "wordLogger.js"});
	chrome.tabs.executeScript(null, { file: "translater.js"});
	chrome.tabs.executeScript(null, { file: "progressManager.js"});
	chrome.tabs.executeScript(null, { file: "cardScheduler.js"});
	chrome.tabs.executeScript(null, { file: "commonDefs.js"});
	chrome.tabs.executeScript(null, { file: "utilities.js"});
	chrome.tabs.insertCSS(null, {file: "popover/memoPopover.css"});
}

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