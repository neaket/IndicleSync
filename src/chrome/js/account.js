define(function() {
	var self = {};

	var mainRef = new Firebase("http://indiclesync.firebaseIO.com/users");

	self.authKey = null;

	self.init = function(callback) {
		self.loadAuth(callback);
	};

	self.saveAuth = function(authKey) {
		chrome.storage.sync.set({'authKey': authKey}, function() {
			console.log("authKey: " + authKey);
		});
	};

	self.loadAuth = function(callback) {
		chrome.storage.sync.get('authKey', function(objects) {
			self.authKey = objects.authKey;
			callback();
		});
	};

	self.unauth = function() {
		self.authKey = null;
	};

	return self;
});