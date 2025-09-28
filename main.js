const { app, BrowserWindow } = require('electron')
const path = require('path');
const sHandler = require('./scenarioHandler.js')
const { ipcMain } = require('electron');

if (process.env.NODE_ENV === 'development') {
ipcMain.handle('get-scenario', () => {
    return sHandler.initializeScenario();
});
    try {
        require('electron-reload')(__dirname, {
            electron: require('electron').path,
            files: [
                path.join(__dirname, 'main.js'),
                path.join(__dirname, 'index.html')
            ]
        })
    } catch (err) {
        console.warn('electron-reload not available:', err.message)
    }
}

const create_window = () => {
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
    })

    try {
        win.setMenuBarVisibility(false)
    } catch (err) {}

    win.maximize();

    win.webContents.send('scenario-text', 'Scenario here');

    win.loadFile('index.html')
}

app.whenReady().then(() =>  {
    create_window()
    sHandler.initializeScenario()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})