const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('tools', {
  minimize: () => ipcRenderer.send('minimize'),
  saveDialog: (data) => ipcRenderer.send('save-dialog', data),
  loadDialog: () => {
    return ipcRenderer.sendSync('load-dialog')
  }
})