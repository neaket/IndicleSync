require(["loader", "account", "sync"], function(loader, account, sync) {

	loader.ready(function() {
		if (account.isLoggedIn) {
			$("#loginLink").hide();
			$("#welcomeUsernameContainer").show();
			$("#logoutLink").show();			
		} else {
			$("#loginLink").show();
			$("#welcomeUsernameContainer").hide();
			$("#logoutLink").hide();
		}

		setTimeout(function() {
			sync.loadUrls(handleUrlListRef);
		}, 2000);

		$(document).ready(function() {
			$("#loginBtn").click(login);
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
	};

});