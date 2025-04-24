import { registerRootComponent } from 'expo';
import { AppRegistry, Platform } from 'react-native';
import App from './App';

// Polyfill for _interopRequireDefault not being available in some environments
global._interopRequireDefault = function(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
};

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
if (Platform.OS === 'web') {
  // Fix for web if needed
  AppRegistry.registerComponent('main', () => App);
  const rootTag = document.getElementById('root') || document.getElementById('app');
  AppRegistry.runApplication('main', { rootTag });
} else {
  registerRootComponent(App);
}
