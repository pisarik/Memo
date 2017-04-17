document.body.addEventListener('dblclick', function(){
	word = window.getSelection().toString();

	if (word.length > 1){
		console.log(word);
		console.log(word.length);
		let callback = function(translation){
			let card = new Card(word, translation);

	  	chrome.runtime.sendMessage(null, card);
		}

	  let translater = new GoogleTranslater();
	  translater.translate(word, "en", "ru", callback);
	}

});