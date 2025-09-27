const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require('path');

if (process.env.NODE_ENV === 'development') {
    try {
        require('electron-reload')(__dirname, {
            electron: require(require('electron')?.path || 'electron'),
            // Watch main.js and index.html explicitly
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

    win.loadFile('index.html')
}

app.whenReady().then(() =>  {
    create_window()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Listen for renderer home click
ipcMain.on('home-click', (event) => {
    console.log('home-click received from renderer')
    switch_page()
})

// Listen for arbitrary actions from renderer
ipcMain.on('request-mainprocess-action', (event, arg) => {
    console.log('request-mainprocess-action received from renderer:', arg)
    switch_page()
})

// Forward renderer logs to the main process terminal
ipcMain.on('renderer-log', (event, msg) => {
    console.log('[renderer]', msg)
})
