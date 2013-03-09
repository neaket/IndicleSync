define(function() {
	var self = {};
	var authClient = null;
	self.isLoggedIn = false;
	self.authKey = null;


	self.init = function(callback) {
		var mainRef = new Firebase("http://indiclesync.firebaseIO.com/");

		authClient = new FirebaseAuthClient(mainRef, function(error, user) {
			if (error) {
				self.isLoggedIn = false;
				alert (error);
			} else if (user) {
				self.isLoggedIn = true;
				console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] logged in.");
				self.authKey = user.firebaseAuthToken;
			} else {
				self.isLoggedIn = false;
				console.log ("User is logged out.");
			}
		});

		callback();
	};

	self.createUser = function(email, password) {
		authClient.createUser(email, password, function(error, user) {
			if (error) {
				alert (error);
			} else {
				console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] was created.");
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