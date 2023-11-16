import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigator } from './src/navigator/navigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const Stack = createStackNavigator();

 const App = () => {
  return (
    <NavigationContainer>
       <Provider store={ store}>
          <Navigator></Navigator>
      </Provider>
    </NavigationContainer>
  )
}


export default App;