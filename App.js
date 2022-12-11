import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HomeScreen, RestaurantInfo, Object, NewLocation, MapScreen } from './components/allComponents'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

const Stack = createNativeStackNavigator();


const App = () => {

  const [fontsLoaded] = useFonts({
    'BalsamiqSans-Bold': require('./assets/fonts/BalsamiqSans-Bold.ttf'),
    'BalsamiqSans-BoldItalic': require('./assets/fonts/BalsamiqSans-BoldItalic.ttf'),
    'BalsamiqSans-Italic': require('./assets/fonts/BalsamiqSans-Italic.ttf'),
    'CaveatBrush-Regular': require('./assets/fonts/CaveatBrush-Regular.ttf'),
    'Pacifico-Regular': require('./assets/fonts/Pacifico-Regular.ttf'),
    'TitanOne-Regular': require('./assets/fonts/TitanOne-Regular.ttf'),
    'Mansalva-Regular': require('./assets/fonts/Mansalva-Regular.ttf')
  })

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, [])

  if (!fontsLoaded) {
    return undefined
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Iffy Eats'
          component={HomeScreen}
          options={{
            headerStyle: {
              backgroundColor: '#AB57DB',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'Pacifico-Regular'
            },
            headerTintColor: '#fff',
          }} />
        <Stack.Screen
          name='Your Foodie Surprise'
          component={RestaurantInfo}
          options={{
            headerStyle: {
              backgroundColor: '#AB57DB',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'Pacifico-Regular'
            },
            headerTintColor: '#fff',
          }} />
        <Stack.Screen
          name='Object'
          component={Object}
          options={{
            headerStyle: {
              backgroundColor: '#AB57DB',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              fontFamily: 'Pacifico-Regular'
            },
            headerTintColor: '#fff',
          }} />
        <Stack.Screen
          name="New Location"
          component={NewLocation}
          options={{
            title: 'Try New Location',
            headerStyle: {
              backgroundColor: '#AB57DB',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'Pacifico-Regular'
            },
            headerTintColor: '#fff',
          }} />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerStyle: {
              backgroundColor: '#AB57DB',
            },
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: 'bold',
              fontFamily: 'Pacifico-Regular'
            },
            headerTintColor: '#fff',
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App