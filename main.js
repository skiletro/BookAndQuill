// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload

const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs')
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 146 * 4,
        height: 180 * 4,
        icon: path.join(__dirname + '/build/icon.png'),
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

    ipcMain.on('save-dialog', (_, data) => {
        dialog.showSaveDialog({
            title: 'Save a book',
            buttonLabel: 'Save Book',
            filters: [{
                name: 'Book',
                extensions: ['book']
            }],
            properties: []
        }).then(file => {
            if (!file.canceled) {
                fs.writeFile(file.filePath.toString(), data, (err) => { if (err) throw err})
                console.log("saved file!")
            }
        }).catch(err => {
            console.log(err)
        })
    })

    ipcMain.on('load-dialog', (event) => {
        dialog.showOpenDialog({
            title: 'Open a book',
            buttonLabel: 'Open Book',
            filters: [{
                name: 'Book',
                extensions: ['book']
            }],
            properties: ['openFile']
        }).then(file => {
            if (!file.canceled) {
                fs.readFile(file.filePaths[0], 'utf8', (err, data) => {
                    event.returnValue = JSON.parse(data)
                })
            } else {
                event.returnValue = {}
            }
        })

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