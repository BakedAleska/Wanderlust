const { app, BrowserWindow } = require('electron')
const path = require('path');

// Enable hot reload in development
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
        // ignore if electron-reload isn't installed
        console.warn('electron-reload not available:', err.message)
    }
}

const create_window = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(() =>  {
    create_window()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})