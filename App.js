import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {HomeScreen, RestaurantInfo, Object, NewLocation, MapScreen} from './components/allComponents'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name='Iffy Eats' component={HomeScreen} />
      <Stack.Screen name='Your Foodie Surprise' component={RestaurantInfo} />
      <Stack.Screen name='Object' component={Object} />
      <Stack.Screen name="New Location" component={NewLocation} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}