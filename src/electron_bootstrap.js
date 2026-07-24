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
      const sheet = workbook.addSheet("Data");
      sheet.cell("A1").value("Native English Speaker?")
      .relativeCell(0, 1).value("Keyboard Layout")
      .relativeCell(0, 1).value("Taken a Typing Class?")
      .relativeCell(0, 1).value("Has Musical Training?")
      .relativeCell(0, 1).value("Musical Training Duration")

      .relativeCell(0, 1).value("Test Order")

      .relativeCell(0, 1).value("No Music Correct Characters")
      .relativeCell(0, 1).value("No Music Incorrect Characters")
      .relativeCell(0, 1).value("No Music Correct Words")
      .relativeCell(0, 1).value("No Music Incorrect Words")
      .relativeCell(0, 1).value("No Music Space Characters")
      .relativeCell(0, 1).value("No Music Space Characters (Unnecessary)")
      .relativeCell(0, 1).value("No Music Time (Seconds)")
      .relativeCell(0, 1).value("No Music Character Accuracy")
      .relativeCell(0, 1).value("No Music Characters per Minute")
      .relativeCell(0, 1).value("No Music Word Accuracy")
      .relativeCell(0, 1).value("No Music Words per Minute")
      .relativeCell(0, 1).value("No Music Real Words per Minute")

      .relativeCell(0, 1).value("Familiar Music Correct Characters")
      .relativeCell(0, 1).value("Familiar Music Incorrect Characters")
      .relativeCell(0, 1).value("Familiar Music Correct Words")
      .relativeCell(0, 1).value("Familiar Music Incorrect Words")
      .relativeCell(0, 1).value("Familiar Music Space Characters")
      .relativeCell(0, 1).value("Familiar Music Space Characters (Unnecessary)")
      .relativeCell(0, 1).value("Familiar Music Time (Seconds)")
      .relativeCell(0, 1).value("Familiar Music Character Accuracy")
      .relativeCell(0, 1).value("Familiar Music Characters per Minute")
      .relativeCell(0, 1).value("Familiar Music Word Accuracy")
      .relativeCell(0, 1).value("Familiar Music Words per Minute")
      .relativeCell(0, 1).value("Familiar Music Real Words per Minute")

      .relativeCell(0, 1).value("Unfamiliar Music Correct Characters")
      .relativeCell(0, 1).value("Unfamiliar Music Incorrect Characters")
      .relativeCell(0, 1).value("Unfamiliar Music Correct Words")
      .relativeCell(0, 1).value("Unfamiliar Music Incorrect Words")
      .relativeCell(0, 1).value("Unfamiliar Music Space Characters")
      .relativeCell(0, 1).value("Unfamiliar Music Space Characters (Unnecessary)")
      .relativeCell(0, 1).value("Unfamiliar Music Time (Seconds)")
      .relativeCell(0, 1).value("Unfamiliar Music Character Accuracy")
      .relativeCell(0, 1).value("Unfamiliar Music Characters per Minute")
      .relativeCell(0, 1).value("Unfamiliar Music Word Accuracy")
      .relativeCell(0, 1).value("Unfamiliar Music Words per Minute")
      .relativeCell(0, 1).value("Unfamiliar Music Real Words per Minute")

      .relativeCell(0, 1).value("First Song Feelings")
      .relativeCell(0, 1).value("Second Song Feelings");


      workbook.deleteSheet("Sheet1");


      return workbook.toFileAsync(path, {password: props.pw});
    });
  });
}
