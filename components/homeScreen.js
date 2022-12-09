import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { YELP_API_KEY } from '@env'

export let restaurantInfoArr = [];
export let addressArr = [];

function HomeScreen({ navigation }) {

  const [userlocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userAddress, setUserAddress] = useState('');

  const [radius, setRadius] = useState('8000');

  const onPressHandler = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        alert('Please go to settings and allow location services');
        console.log('Location permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      console.log(loc + 'from homescreen')
      setUserLocation(loc);
    })()
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        console.log('Location permission denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc);
      console.log(loc)
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (userlocation) {
    text = JSON.stringify(userlocation);
  }


  //const radius = '8000'
  const getYelpRestaurants = async () => {
    if (userAddress) {
      addressArr = []
      addressArr.push(userAddress)
      console.log("HomeScreen line62 " + addressArr)
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${userAddress}&term=food, restaurants&radius=${radius}`
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
          restaurantInfoArr = []
          restaurantInfoArr.push(foodPlace[oneFoodPlace].name)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].location.address1)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].location.city)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].location.state)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].location.zip_code)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].url)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.latitude)
          restaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.longitude)

          navigation.navigate('Restaurant');
        }
        )
    } else {
      console.log( 'from homescreen', userlocation.coords)
      if (userlocation) {
        const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food, restaurants&radius=${radius}&latitude=${userlocation.coords.latitude}&longitude=${userlocation.coords.longitude}`
        const apiOptions = {
          headers: {
            Authorization: `Bearer ${YELP_API_KEY}`
          }
        }
        return await fetch(yelpUrl, apiOptions)
          .then((res) => res.json())
          .then((json) => {

            const foodPlace = (json.businesses)
            let oneFoodPlace = Math.floor(Math.random(foodPlace) * foodPlace.length)

            restaurantInfoArr = []
            restaurantInfoArr.push(foodPlace[oneFoodPlace].name)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].location.address1)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].location.city)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].location.state)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].location.zip_code)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].url)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.latitude)
            restaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.longitude)
            navigation.navigate('Restaurant')
            console.log("from homescreen with gps" + restaurantInfoArr)
          }
          )
      }
    }
  };
 

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/Feed-Your-Hangry.png')} />
        <Text style={styles.text}>Welcome to Iffy Eats!</Text>

        {!userlocation ? <View>
          <Pressable
            style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
            onPress={onPressHandler}
          >
            <Text style={styles.btnText}>Use My Location</Text>
          </Pressable>
          <Text style={styles.textSpacer}>------------------- OR ------------------</Text>
          <TextInput
            style={styles.input}
            keyboardType={'default'}
            placeholder={'Enter Address'}
            value={userAddress}
            onChangeText={(e) => setUserAddress(e)}
          ></TextInput>
          <Pressable
            style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
            onPress={getYelpRestaurants}
          >
            <Text style={styles.btnText}>Enter Address</Text>
          </Pressable>
        </View> :
          <View>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={getYelpRestaurants}
            >
              <Text style={styles.btnText}>Click to feed your hangry!</Text>
            </Pressable>
            {/* {pickedRestaurant? <Text>{pickedRestaurant}</Text> : null} */}
            <StatusBar style="auto" />
          </View>
        }
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 300,
    width: 300,
    margin: 30,
  },
  input: {
    borderWidth: 3,
    borderColor: "chartreuse",
    fontSize: 30,
  },
  text: {
    marginBottom: 60,
    textAlign: 'center'
  },
  textSpacer: {
    marginTop: 10,
    marginBottom: 12,
    textAlign: 'center'
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    margin: 10,
    width: 150,
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center'
  }
});

export default HomeScreen
