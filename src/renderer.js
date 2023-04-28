const { webFrame, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');

const games = JSON.parse(fs.readFileSync(path.join(__dirname, 'games.json')));

const gameSelect = document.getElementById('game-select');
const toggleStatusButton = document.getElementById('toggleStatusButton');

const START_PLAYING_TEXT = 'Start Playing';
const STOP_PLAYING_TEXT = 'Stop Playing';

const initialize = () => {
  // build game select
  const optionHTML = games.map((g) => `<option value="${g.name}">${g.name}</option>`);
  gameSelect.innerHTML = optionHTML;

  // setup button to toggle playing
  toggleStatusButton.innerText = START_PLAYING_TEXT;
  toggleStatusButton.onclick = () => {
    if (toggleStatusButton.innerText === START_PLAYING_TEXT) {
      toggleStatusButton.innerText = STOP_PLAYING_TEXT;
      gameSelect.disabled = true;
    } else {
      toggleStatusButton.innerText = START_PLAYING_TEXT;
      gameSelect.disabled = false;
    }
  };
};

initialize();
