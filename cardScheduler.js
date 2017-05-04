class CardScheduler{
	constructor(){
		if (this.schedule === undefined) {
      throw new TypeError("Must override schedule");
    }
	}

	scheduleFor(card, date){
		card.showDate = date.getTime();
	}

	rescheduleMissed(cards){
		let now = new Date();
		let newDate = new Date();
		const MINUTES_INTERVAL = 5;

		for (let i = 0; i < cards.length; i++){
			if (new Date(cards[i].showDate) < now){
				newDate.setMinutes(newDate.getMinutes() + MINUTES_INTERVAL);

				memoScheduler.scheduleFor(cards[i], newDate);
				console.log("Reschedule: " + cards[i] + " to " + newDate);

				StorageManager.updateCardById(cards[i].id, cards[i]);
			}
		}
	}
}

class DumbCardScheduler extends CardScheduler{
	
	constructor(){
		super();
	}


	schedule(card){
			card.period = 30;

			let newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() + card.period*(2**card.showCount));
			
			super.scheduleFor(card, newDate);
	}
}

class DebugCardScheduler extends CardScheduler{

	constructor(){
		super();
	}


	schedule(card){
		card.period = 10;

		let newDate = new Date();
		newDate.setSeconds(newDate.getSeconds() + card.period);
		
		super.scheduleFor(card, newDate);
	}
}