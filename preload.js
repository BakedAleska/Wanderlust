const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getScenario: () => ipcRenderer.invoke('get-scenario'),
  getChoices: () => ipcRenderer.invoke('get-choices')
});
