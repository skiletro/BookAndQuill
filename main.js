// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 146 * 4,
        height: 180 * 4,
        icon: path.join(__dirname + '/favicon.ico'),
        transparent: true,
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })

    ipcMain.on('minimize', () => {
        win.isMinimized() ? win.restore() : win.minimize()
        // or alternatively: win.isVisible() ? win.hide() : win.show()
      })
}

app.whenReady().then(() => {
    createWindow()

    // macOS functionality
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
      })
})