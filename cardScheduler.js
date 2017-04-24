class CardScheduler{
	constructor(){
		if (this.schedule === undefined) {
      throw new TypeError("Must override schedule");
    }
	}
}

class DumbCardScheduler extends CardScheduler{
	
	constructor(){
		super();
	}


	schedule(card){
		if (card.showDate === null || card.period === null){
			card.period = 30;

			let newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() + card.period);
			
			card.showDate = newDate.getTime();
		}
		else{
			card.period *= 2;

			let newDate = new Date();
			newDate.setSeconds(newDate.getSeconds() + card.period);

			card.showDate = newDate.getTime();
		}
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
		
		card.showDate = newDate.getTime();
	}
}