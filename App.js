import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {HomeScreen, SetLocation, Object} from './components/allComponents'

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

      <Stack.Screen name='Iffy Eats' component={HomeScreen} />
      <Stack.Screen name='Location' component={SetLocation} />
      {/* <Stack.Screen name='Object' component={Object} /> */}
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}