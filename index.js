/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import Main from './components/Index';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Main);
