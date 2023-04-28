module.exports = {
  packagerConfig: {
    icon: 'resources/switch_icon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@rabbitholesyndrome/electron-forge-maker-portable"
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
  ],
};
