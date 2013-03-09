define(["account"], function(account) {

	var self = {};

	self.syncUrl = function(description, url, callback) {
		if (account.isLoggedIn === false) {
			alert("You must log in.");
			return;
		}

		var usersRef = new Firebase("https://indiclesync.firebaseIO.com/users/");
		var myRef = null;
		usersRef.auth(account.authKey, function(error, result) {
			if (error) {
				alert (error);
			} else if (result) {
				console.log ("Extension: User [ID: '" + result.auth.id + "', Email: '"  + result.auth.email +"'] logged in.");
				myRef = usersRef.child(result.auth.id);
				authCallback();
			} else {
				console.log ("Extension: User is logged out.");
			}
		});

		function authCallback() {
			var urlRef = myRef.child("urls");

			var created = new Date().getTime();
			var data = {
				"description": description,
				"url": url,
				"created": created
			};

			// push the data to the server, prioritized by the created time
			urlRef.push().setWithPriority(data, created);

			callback();
		}
	};

	self.loadUrls = function(callback) {
		if (account.authKey === null) {
			alert("You must log in.");
			return;
		}

		var usersRef = new Firebase("https://indiclesync.firebaseIO.com/users/");
		var myRef = null;
		usersRef.auth(account.authKey, function(error, result) {
			if (error) {
				alert (error);
			} else if (result) {
				console.log ("Extension: User [ID: '" + result.auth.id + "', Email: '"  + result.auth.email +"'] logged in.");
				myRef = usersRef.child(result.auth.id);
				authCallback();
			} else {
				console.log ("Extension: User is logged out.");
			}
		});

		function authCallback() {
			var urlListRef = myRef.child("urls");


			callback(urlListRef);
		}
	};

	return self;
});