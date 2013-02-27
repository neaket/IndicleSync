var indicleSync = indicleSync || {};

indicleSync.toggleForm = function(showLogin) {
	if (showLogin) {
		$('#loginContainer').show();
		$('#createContainer').show();
		$('#logoutContainer').hide();
	} else {
		$('#loginContainer').hide();
		$('#createContainer').hide();
		$('#logoutContainer').show();
	}
}

var mainRef = new Firebase("http://indiclesync.firebaseIO.com/");	

var authClient = new FirebaseAuthClient(mainRef, function(error, user) {
	if (error) {
		indicleSync.toggleForm(true);
		alert (error);
	} else if (user) {
		indicleSync.toggleForm(false);
		console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] logged in.");
		top.postMessage({type: "INDICLE_SYNC_LOGIN_AUTH", auth: user.firebaseAuthToken}, "*");
	} else {
		indicleSync.toggleForm(true);
		console.log ("User is logged out.");
		top.postMessage({type: "INDICLE_SYNC_LOGOUT"}, "*");
	}
});



indicleSync.createUser = function(e) {
	e.preventDefault();
	var email = $('#createEmail').val();
	var password = $('#createPassword').val();
	authClient.createUser(email, password, function(error, user) {
		if (error) {
			alert (error);	
		} else {
			console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] was created.");	
		}
	});
};

indicleSync.login = function(e) {	
	e.preventDefault();
	authClient.login('password', {
		email: $('#loginEmail').val(),
		password: $('#loginPassword').val()
	});
};

indicleSync.logout = function(e) {
	e.preventDefault();
	authClient.logout();	
};	 

$(document).ready(function() {
	$('#loginForm').submit(indicleSync.login);
	$('#createForm').submit(indicleSync.createUser);
	$('#logoutForm').submit(indicleSync.logout);
});

