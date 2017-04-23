document.body.addEventListener('dblclick', function(){
	word = window.getSelection().toString();

	if (word.length > 1){
		console.log(word);
		console.log(word.length);
		
		let callback = function(translation){
			showPopoverTranslation(translation);

			// it should be executed on button 'add'
			let card = new Card(word, translation);

			console.log(card + '');

			if (StorageManager.addCard(card)){
				//notify background for adding new alarm
	  		chrome.runtime.sendMessage(null, card);
	  	}
		}

	  let translater = new GoogleTranslater();
	  translater.translate(word, "en", "ru", callback);
	}

});

function showPopoverTranslation(translation){
	var a = document.createElement("span");
  a.setAttribute('tabindex', "0");
  a.setAttribute('data-container', "body");
  a.setAttribute('data-template', "<div class='MemoPopover' role='tooltip'><div class='arrow'></div><div class='popover-content'></div></div>");
  a.setAttribute('data-toggle', "popover");
  a.setAttribute('data-placement', "auto top");
  a.setAttribute('data-trigger', "focus");
  a.setAttribute('data-content', translation);

	var wordElem = window.getSelection();
  var range = wordElem.getRangeAt(0).cloneRange();
  range.surroundContents(a);
  wordElem.removeAllRanges();
  wordElem.addRange(range);

  setTimeout(function(){
    $('[data-toggle="popover"]').popover("show");
   }, 50);
}


// popover disabling (because focus doesn't work after "show")
$(document).on('click', function(e) {
  $('[data-toggle="popover"],[data-original-title]').each(function() {
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide').data('bs.popover').inState.click = false // fix for BS 3.3.6
      $(this).contents().unwrap();
    }

  });
});