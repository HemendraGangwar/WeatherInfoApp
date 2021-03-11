import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../components/LandingScreen';
import DetailsScreen from "../components/DetailsScreen";
import screens from "../constants/screens";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name={screens.homeScreen}
          component={LandingScreen} />
        <Stack.Screen name={screens.detailsScreen}
          component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

