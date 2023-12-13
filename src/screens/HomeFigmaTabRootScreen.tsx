import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeFigmaTab1Screen } from './HomeFigmaTab1Screen';
import { HomeFigmaTab2Screen } from './HomeFigmaTab2Screen';
import { HomeFigmaTab3Screen } from './HomeFigmaTab3Screen';
import { HomeFigmaTab4Screen } from './HomeFigmaTab4Screen';

const Tab = createBottomTabNavigator();

export const HomeFigmaTabRootScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeFigmaTab1Screen" component={HomeFigmaTab1Screen} />
      <Tab.Screen name="HomeFigmaTab2Screen" component={HomeFigmaTab2Screen} />
      <Tab.Screen name="HomeFigmaTab3Screen" component={HomeFigmaTab3Screen} />
      <Tab.Screen name="HomeFigmaTab4Screen" component={HomeFigmaTab4Screen} />
    </Tab.Navigator>
  );
}