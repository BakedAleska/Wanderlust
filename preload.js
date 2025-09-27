const { context_bridge, ipc_renderer } = require('electron')

context_bridge.exposeInMainWorld('electronAPI', {
  homeClick: () => ipc_renderer.send('home-click'),
  requestMainAction: (data) => ipc_renderer.send('request-mainprocess-action', data)
})
