import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { theme } from './src/theme';
import { AppContextProvider } from './src/context/AppContext';
import { AuthContextProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <AuthContextProvider>
          <AppContextProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </AppContextProvider>
        </AuthContextProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}
