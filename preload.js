const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  homeClick: () => ipcRenderer.send('home-click'),
})
