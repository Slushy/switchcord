const client = require('discord-rich-presence')('1098793900291936278');

client.updatePresence({
  details: 'Playing The Legend of Zelda: Breath of the Wild',
  startTimestamp: Date.now(),
  largeImageKey: 'zelda_botw',
  largeImageText: 'The Legend of Zelda: Breath of the Wild',
  smallImageKey: 'switch_logo',
  smallImageText: 'Nintendo Switch',
  instance: false,
});
