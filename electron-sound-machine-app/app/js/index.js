'use strict';

const ipc = require('electron').ipcRenderer;
const path = require('path');
const remote = require('remote');

const Tray = remote.require('tray');
const Menu = remote.require('menu');

let trayIcon = null;

if (process.platform === 'darwin') {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-iconTemplate.png'));
} else {
  trayIcon = new Tray(path.join(__dirname, 'img/tray-icon-alt.jpg'));
}

let trayMenuTemplate = [
  {
    label: 'Sound machine',
    enabled: false
  },
  {
    label: 'Settings',
    click: () => {
      ipc.send('open-settings-window');
    }
  },
  {
    label: 'Quit',
    click: () => {
      ipc.send('close-main-window');
    }
  }
];

let trayMenu = Menu.buildFromTemplate(trayMenuTemplate);
trayIcon.setContextMenu(trayMenu);


let soundButtons = document.querySelectorAll('.button-sound');
let closeElement = document.querySelector('.close');
let settingsButton = document.querySelector('.settings');

// Sound Buttons

for (let i = 0; i < soundButtons.length; i++) {
  let soundName = soundButtons[i].attributes['data-sound'].value;
  prepareButtons(soundButtons[i], soundName);
}

function prepareButtons(buttonElement, soundName) {
  buttonElement.querySelector('span')
    .style.backgroundImage = `url("img/icons/${soundName}.png")`

  let audio = new Audio(`${__dirname}/wav/${soundName}.wav`);
  buttonElement.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
  });
}

// Close

closeElement.addEventListener('click', () => {
  ipc.send('close-main-window');
});

// Settings

settingsButton.addEventListener('click', () => {
  ipc.send('open-settings-window');
})

// Keyboard Shortcuts

ipc.on('global-shortcut', (_, arg) => {
  let event = new MouseEvent('click');
  soundButtons[arg].dispatchEvent(event);
});
