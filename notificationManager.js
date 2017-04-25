class NotificationManager{
	constructor(){
		if (this.notify === undefined) {
      throw new TypeError("Must override notify");
    }
	}
}

class SimpleNotificator extends NotificationManager{
	constructor(){
		super();
	}

	notify(card){
		let options = {
			type: "basic",
		  iconUrl: "images/icon_48.png"
		};

		let isTimeToTest = (card.showCount + 1) % 3 == 0; // on third show
		let isTimeToReverse = (card.showCount + 1) % 2 == 0; // on second show
		if (isTimeToTest){
			options.title = 'Do you know the translation?';
			options.message = isTimeToReverse? card.translation : card.word;
			options.buttons = [{title: "I know"}, {title: "Not sure"}];
			options.requireInteraction = true;
		}
		else{
			options.title = 'Did you know, that...';
			options.message = isTimeToReverse? card.translation + " - " + card.word 
																				:card.word + " - " + card.translation;
		}

		chrome.notifications.create(card.id, options);
	}
}

chrome.notifications.onButtonClicked.addListener(function (id, buttonIndex){
	StorageManager.getCardById(id, function(card){
		let shouldRepeatCard = buttonIndex == 1;
		if (shouldRepeatCard){
			card.showCount = Math.max(card.showCount - 3, 0);

			let scheduler = new DumbCardScheduler();
			scheduler.schedule(card);

			//also we should update alarm
			chrome.alarms.clear(id);
			chrome.alarms.create(id, { "when": card.showDate})

			//and card
			StorageManager.updateCardById(id, card);
		}
	
		// should be cleared, otherwise requireInteraction cannot be cleared, 
		// unless user closes notification
		chrome.notifications.clear(id);

		//show right answer
		let options = {
				type: "basic",
			  iconUrl: "images/icon_48.png",
			  title: "Right answer",
			  message: card.word + " - " + card.translation,
			  requireInteraction: false
			};
		chrome.notifications.create(id, options);
	});
});