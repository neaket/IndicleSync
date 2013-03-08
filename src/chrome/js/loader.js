define(["account"], function(account) {
	var self = {};

	self.init = function(callback) {
		var total = 1;
		var count = 0;
		account.init(initCallback);

		function initCallback() {
			count++;
			if (count === total) {
				callback();
			}
		}
	};

	return self;	
});