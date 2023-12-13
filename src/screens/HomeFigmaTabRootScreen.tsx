import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeFigmaTab1Screen } from './HomeFigmaTab1Screen';
import { HomeFigmaTab2Screen } from './HomeFigmaTab2Screen';
import { HomeFigmaTab3Screen } from './HomeFigmaTab3Screen';
import { HomeFigmaTab4Screen } from './HomeFigmaTab4Screen';
import { styles } from '../theme/registrodatosFigmaTheme';
import { colores } from '../theme/comunFigmaTheme';
import { Text } from 'react-native-elements';

const Tab = createBottomTabNavigator();

export const HomeFigmaTabRootScreen = () => {
  return (
    <Tab.Navigator
      // tabBarOptions = {{
      //   activeTinColor: 'red'
      // }}
      initialRouteName="Feed"
      sceneContainerStyle= {{
        backgroundColor:'white'
      }}
      // screenOptions={{
      //   tabBarActiveTintColor: colores.primary,
      //   tabBarStyle: {
      //     borderTopColor: colores.primary, // Change the borderTopColor here
      //     borderTopWidth: 0, // Change the borderTopColor here
      //     elevation:0,
      //   },
      //   tabBarLabelStyle:{
      //      fontSize:20
      //   }
      // }}

      screenOptions= { ( { route}) => ({
            tabBarIcon: ( { color, size, focused} ) => {
              let iconName: string = '';
                console.log(route.name)
                switch (  route.name ){
                    case 'HomeFigmaTab1Screen':
                       iconName='T1'
                       break;
                    case 'HomeFigmaTab2Screen':
                       iconName='T2'
                       break;
                    case 'HomeFigmaTab3Screen':
                       iconName='T3'
                       break;
                    case 'HomeFigmaTab4Screen':
                       iconName='T4'
                       break;

                }
                return <Text style = {{ color  }}>{ iconName }</Text>
            }
      })

      }
      
     
    >
      <Tab.Screen name="HomeFigmaTab1Screen" options={{title:'saymon'}} component={HomeFigmaTab1Screen} />
      <Tab.Screen name="HomeFigmaTab2Screen" options={{title:'saymon'}} component={HomeFigmaTab2Screen} />
      <Tab.Screen name="HomeFigmaTab3Screen" options={{title:'saymon'}} component={HomeFigmaTab3Screen} />
      <Tab.Screen name="HomeFigmaTab4Screen" options={{title:'saymon'}} component={HomeFigmaTab4Screen} />
    </Tab.Navigator>
  );
}