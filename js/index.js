require(["loader", "messenger", "account", "sync"], function(loader, messenger, account, sync) {

	loader.ready(function() {
		messenger.subscribe(account.USER_CHANGED, function() {
			if (account.isLoggedIn) {
				$("#notLoggedInContainer").hide();
				$("#loggedInContainer").show();

				$("#welcomeUsername").text(account.email);
				sync.loadUrls(handleUrlListRef);
			} else {
				$("#urlTable > tbody:first").empty();
				$("#notLoggedInContainer").show();
				$("#loggedInContainer").hide();
			}
		});

		$(document).ready(function() {
			$("#loginBtn").click(login);
			$("#logoutLink").click(logout);
		});


	});

	function handleUrlListRef(urlListRef) {
		urlListRef.on('child_added', function(snapshot) {
			var urlData = snapshot.val();

			$("#urlTable > tbody:first").prepend('<tr><td>' + urlData.description + '</td><td><a href="' + urlData.url + '">' + urlData.url + '</a></td></tr>');
		});
	}

	function login(e) {
		e.preventDefault();

		var email = $('#loginEmail').val();
		var password = $('#loginPassword').val();
		account.login(email, password);

		$('#loginModal').modal('hide');
	}

	function logout(e) {
		e.preventDefault();

		account.logout();
	}
});