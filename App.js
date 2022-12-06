import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {HomeScreen, RestaurantInfo, Object, RestaurantInfo} from './components/allComponents'

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name='Iffy Eats' component={HomeScreen} />
      <Stack.Screen name='Restaurant' component={RestaurantInfo} />
      <Stack.Screen name='Object' component={Object} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}