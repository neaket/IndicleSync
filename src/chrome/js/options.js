require(["loader", "account"], function(loader, account) {
	var self = {};

	loader.ready(function() {
		window.addEventListener("message", function(event) {
			// Only accept messages from the web sign on frame
			if (event.origin != "http://sync.indicle.com")
				return;

			if (event.data.type) {
				if (event.data.type == "INDICLE_SYNC_LOGIN_AUTH") {
					account.saveAuth(event.data.auth);
					// mainRef.auth(event.data.auth, function(error, result) {
					//	if (error) {
					//		alert (error);
					//	} else if (result) {
					//		console.log ("Extension: User [ID: '" + result.auth.id + "', Email: '"  + result.auth.email +"'] logged in.");
					//	account.saveAuth(event.data.auth, result.auth);
					//	} else {
					//		console.log ("Extension: User is logged out.");
					//	}
					// });
				} else if (event.data.type == "INDICLE_SYNC_LOGOUT") {
					account.unauth();
				}
			}
		}, false);
	});

	return self;
});