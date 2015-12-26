'use strict';

const app = require('app');
const ipc = require('electron').ipcMain;
const globalShortcut = require('global-shortcut');
const BrowserWindow = require('browser-window');

const configuration = require('./configuration');

let mainWindow = null;
let settingsWindow = null;

app.on('ready', () => {
  if (!configuration.readSettings('shortcutKeys')) {
    configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
  }

  mainWindow = new BrowserWindow({
    frame: false,
    height: 700,
    resizable: false,
    width: 368
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  setGlobalShortcuts();
});

function setGlobalShortcuts() {
  globalShortcut.unregisterAll();

  let shortcutKeysSetting = configuration.readSettings('shortcutKeys');
  let shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

  globalShortcut.register(shortcutPrefix + '1', () => {
    mainWindow.webContents.send('global-shortcut', 0);
  });

  globalShortcut.register(shortcutPrefix + '2', () => {
    mainWindow.webContents.send('global-shortcut', 1);
  })
}

ipc.on('close-main-window', () => {
  app.quit();
});

ipc.on('open-settings-window', () => {
  if (settingsWindow) { return; }

  settingsWindow = new BrowserWindow({
    frame: false,
    height: 200,
    resizable: false,
    width: 200
  });

  settingsWindow.loadURL(`file://${__dirname}/app/settings.html`);

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
});

ipc.on('close-settings-window', () => {
  if (settingsWindow) { settingsWindow.close(); }
});

ipc.on('set-global-shortcuts', () => {
  setGlobalShortcuts();
})
