const { app, BrowserWindow } = require("electron");

function createWindow() {	
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 638,
		title: "Albenliste",
		icon: "./app/img/vinyl.ico",
		// Icon from: https://www.iconarchive.com/show/small-n-flat-icons-by-paomedia/disc-vinyl-icon.html
		resizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true
		}
	});
	
	// and load the index.html of the app.
	win.loadFile("./app/index.html");
}

// init database
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("./app/db/albums.db");
db.run("CREATE TABLE IF NOT EXISTS albums(artist TEXT, album TEXT, mediatype TEXT, UNIQUE(artist, album, mediatype))");
db.close();

app.whenReady().then(createWindow);

try {
	require('electron-reloader')(module)
} catch {}