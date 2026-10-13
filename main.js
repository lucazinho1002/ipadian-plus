const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const fs = require('fs')

let win

function createWindow () {
  win = new BrowserWindow({
    titleBarStyle: 'hidden', 
    fullscreen: true, 
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
      webviewTag: true,
      experimentalFeatures: true,
      webSecurity: false
    }
  })

  win.loadURL(`file://${__dirname}/MaciPadian/index.html`)

  win.on('closed', () => {
    win = null
  })
}

app.commandLine.appendSwitch("--enable-experimental-web-platform-features")
app.commandLine.appendSwitch("--disable-site-isolation-trials")

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

ipcMain.handle('get-app-path', () => app.getAppPath())
ipcMain.handle('get-path-exe', () => app.getPath('exe'))

ipcMain.handle('read-apps-dir', () => {
  const myDir = app.getAppPath()
  const appsDir = path.join(myDir, 'MaciPadian', 'apps')
  if (!fs.existsSync(appsDir)) return []
  
  return fs.readdirSync(appsDir).filter(file => {
    return !(file.indexOf('.') === 0 || file.indexOf('__MACOSX') === 0)
  })
})

ipcMain.on('relaunch-app', () => {
  app.relaunch()
  app.exit(0)
})