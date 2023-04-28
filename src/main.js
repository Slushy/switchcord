const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const discordRPC = require('discord-rich-presence');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 250,
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

let discordClient = null;
ipcMain.handle('start_playing', (e, { name, imageKey }) => {
  discordClient = discordRPC('1098793900291936278');
  discordClient.updatePresence({
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
  discordClient?.disconnect();
});
