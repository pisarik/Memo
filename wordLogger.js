document.body.addEventListener('dblclick', function(){
	word = window.getSelection().toString();

	if (word.length > 1){
		console.log(word);
		console.log(word.length);

		let callback = function(translation){
			showPopoverTranslation(translation);

			// it should be executed on button 'add'
			let card = new Card(word, translation);

			let scheduler = new DebugCardScheduler();
			scheduler.schedule(card);

			console.log(card);

			StorageManager.addCard(card, function(isAdded){
				if (isAdded){
					//notify background for adding new alarm
		  		chrome.runtime.sendMessage(null, card);
		  	}
	  	});
		}

	  let translater = new GoogleTranslater();
	  translater.translate(word, "en", "ru", callback);
	}

});

function showPopoverTranslation(translation){
	var a = document.createElement("span");
	a.className = "MemoPopoverSpan";
  a.setAttribute('tabindex', "0");
  a.setAttribute('data-container', "body");
  a.setAttribute('data-template', memoPopoverTemplate);
  a.setAttribute('data-toggle', "popover");
  a.setAttribute('data-placement', "auto top");
  a.setAttribute('data-trigger', "focus");
  a.setAttribute('data-html', "true");
  a.setAttribute('data-content', "<b>" + translation + "</b>");

	var wordElem = window.getSelection();
  var range = wordElem.getRangeAt(0).cloneRange();
  range.surroundContents(a);
  wordElem.removeAllRanges();
  wordElem.addRange(range);

  $('.MemoPopoverSpan').popover().on('shown.bs.popover', function (eventShown) {
	    var $popup = $('#' + $(eventShown.target).attr('aria-describedby'));
	    $popup.find('button.memo-popover-add').click(function (e) {
	        memoPopoverAddClick();
	    });
		});

  setTimeout(function(){
    $('.MemoPopoverSpan').popover("show");
   }, 50);
}


// popover disabling (because focus doesn't work after "show")
$(document).on('click', function(e) {
  $('.MemoPopoverSpan').each(function() {
    //the 'is' for buttons that trigger popups
    //the 'has' for icons within a button that triggers a popup
    if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
      $(this).popover('hide').data('bs.popover').inState.click = false // fix for BS 3.3.6
	  	$(this).contents().unwrap();
    }

  });
});