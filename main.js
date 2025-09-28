const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

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
    ipcMain.handle('restart-game', () => {
        // Reset user-data.json
        const fs = require('fs');
        fs.writeFileSync(userDataPath, JSON.stringify({ page: 0, scenario_history: [], answer_history: [] }, null, 2));
        return true;
    });
    const userDataPath = path.join(app.getPath('userData'), 'user-data.json');
    const sHandler = require('./scenario-handler.js');
    const userDataHandler = require('./user-data-handler.js');

        function initUserData() {
            fs.writeFileSync(userDataPath, JSON.stringify({ page: 0, scenario_history: [], answer_history: [] }, null, 2));
        }

    ipcMain.handle('get-scenario', () => {
        return sHandler.handle_scenario();
    });

    ipcMain.handle('append-answer', (event, answerText) => {
        userDataHandler.append_data('answer', answerText);
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

    initUserData();
    create_window();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});