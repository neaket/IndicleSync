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

			var row = $('<tr></tr>');
			var description = $('<td style="word-break:break-word;">' + urlData.description + '</td>');
			row.append(description);

			var link = null;
			if (typeof blackberry !== "undefined") { // BlackBerry PlayBook specific
				link = $('<td style="word-break:break-word;"><a href="#">' + urlData.url + '</a></td>');
				link.click(playbookClickCallback(urlData.url));
			} else {
				link = $('<td style="word-break:break-word;"><a href="' + urlData.url + '">' + urlData.url + '</a></td>');
			}
			row.append(link);

			$("#urlTable > tbody:first").prepend(row);
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
		$('#createAccountModal').modal('hide');
	}

	function addLink(e) {
		e.preventDefault();

		var description = $("#linkDescription").val();
		var url = $("#linkUrl").val();

		sync.syncUrl(description, url, function() {
			$("#addLinkModal").modal('hide');
		});
	}

	function playbookClickCallback(url) {
		return function(e) {
			e.preventDefault();

			var args = new blackberry.invoke.BrowserArguments(url);
			blackberry.invoke.invoke(blackberry.invoke.APP_BROWSER, args);
		};
	}
});