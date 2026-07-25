const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  createSheet: (sheet_name, password) => ipcRenderer.send('create-sheet', { name: sheet_name, pw: password }),
  appendData: (password, data) => ipcRenderer.invoke('append-data', { pw: password, data: data }),
  quit: () => ipcRenderer.send('quit')
});
