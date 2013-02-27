(function() {
document.addEventListener('DOMContentLoaded', function () {
	console.log("loaded");
	chrome.tabs.getSelected(function(tab) {
		var testRef = new Firebase("https://indiclesync.firebaseIO.com/test");
		testRef.set(tab.url);
	});
}, false);

	
}());