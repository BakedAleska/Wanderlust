const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const sHandler = require('./scenario-handler.js');
const userDataPath = path.join(app.getPath('userData'), 'user-data.json');

function initUserData() {
  fs.writeFileSync(userDataPath, JSON.stringify({ page: 0 }, null, 2));
}

ipcMain.handle('get-scenario', () => {
    return sHandler.begin();
});

ipcMain.handle('get-choices', () => {
    return sHandler.generate_choice();
});

if (process.env.NODE_ENV === 'development') {
    try {
        require('electron-reload')(__dirname, {
            electron: require('electron').path,
            files: [
                path.join(__dirname, 'main.js'),
                path.join(__dirname, 'index.html')
            ]
        });
    } catch (err) {
        console.warn('electron-reload not available:', err.message);
    }
}

function create_window() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    try {
        win.setMenuBarVisibility(false);
    } catch (err) {}

    win.maximize();
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    initUserData();
    create_window();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});