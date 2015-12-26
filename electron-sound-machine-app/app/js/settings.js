'use strict';

const ipc = require('electron').ipcRenderer;
const configuration = require('../configuration.js');

let closeElement = document.querySelector('.close');
let modifierCheckboxes = document.querySelectorAll('.global-shortcut');

for (let i = 0; i < modifierCheckboxes.length; i++) {
  let shortcutKeys = configuration.readSettings('shortcutKeys');
  let modifierKey = modifierCheckboxes[i].attributes['data-modifier-key'].value;

  modifierCheckboxes[i].checked = shortcutKeys.indexOf(modifierKey) != -1;

  modifierCheckboxes[i].addEventListener('click', (e) => {
    bindModifierCheckboxes(e);
  });
}

function bindModifierCheckboxes(e) {
  let shortcutKeys = configuration.readSettings('shortcutKeys');
  let modifierKey = e.target.attributes['data-modifier-key'].value;

  if (shortcutKeys.indexOf(modifierKey) !== -1) {
    let shortcutKeyIndex = shortcutKeys.indexOf(modifierKey);
    shortcutKeys.splice(shortcutKeyIndex, 1);
  } else {
    shortcutKeys.push(modifierKey);
  }

  configuration.saveSettings('shortcutKeys', shortcutKeys);
  ipc.send('set-global-shortcuts');
}

// Close Settings Window
closeElement.addEventListener('click', () => {
  ipc.send('close-settings-window');
});
