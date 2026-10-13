const { ipcRenderer } = require('electron')

window.electronAPI = {
  getAppPath: () => ipcRenderer.invoke('get-app-path'),
  getPathExe: () => ipcRenderer.invoke('get-path-exe'),
  readAppsDir: () => ipcRenderer.invoke('read-apps-dir'),
  relaunchApp: () => ipcRenderer.send('relaunch-app')
}