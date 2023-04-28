const { ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const gamesJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'games.json')));

const START_PLAYING_TEXT = 'Start Playing';
const STOP_PLAYING_TEXT = 'Stop Playing';
const gameSelect = document.getElementById('game-select');
const toggleStatusButton = document.getElementById('toggleStatusButton');
const statusText = document.getElementById('status');

const startPlaying = () => {
  toggleStatusButton.innerText = STOP_PLAYING_TEXT;
  gameSelect.disabled = true;
  const game = gamesJSON.find((g) => g.name === gameSelect.value);
  ipcRenderer.invoke('start_playing', game);
  document.body.classList.add('playing');

  statusText.innerHTML = `You are playing <b>${game.name}</b>`;
};

const stopPlaying = () => {
  toggleStatusButton.innerText = START_PLAYING_TEXT;
  gameSelect.disabled = false;
  ipcRenderer.invoke('stop_playing');
  document.body.classList.remove('playing');

  statusText.innerText = '';
};

const initialize = () => {
  // build game select
  const optionHTML = gamesJSON.map((g) => `<option value="${g.name}">${g.name}</option>`);
  gameSelect.innerHTML = optionHTML;

  // setup button to toggle playing
  toggleStatusButton.innerText = START_PLAYING_TEXT;
  toggleStatusButton.onclick = () => {
    if (toggleStatusButton.innerText === START_PLAYING_TEXT) {
      startPlaying();
    } else {
      stopPlaying();
    }
  };
};

initialize();
