// note that the fs package does not exist on a normal browser
const fs = require("fs");

//a dialog box module from electron
const { dialog } = require("electron").remote;

document.getElementById("save-button").addEventListener("click", () => {
	var artist = document.getElementById("artist-input").value;
	var album = document.getElementById("album-input").value;
	
	// disallow empty Artist/Album inputs
	
	if (artist.length == 0 || album.length == 0) {
		console.log("Felder dürfen nicht leer sein.");
		document.getElementById("banner-text").innerHTML = "Felder dürfen nicht leer sein.";
		return;
	}
	
	// get media type
	var mediaType = "CD";
	if (document.getElementById("media-type-digital").checked) {
		mediaType = "Digital";
	} else if (document.getElementById("media-type-vinyl").checked) {
		mediaType = "Vinyl";
	}
	
	// save to file
	// var stringToSave = artist + "|" + album + "|" + mediaType + "\n";
	// fs.appendFile('./Albenliste.txt', stringToSave, (err) => {
		// if (err) throw err;
		// console.log('The "data to append" was appended to file!');
	// });
	
	// show success message
	console.log("'" + artist + " - " + album + " (" + mediaType + ")' eingetragen.");
	document.getElementById("banner-text").innerHTML = "'" + artist + " - " + album + " (" + mediaType + ")' eingetragen.";
	
	// clear input
	document.getElementById("artist-input").value = "";
	document.getElementById("album-input").value = "";
	document.getElementById("media-type-cd").checked = true;
});