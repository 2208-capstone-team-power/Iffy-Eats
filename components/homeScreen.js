import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { YELP_API_KEY } from '@env'
import { Dropdown } from 'react-native-element-dropdown';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export let restaurantInfoArr = [];

function HomeScreen({ navigation }) {

  const [userlocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [value, setValue] = useState(8000)
  const [radius, setRadius] = useState(8000);
  const [isFocus, setIsFocus] = useState(false)

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

  const getYelpRestaurants = async () => {
    if (userAddress) {
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

          navigation.navigate('Your Foodie Surprise');
        }
        )
    } else {
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

            navigation.navigate('Your Foodie Surprise')
          }
          )
      }
    }
  };

  const data = [{
    'label': '5 miles',
    'value': '8000',
  }, {
    'label': '10 miles',
    'value': '16000',
  }, {
    'label': '15 miles',
    'value': '24000',
  }, {
    'label': '20 miles',
    'value': '32000',
  },]


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: '#fffff9', }}>
      <View style={styles.dropContainer}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Search Radius' : 'Search Radius'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setRadius(item.value)
            setIsFocus(false);
          }} />
      </View>
      <View style={styles.wholecontainer}>
        <Image style={styles.img} source={require('../assets/Feed-Your-Hangry.png')} />
        <Text style={styles.titleText}>Welcome to Iffy Eats!</Text>
      </View>
      <View style={styles.container}>
        {!userlocation ?
          <View styles={styles.container}>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? '#D9EDFC' : '#9072C4' }), styles.wrapperCustom]}
              onPress={onPressHandler}>
              <Text style={styles.btnText}>Use My Location</Text>
            </Pressable>
            <Text style={styles.textSpacer}>------------------- OR ------------------</Text>
            <TextInput
              style={styles.input}
              keyboardType={'default'}
              placeholder={'Enter Address'}
              value={userAddress}
              onChangeText={(e) => setUserAddress(e)}>
            </TextInput>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? '#D9EDFC' : '#9072C4' }), styles.wrapperCustom]}
              onPress={getYelpRestaurants}>
              <Text style={styles.btnText}>Enter Address</Text>
            </Pressable>
          </View> :
          <View>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? '#D9EDFC' : '#9072C4' }), styles.wrapperCustom]}
              onPress={getYelpRestaurants}>
              <Text style={styles.btnText}>Click To Feed Your HANGRY!</Text>
            </Pressable>
          </View>
        }
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  wholecontainer: {
    flex: 1,
    backgroundColor: '#fffff9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  titleText: {
    fontSize: 30,
  },
  container: {
    flex: 1,
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
    borderColor: '#B6F7EB',
    borderRadius: 10,
    height: 40,
    fontSize: 18,
    backgroundColor: '#DAEDFB'
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
    width: 200,
    textAlign: 'center',
    alignSelf: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#ECF6FD',
    fontSize: 18,
  },
  dropdown: {
    height: 45,
    width: 140,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  dropContainer: {
    alignSelf: 'flex-end',
    paddingRight: 15,
    paddingTop: 10,
  }
});

export default HomeScreen