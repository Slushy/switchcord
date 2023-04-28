const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 300,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.loadFile(path.join(__dirname, '..', 'resources', 'index.html'));
  //   win.webContents.toggleDevTools();
};

app.on('window-all-closed', () => {
  app.quit();
});

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

let discordRPC = null;
ipcMain.handle('start_playing', (e, { name, imageKey }) => {
  console.log(name, imageKey);

  discordRPC = require('discord-rich-presence')('1098793900291936278');
  discordRPC.updatePresence({
    details: `Playing ${name}`,
    startTimestamp: Date.now(),
    largeImageKey: imageKey,
    largeImageText: name,
    smallImageKey: 'switch_logo',
    smallImageText: 'Nintendo Switch',
    instance: false,
  });
});

ipcMain.handle('stop_playing', () => {
  discordRPC?.disconnect();
});
