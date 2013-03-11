define(["messenger"], function(messenger) {
	var self = {};

	self.USER_CHANGED = "ACCOUNT_USER_CHANGED";

	var authClient = null;
	self.isLoggedIn = false;
	self.authKey = null;
	self.email = null;


	self.init = function(callback) {
		var mainRef = new Firebase("http://indiclesync.firebaseIO.com/");

		authClient = new FirebaseAuthClient(mainRef, function(error, user) {
			if (error) {
				self.isLoggedIn = false;
				alert (error);
			} else if (user) {
				self.isLoggedIn = true;
				console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] logged in.");
				self.email = user.email;
				self.authKey = user.firebaseAuthToken;
			} else {
				self.isLoggedIn = false;
				self.authKey = null;
				self.email = null;
				console.log ("User is logged out.");
			}
			messenger.send(self.USER_CHANGED);
		});

		callback();
	};

	self.createUser = function(email, password) {
		authClient.createUser(email, password, function(error, user) {
			if (error) {
				alert (error);
			} else {
				console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] was created.");
				self.login(email, password);
			}
		});
	};

	self.login = function(email, password) {
		authClient.login('password', {
			"email": email,
			"password": password
		});
	};

	self.logout = function() {
		authClient.logout();
	};

	return self;
});