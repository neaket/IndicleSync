require(["loader", "messenger", "account"], function(loader, messenger, account) {

	var createUser = function(e) {
		e.preventDefault();

		var email = $('#createEmail').val();
		var password = $('#createPassword').val();
		account.createUser(email, password);
		$('#createAccountModal').modal('hide');
	};

	var login = function(e) {
		e.preventDefault();

		var email = $('#loginEmail').val();
		var password = $('#loginPassword').val();
		account.login(email, password);
		$('#loginModal').modal('hide');
	};

	var logout = function(e) {
		e.preventDefault();
		account.logout();
	};

	loader.ready(function() {
		messenger.subscribe(account.USER_CHANGED, function() {
			if (account.isLoggedIn) {
				$("#notLoggedInContainer").hide();
				$("#loggedInContainer").show();

				$("#welcomeUsername").text(account.email);

				top.postMessage({type: "INDICLE_SYNC_LOGIN_AUTH", auth: account.authKey}, "*");
			} else {
				$("#urlTable > tbody:first").empty();
				$("#notLoggedInContainer").show();
				$("#loggedInContainer").hide();

				top.postMessage({type: "INDICLE_SYNC_LOGIN_AUTH", auth: account.authKey}, "*");
			}
		});

		$(document).ready(function() {
			$('#loginBtn').click(login);
			$('#createAccountBtn').click(createUser);
			$('#logoutLink').click(logout);
		});
	});

});
