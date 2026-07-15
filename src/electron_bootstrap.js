const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require("node:path");
const XlsxPopulate = require('xlsx-populate');

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
  }).then((results) => {
    if (results.cancelled) {
      return;
    }
    let path = results.filePath;
    XlsxPopulate.fromBlankAsync().then(workbook => {
      return workbook.toFileAsync(path, {password: props.pw});
    });
  });
}
