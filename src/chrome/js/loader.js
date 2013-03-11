define(["account"], function(account) {
	var self = {};

	var loaded = false;

	self.ready = function(callback) {
		if (loaded) {
			callback();
		}

		var total = 1;
		var count = 0;
		account.init(initCallback);

		function initCallback() {
			count++;
			if (count === total) {
				loaded = true;
				callback();
			}
		}
	};

	return self;
});