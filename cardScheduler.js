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
		let missed_idxes = []
		let now = new Date();
		let newDate = new Date();
		const MINUTES_INTERVAL = 5;

		for (let i = 0; i < cards.length; i++){
			if (new Date(cards[i].showDate) < now){
				newDate.setMinutes(newDate.getMinutes() + MINUTES_INTERVAL);

				this.scheduleFor(cards[i], newDate);

				missed_idxes.push(i);
			}
		}

		return missed_idxes;
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