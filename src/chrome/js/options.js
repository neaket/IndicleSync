var indicleSync = indicleSync || {};

var mainRef = new Firebase("http://indiclesync.firebaseIO.com/");	


window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.origin != "http://neaket.github.com")
      return;

    if (event.data.type && (event.data.type == "INDICLE_SYNC_LOGIN_AUTH")) {
      console.log("Extension: Auth received: " + event.data.auth);
      mainRef.auth(event.data.auth, function(error, result) {
		if (error) {
			alert (error);
		} else if (result) {
			console.log ("Extension: User [ID: '" + result.auth.id + "', Email: '"  + result.auth.email +"'] logged in.");
		} else {
			console.log ("Extension: User is logged out.");
		}
     });
    }
}, false);