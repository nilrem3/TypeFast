const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require("node:path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');

  return win;
}

app.whenReady().then(() => {
  ipcMain.on('create-sheet', handleCreateSheet);
  win = createWindow();
});

function handleCreateSheet(event, props) {
  dialog.showSaveDialog({
    defaultPath: props.name
  });
}
