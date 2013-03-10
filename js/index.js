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
			$('#createAccountBtn').click(createAccount);
			$("#addLinkBtn").click(addLink);
		});


	});

	function handleUrlListRef(urlListRef) {
		urlListRef.on('child_added', function(snapshot) {
			var urlData = snapshot.val();

			$("#urlTable > tbody:first").prepend('<tr><td style="word-break:break-word;">' + urlData.description + '</td><td style="word-break:break-word;"><a href="' + urlData.url + '">' + urlData.url + '</a></td></tr>');
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

	function createAccount(e) {
		e.preventDefault();

		var email = $('#createEmail').val();
		var password = $('#createPassword').val();
		var confirmPassword = $('#createConfirmPassword').val();

		if (password.length === 0) {
			alert("Please enter a password.");
			return;
		}
		if (password !== confirmPassword) {
			alert("Your password confirmation does not match.");
			return;
		}

		account.createUser(email, password);
		$('#createModal').modal('hide');
	}

	function addLink(e) {
		e.preventDefault();

		var description = $("#linkDescription").val();
		var url = $("#linkUrl").val();

		sync.syncUrl(description, url, function() {
			$("#addLinkModal").modal('hide');
		});
	}
});