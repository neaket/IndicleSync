var indicleSync = indicleSync || {};

var mainRef = new Firebase("http://indiclesync.firebaseIO.com/");	

var authClient = new FirebaseAuthClient(mainRef, function(error, user) {
	if (error) {
		alert ("An Error Occured: " + error);
	} else if (user) {
		console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] logged in.");
	} else {
		console.log ("User is logged out.");
	}
});

indicleSync.createUser = function() {
	var email = $('#createEmail').val();
	var password = $('#createPassword').val();
	authClient.createUser(email, password, function(error, user) {
		if (error) {
			alert ("An Error Occured: " + error);	
		} else {
			console.log ("User [ID: '" + user.id + "', Email: '"  + user.email +"'] was created.");	
		}
	});
};

indicleSync.login = function() {	
	authClient.login('password', {
		email: $('#loginEmail').val(),
		password: $('#loginPassword').val()
	});
};

indicleSync.logout = function() {
	authClient.logout();
};	 

$(document).ready(function() {
	$('#loginForm').submit(indicleSync.login);
	$('#createForm').submit(indicleSync.createUser);
});


