import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Linking, Image, MapScreen } from 'react-native';
import { restaurantInfoArr } from './homeScreen'
import { Object, PotatoImage } from './allComponents'
import { YELP_API_KEY, GOOGLE_API_KEY } from '@env'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

function RestaurantInfo({ navigation }) {

  const [show, setShow] = useState(false)
  const [renderedRest, setrenderedRest] = useState(restaurantInfoArr)

  useEffect(() => {
    setTimeout(() => setShow(true), 3000)
  })

  const radius = 8000
  let newRestaurantInfoArr = []

  const newYelpRestaurants = async () => {
    if (restaurantInfoArr[6] & restaurantInfoArr[7]) {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food, restaurants&radius=${radius}&latitude=${restaurantInfoArr[6]}&longitude=${restaurantInfoArr[7]}&limit=50`
      const apiOptions = {
        headers: {
          Authorization: `Bearer ${YELP_API_KEY}`,
        },
      }
      return await fetch(yelpUrl, apiOptions)
        .then((res) => res.json())
        .then((json) => {
          const foodPlace = (json.businesses)
          let oneFoodPlace = Math.floor(Math.random(foodPlace) * foodPlace.length)
          newRestaurantInfoArr = []
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].name)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.address1)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.city)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.state)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.zip_code)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].url)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.latitude)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.longitude)
          setrenderedRest(newRestaurantInfoArr)
          return renderedRest
        }
        )
    }
  }

  const [fontsLoaded] = useFonts({
    'BalsamiqSans-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
    'BalsamiqSans-BoldItalic': require('../assets/fonts/BalsamiqSans-BoldItalic.ttf'),
    'BalsamiqSans-Italic': require('../assets/fonts/BalsamiqSans-Italic.ttf'),
    'CaveatBrush-Regular': require('../assets/fonts/CaveatBrush-Regular.ttf'),
    'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
    'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf')
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

    <View style={styles.container}>
      {show ?
        <View style={styles.innercontainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Food of the Day</Text>
          </View>
          <View style={styles.yelpMapBtns}>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#CDF6B6' }), styles.wrapperCustom]}
              onPress={() => navigation.navigate('MapScreen')}>
              <Text style={styles.btnText}>View On Map</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#CDF6B6' }), styles.wrapperCustom]}
              onPress={() => Linking.openURL(renderedRest[5])}>
              <Text style={styles.btnText}>View On Yelp</Text>
            </Pressable>
          </View>
          <View style={styles.restContent}>
            <Text style={styles.name}>{renderedRest[0]}</Text>
            <Text style={styles.text}>{renderedRest[1]}</Text>
            <Text style={styles.text}>{renderedRest[2]}, {renderedRest[3]}</Text>
            <Text style={styles.text}>{renderedRest[4]}</Text>
          </View>
          <View style={styles.img}>
            <PotatoImage />
          </View>
          <View style={styles.newRerollBtn}>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#B6F7EB' }), styles.wrapperCustom]}
              onPress={() => navigation.navigate('New Location')}>
              <Text style={styles.btnText}>New Address</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#B6F7EB' }), styles.wrapperCustom]}
              onPress={newYelpRestaurants}>
              <Text style={styles.btnText} >Try Again?</Text>
            </Pressable>
          </View>
        </View>
        : <Object />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 350,
  },
  innercontainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
    height: 50,
  },
  img: {
    height: 275,
    width: 300,
  },
  input: {
    borderWidth: 3,
    borderColor: "chartreuse",
    fontSize: 30
  },
  text: {
    fontSize: 20,
    textAlign:'center',
    fontFamily: 'Pacifico-Regular',
    color:'#6CB8EF'
  },
  button: {
    margin: 10,
    padding: 10
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    margin: 10,
    width: 150,
    textAlign: 'center',
    alignSelf: 'center',
  },
  titleContainer:{
    height:20,
    paddingBottom:40,
    paddingTop: 25,
  },
  titleText: {
    fontSize: 42,
    height: 50,
    textAlign:'center',
    fontFamily:'CaveatBrush-Regular',
    color:'#7824A8',
  },
  yelpMapBtns: {
    flexDirection: 'row',
    height: 100,
  },
  btnText: {
    textAlign: 'center',
    color: '#9072C4',
    fontSize: 18,
  },
  restContent: {
    height: 220,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    borderWidth:5,
    borderTopLeftRadius: 30,
    borderBottomRightRadius:30,
    borderStyle: 'dashed',
  },
  newRerollBtn: {
    flexDirection: 'row',
    height:75,
    //paddingBottom:30
  },
  name: {
    fontSize:38,
    textAlign:'center',
    fontFamily:'TitanOne-Regular',
    color:'#2395E7'
  }
});

export default RestaurantInfo