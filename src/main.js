const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const discordRPC = require('discord-rich-presence');

// run this as early in the main process as possible
if (require('electron-squirrel-startup')) app.quit();

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
  win.setMenu(null);
  // win.webContents.toggleDevTools();
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
ipcMain.handle('start_playing', (e, { name, appId }) => {
  discordClient?.disconnect();
  discordClient = discordRPC(appId);
  discordClient.updatePresence({
    details: `Playing on Nintendo Switch`,
    startTimestamp: Date.now(),
    largeImageKey: "game_logo",
    largeImageText: name,
    smallImageKey: 'switch_logo',
    smallImageText: 'Nintendo Switch',
    instance: false,
  });
});

ipcMain.handle('stop_playing', () => {
  discordClient?.disconnect();
  discordClient = null;
});
