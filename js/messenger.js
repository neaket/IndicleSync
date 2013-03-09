define(function() {
	var self = {};

	var subscriptions = {};


	self.subscribe = function(messageType, callback) {
		if (typeof subscriptions[messageType] === "undefined") {
			subscriptions[messageType] = [];
		}

		subscriptions[messageType].push(callback);
	};

	self.unsubscribe = function(messageType, callback) {

		if (typeof subscriptions[messageType] === "undefined") {
			log.warning("Cannot remove from non existant message type [" + messageType + "]");
			return;
		}

		var index = subscriptions[messageType].indexOf(callback);
		if (index === -1) {
			log.warning("Attempt to unsubscribe an non-subscribed callback");
			return;
		}

		subscriptions[messageType].splice(index, 1);
	};

	self.send = function(messageType, messageData) {
		if (typeof subscriptions[messageType] === "undefined") {			
			return;
		}

		for (var i = 0; i < subscriptions[messageType].length; i++) {
			subscriptions[messageType][i](messageData); 
		}
	};

	return self;
});