import  React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { HomeScreen } from '../screens/HomeScreen';
import { TextInputScreen } from '../screens/TextInputScreen';
import { PullToRefreshScreen } from '../screens/PullToRefreshScreen';
import { CustomSectionListScreen } from '../screens/CustomSectionListScreen';
import { ModalScreen } from '../screens/ModalScreen';
import { InfiniteScrollScreen } from '../screens/InfiniteScrollScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

import {  store } from '../store'
import { SendSmsScreen } from '../screens/SendSmsScreen';
import { DependentScreen } from '../screens/DependentScreen';


const Stack = createStackNavigator();

export const Navigator = () => {

  const { status  } = useSelector( (state: store ) => state.loginStore)

  return (
    <Stack.Navigator 
       screenOptions={{
        headerShown: false,
        cardStyle: {
            backgroundColor: 'white'
        }
       }}
    >
      {  
      
          (status == 'authenticated')
          ? (<>
                  
                  <Stack.Screen name="LoginScreen" component={ LoginScreen } />
                  <Stack.Screen name="SendSmsScreen" component={ SendSmsScreen } /> 
                  <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
            </>)
          : (<>
               {/** Este HomeScreen es el principa que lama el menu*/}
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="DependentScreen" component={ DependentScreen } />
                <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
                <Stack.Screen name="PullToRefreshScreen" component={PullToRefreshScreen} />
                <Stack.Screen name="CustomSectionListScreen" component={CustomSectionListScreen} />
                <Stack.Screen name="ModalScreen" component={ModalScreen} />
                <Stack.Screen name="InfiniteScrollScreen" component={ InfiniteScrollScreen } />
             </>)
      
      }
     
      
   
 
    </Stack.Navigator>
  );
}