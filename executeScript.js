//lazy loading, one time event.
document.addEventListener('dblclick', function(event){
	document.removeEventListener(event.type, arguments.callee);

	let msg = { type: "load_popover" };
	chrome.runtime.sendMessage(msg, function(response){
		if (response.isLoaded){
			//repeat dblclick for triggering on new scripts if loaded
			setTimeout(function(){document.body.dispatchEvent(event)}, 20);
		}
	});
});