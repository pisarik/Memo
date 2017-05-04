function showPopoverChanged(){
	let showPopover = document.getElementById('showPopover').checked;
	chrome.storage.sync.set({
    showPopover: showPopover,
  });
}

function restoreOptions() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    showPopover: true
  }, function(items) {
    document.getElementById('showPopover').checked = items.showPopover;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('showPopover').addEventListener('change', showPopoverChanged);

