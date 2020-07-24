// init
window.onload = function() {
	setAmounts();
	buildTable();
};

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
	
	// save to db
	db.run("INSERT INTO albums(artist,album,mediatype) VALUES(?,?,?)", artist, album, mediaType, (err) => {
		if (err) {
			if (err.message.includes("UNIQUE")) {
				document.getElementById("banner-text").style.display = "flex";
				document.getElementById("banner-text").style.backgroundColor = "var(--warning)";
				document.getElementById("banner-text").innerHTML = "'" + artist + " - " + album + " (" + mediaType + ")'" + " schon in der Datenbank vorhanden.";
			}
			return console.error(err.message);
		}
		// update counts and table
		setAmounts();
		updateTable(artist, album, mediaType);
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

function setAmounts() {
	const sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database("./app/db/albums.db");
	
	var cdCount = 0;
	var digitalCount = 0;
	var vinylCount = 0;
	db.each("SELECT * FROM albums", (err, row) => {
		if (err) {
		  return console.error(err.message);
		}
		if (row.mediatype == "CD") {
			cdCount++;
		} else if (row.mediatype == "Digital") {
			digitalCount++;
		} else if (row.mediatype == "Vinyl") {
			vinylCount++;
		}
		document.getElementById("cd-amount").innerHTML = cdCount;
		document.getElementById("digital-amount").innerHTML = digitalCount;
		document.getElementById("vinyl-amount").innerHTML = vinylCount;
	});
	
	db.close();
}

function buildTable() {
	var tbl = document.getElementById("album-list").getElementsByTagName('tbody')[0];
	const sqlite3 = require("sqlite3").verbose();
	var db = new sqlite3.Database("./app/db/albums.db");
	db.each("SELECT * FROM albums ORDER BY mediatype ASC, artist ASC, album ASC", (err, row) => {
		if (err) {
		  return console.error(err.message);
		}
		var newRow = tbl.insertRow();
		
		var artistCell = newRow.insertCell(0);
		var albumCell = newRow.insertCell(1);
		var mediaTypeCell = newRow.insertCell(2);
		
		var artistText = document.createTextNode(row.artist);
		var albumText = document.createTextNode(row.album);
		var mediaTypeText = document.createTextNode(row.mediatype);
		
		artistCell.appendChild(artistText);
		albumCell.appendChild(albumText);
		mediaTypeCell.appendChild(mediaTypeText);
	});
	db.close();
}

function updateTable(artist, album, mediaType) {
	var tbl = document.getElementById("album-list").getElementsByTagName('tbody')[0];
	var newRow = tbl.insertRow();
	
	var artistCell = newRow.insertCell(0);
	var albumCell = newRow.insertCell(1);
	var mediaTypeCell = newRow.insertCell(2);
	
	var artistText = document.createTextNode(artist);
	var albumText = document.createTextNode(album);
	var mediaTypeText = document.createTextNode(mediaType);
	
	artistCell.appendChild(artistText);
	albumCell.appendChild(albumText);
	mediaTypeCell.appendChild(mediaTypeText);
}