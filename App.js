import React from 'react';
import { SafeAreaView } from "react-native";
import {Provider} from 'react-redux';
import {configureStore} from './src/service/stores/ConfigureStore';
import AppNavigator from './src/navigation/AppNavigator';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}

export default App;