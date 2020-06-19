import React from 'react';
import { Provider } from 'react-native-paper';
import App from './src';
import { theme } from './src/core/theme';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as LocationProvider } from './src/context/LocationContext';
import { setNavigator } from './src/navigationRef';

const Main = () => (
  <AuthProvider>
    <LocationProvider>
      <Provider theme={theme}>
        <App
          ref={navigator => {
            setNavigator(navigator);
          }}
        />
      </Provider>
    </LocationProvider>
  </AuthProvider>
);

export default Main;
