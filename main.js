const { app, BrowserWindow } = require("electron");

function createWindow() {
	// Create the browser window.
	let win = new BrowserWindow({
		width: 800,
		height: 600,
		title: "Albenliste",
		icon: "./app/img/vinyl.ico",
		// Icon from: https://www.iconarchive.com/show/small-n-flat-icons-by-paomedia/disc-vinyl-icon.html
		resizable: false,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
		}
	});
	
	// and load the index.html of the app.
	win.loadFile("./app/index.html");
}

app.on("ready", createWindow);