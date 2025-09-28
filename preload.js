const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getScenario: () => ipcRenderer.invoke('get-scenario'),
  appendAnswer: (answerText) => ipcRenderer.invoke('append-answer', answerText),
  restartGame: () => ipcRenderer.invoke('restart-game')
});
