document.getElementById("save-button").addEventListener("click", () => {
	var artist = document.getElementById("artist-input").value;
	var album = document.getElementById("album-input").value;
	
	// disallow empty Artist/Album inputs
	if (artist.length == 0 || album.length == 0) {
		console.log("Felder dürfen nicht leer sein.");
		document.getElementById("banner-text").style.display = "flex";
		document.getElementById("banner-text").style.backgroundColor = "var(--warning)";
		document.getElementById("banner-text").innerHTML = "Eingabefelder dürfen nicht leer sein.";
		return;
	}
	
	// get media type
	var mediaType = "CD";
	if (document.getElementById("media-type-digital").checked) {
		mediaType = "Digital";
	} else if (document.getElementById("media-type-vinyl").checked) {
		mediaType = "Vinyl";
	}
	
	//check if already in db
	const sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database("./app/db/albums.db");
	var inDB = false;
	
	// tbd.
	
	if (inDB) {
		console.log("'" + artist + " - " + album + " (" + mediaType + ")'" + " schon in der Datenbank vorhanden.");
		document.getElementById("banner-text").style.display = "flex";
		document.getElementById("banner-text").style.backgroundColor = "var(--warning)";
		document.getElementById("banner-text").innerHTML = "'" + artist + " - " + album + " (" + mediaType + ")'" + " schon in der Datenbank vorhanden.";
		db.close();
		return;
	}
	
	// save to db
	db.run("INSERT INTO albums(artist,album,mediatype) VALUES(?,?,?)",artist, album, mediaType, (err) => {
		if (err) {
		  return console.error(err.message);
		}
	});
	db.close();
	
	// show success message
	console.log("'" + artist + " - " + album + " (" + mediaType + ")' eingetragen.");
	document.getElementById("banner-text").style.display = "flex";
	document.getElementById("banner-text").style.backgroundColor = "var(--info)";
	document.getElementById("banner-text").innerHTML = "'" + artist + " - " + album + " (" + mediaType + ")' eingetragen.";
	
	// clear input
	document.getElementById("artist-input").value = "";
	document.getElementById("album-input").value = "";
	document.getElementById("media-type-cd").checked = true;
});