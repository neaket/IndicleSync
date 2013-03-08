define(["loader", "sync"], function(loader, sync) {
	
	loader.init(function() {
		$(document).ready(function () {
			chrome.tabs.getSelected(function(tab) {
				sync.syncUrl(tab.title, tab.url, syncedCallback);
			});
		});

		var syncedCallback = function() {
			$(".span4").append($('<h5>Url was synced.</h5>'));
		};
	});
});