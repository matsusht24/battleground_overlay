const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'frontend', 'renderer.js')
        }
    });

    mainWindow.loadFile('frontend/index.html');
}

app.whenReady().then(createWindow);
