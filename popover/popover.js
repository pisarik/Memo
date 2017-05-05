memoPopoverTemplate = ["<div class='MemoPopover' role='tooltip'>",
											 "<div class='arrow'></div>",
											 "<span class='popover-content'></span>",
											 "<button type='button' class='memo-popover-add'>+</button>",
											 "</div>"].join('');

function memoPopoverAddClick(word, translation){
	// it should be executed on button 'add'
	let card = new Card(word, translation);

	memoProgresser.initCardProgress(card);
	memoScheduler.schedule(card);

	//should be added here, because it preserves methods in object
	//but sendMessage not!!! 
	StorageManager.addCard(card, function(isAdded){
		if (isAdded){
			//notify background for adding new alarm
			let msg = { type: "start_handle_card",
									card: card
								};
  		chrome.runtime.sendMessage(null, msg);
  	}
	});
}