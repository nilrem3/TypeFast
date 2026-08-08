const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const path = require("node:path");
const XlsxPopulate = require('xlsx-populate');

if (require("electron-squirrel-startup")) return;

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
  ipcMain.on('create-key', handleCreateKey);
  ipcMain.handle('append-data', handleAppendData);
  ipcMain.on('quit', handleClose);
  win = createWindow();
});

function handleCreateKey(event, props) {
  dialog.showSaveDialog({
    title: "Create new key",
    defaultPath: props.name
  }).then((results) => {
    if (results.cancelled) {
      return;
    }
    let path = results.filePath;
    XlsxPopulate.fromBlankAsync().then(workbook => {
      const sheet = workbook.addSheet("Key");
      sheet.cell("A1").value("Subject ID")
      .relativeCell(0, 1).value("Name");

      workbook.deleteSheet("Sheet1");

      return workbook.toFileAsync(path, {password: props.pw});
    });
  });
}

function handleCreateSheet(event, props) {
  dialog.showSaveDialog({
    title: "Create new data sheet",
    defaultPath: props.name
  }).then((results) => {
    if (results.cancelled) {
      return;
    }
    let path = results.filePath;
    XlsxPopulate.fromBlankAsync().then(workbook => {
      const sheet = workbook.addSheet("Data");
      sheet.cell("A1").value("Subject ID")
      .relativeCell(0, 1).value("Native English Speaker?")
      .relativeCell(0, 1).value("Keyboard Layout")
      .relativeCell(0, 1).value("Taken a Typing Class?")
      .relativeCell(0, 1).value("Has Musical Training?")
      .relativeCell(0, 1).value("Musical Training Duration")

      .relativeCell(0, 1).value("Familiar Test Order")
      .relativeCell(0, 1).value("Unfamiliar Test Order")
      .relativeCell(0, 1).value("Nomusic Test Order")

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
      .relativeCell(0, 1).value("Second Song Feelings")
      .relativeCell(0, 1).value("Third Song Feelings")
      .relativeCell(0, 1).value("Knew First Song")
      .relativeCell(0, 1).value("Knew Second Song")
      .relativeCell(0, 1).value("Knew Third Song")


      workbook.deleteSheet("Sheet1");


      return workbook.toFileAsync(path, {password: props.pw});
    });
  });
}

function handleAppendData(event, props) {
  let resolver;
  let output = new Promise((resolve, reject) => {
    resolver = resolve;
  });
  dialog.showOpenDialog({
    title: "Select Data File"
  }).then((results) => {
    if (results.cancelled) {
      resolver({
        error: true,
        message: "Operation cancelled."
      })
    }
    let path = results.filePaths[0];
    if (!path) {
      resolver ({
        error: true,
        message: "Please select a file."
      });
      return;
    }
    if (results.filePaths.length > 1) {
      resolver({
        error: true,
        message: "Please only select one file."
      });
      return;
    }
    dialog.showOpenDialog({
      title: "Select Key File"
    }).then((results) => {
      if (results.cancelled) {
        resolver({
          error: true,
          message: "Operation cancelled."
        });
      }
      let key_path = results.filePaths[0];
      if (!key_path) {
        resolver({
          error: true,
          message: "Please select a key file."
        });
      }
      if (results.filePaths.length > 1) {
        resolver({
          error: true,
          message: "Please select only one key file."
        });
      }
      XlsxPopulate.fromFileAsync(path, {password: props.pw}).then(workbook => {
        let subject_id = crypto.randomUUID();

        XlsxPopulate.fromFileAsync(key_path, {password: props.key_pw}).then(workbook => {
          let sheet = workbook.sheet("Key");
          let firstCell = sheet.cell("A1");
          while (firstCell.value() !== undefined) {
            firstCell = firstCell.relativeCell(1, 0);
          }
          firstCell.value(subject_id)
          .relativeCell(0, 1).value(props.data.pretest.get("name"));
          workbook.toFileAsync(key_path, {password: props.key_pw});
        }).catch(err => {
          resolver({
            error: true,
            message: "Failed to write key file"
          });
        });

        let sheet = workbook.sheet("Data");
        let firstCell = sheet.cell("A1");
        while (firstCell.value() !== undefined) {
          firstCell = firstCell.relativeCell(1, 0);
        }
        firstCell.value(subject_id)
        .relativeCell(0, 1).value(props.data.pretest.get("native_language"))
        .relativeCell(0, 1).value(props.data.pretest.get("keyboard_layout"))
        .relativeCell(0, 1).value(props.data.pretest.get("typing_class"))
        .relativeCell(0, 1).value(props.data.pretest.get("musical_training"))
        .relativeCell(0, 1).value(props.data.pretest.get("musical_training_duration"))

        .relativeCell(0, 1).value(props.data.orderinfo.familiar)
        .relativeCell(0, 1).value(props.data.orderinfo.unfamiliar)
        .relativeCell(0, 1).value(props.data.orderinfo.nomusic)

        .relativeCell(0, 1).value(props.data.nomusic.correctCharacterCount)
        .relativeCell(0, 1).value(props.data.nomusic.incorrectCharacterCount)
        .relativeCell(0, 1).value(props.data.nomusic.correctWordCount)
        .relativeCell(0, 1).value(props.data.nomusic.incorrectWordCount)
        .relativeCell(0, 1).value(props.data.nomusic.spaceCharacterCount)
        .relativeCell(0, 1).value(props.data.nomusic.unnecessarySpaceCharacterCount)
        .relativeCell(0, 1).value(props.data.nomusic.timeElapsed)
        .relativeCell(0, 1).value(props.data.nomusic.stats.characterAccuracy)
        .relativeCell(0, 1).value(props.data.nomusic.stats.cpm)
        .relativeCell(0, 1).value(props.data.nomusic.stats.wordAccuracy)
        .relativeCell(0, 1).value(props.data.nomusic.stats.wpm)
        .relativeCell(0, 1).value(props.data.nomusic.stats.real_wpm)

        .relativeCell(0, 1).value(props.data.familiar.correctCharacterCount)
        .relativeCell(0, 1).value(props.data.familiar.incorrectCharacterCount)
        .relativeCell(0, 1).value(props.data.familiar.correctWordCount)
        .relativeCell(0, 1).value(props.data.familiar.incorrectWordCount)
        .relativeCell(0, 1).value(props.data.familiar.spaceCharacterCount)
        .relativeCell(0, 1).value(props.data.familiar.unnecessarySpaceCharacterCount)
        .relativeCell(0, 1).value(props.data.familiar.timeElapsed)
        .relativeCell(0, 1).value(props.data.familiar.stats.characterAccuracy)
        .relativeCell(0, 1).value(props.data.familiar.stats.cpm)
        .relativeCell(0, 1).value(props.data.familiar.stats.wordAccuracy)
        .relativeCell(0, 1).value(props.data.familiar.stats.wpm)
        .relativeCell(0, 1).value(props.data.familiar.stats.real_wpm)

        .relativeCell(0, 1).value(props.data.unfamiliar.correctCharacterCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.incorrectCharacterCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.correctWordCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.incorrectWordCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.spaceCharacterCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.unnecessarySpaceCharacterCount)
        .relativeCell(0, 1).value(props.data.unfamiliar.timeElapsed)
        .relativeCell(0, 1).value(props.data.unfamiliar.stats.characterAccuracy)
        .relativeCell(0, 1).value(props.data.unfamiliar.stats.cpm)
        .relativeCell(0, 1).value(props.data.unfamiliar.stats.wordAccuracy)
        .relativeCell(0, 1).value(props.data.unfamiliar.stats.wpm)
        .relativeCell(0, 1).value(props.data.unfamiliar.stats.real_wpm)

        .relativeCell(0, 1).value(props.data.posttest.get("first_test_music_feelings"))
        .relativeCell(0, 1).value(props.data.posttest.get("second_test_music_feelings"))
        .relativeCell(0, 1).value(props.data.posttest.get("third_test_music_feelings"))
        .relativeCell(0, 1).value(props.data.posttest.get("first_test_music_known"))
        .relativeCell(0, 1).value(props.data.posttest.get("second_test_music_known"))
        .relativeCell(0, 1).value(props.data.posttest.get("third_test_music_known"));

        workbook.toFileAsync(path, {password: props.pw});
        resolver({
          error: false,
          message: ""
        })
      }).catch((err) => {
        resolver({
          error: true,
          message: `Incorrect password. ${err}`
        })
      });
    });
  }).catch((err) => {
    resolver({
      error: true,
      message: "Operation cancelled 2."
    });
  });
  return output;
}

function handleClose() {
  app.quit();
}
