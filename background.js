chrome.runtime.onMessage.addListener(function(card, sender, sendResponse) {

	/* card is only json wrap of members without methods,
	 * so next call not working:
	 * card.show();
	 * maybe construct sort of - new Card(card) and then use .show.
	*/

	let options = {
		  type: "basic",
		  title: "Did you know, that...",
		  message: card.word + " - " + card.translation,
		  iconUrl: "icon_48.png"
		};

	chrome.notifications.create(null, options);
});