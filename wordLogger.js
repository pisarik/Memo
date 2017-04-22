//var storage = storage.chrome.local;

document.body.addEventListener('dblclick', function(){
	word = window.getSelection().toString();

	if (word.length > 1){
		console.log(word);
		console.log(word.length);
		let callback = function(translation){
			let card = new Card(word, translation);

			StorageManager.addCard(card);

			showPopoverTranslation(translation);

	  	chrome.runtime.sendMessage(null, card);
		}

	  let translater = new GoogleTranslater();
	  translater.translate(word, "en", "ru", callback);
	}

});

function showPopoverTranslation(translation){
	var a = document.createElement("span");
  a.setAttribute('tabindex', "0");
  a.setAttribute('data-toggle', "popover");
  a.setAttribute('data-placement', "auto top");
  a.setAttribute('data-trigger', "focus");
  // a.setAttribute('data-content','Some content inside the popover');
  a.setAttribute('title', translation);


  wordElem = window.getSelection();

	var wordElem = window.getSelection();
  var range = wordElem.getRangeAt(0).cloneRange();
  range.insertNode(a);
  wordElem.removeAllRanges();
  wordElem.addRange(range);

  setTimeout(function(){
    $('[data-toggle="popover"]').popover("show");
   }, 50);

  setTimeout(function(){
  	$('[data-toggle="popover"]').popover("hide");
    $('[data-toggle="popover"]').remove();
   }, 2000);
}

//works
// $('[data-toggle="popover"],[data-original-title]').popover("show");

// $(document).on('click', function(e) {
//   $('[data-toggle="popover"],[data-original-title]').each(function() {
//     //the 'is' for buttons that trigger popups
//     //the 'has' for icons within a button that triggers a popup
//     if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
//       $(this).popover('hide').data('bs.popover').inState.click = false // fix for BS 3.3.6
//     }

//   });
// });