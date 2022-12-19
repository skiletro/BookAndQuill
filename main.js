// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 146 * 4,
        height: 180 * 4,
        transparent: true,
        frame: false
    })

    win.loadFile('index.html')

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}

app.whenReady().then(() => {
    createWindow()

    // macOS functionality
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
      });
})