// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Allow importing from node_modules
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx', 'cjs', 'mjs', 'json'];
config.resolver.assetExts = ['ttf', 'png', 'jpg', 'jpeg', 'svg', 'webp', 'gif', 'otf'];

// Enable web support
config.resolver.resolverMainFields = ['browser', 'main', 'react-native'];

module.exports = config;
