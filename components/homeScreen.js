import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Location from 'expo-location';
import { YELP_API_KEY } from '@env'
import { Dropdown } from 'react-native-element-dropdown';

export let restaurantInfoArr = [];
export let addressArray = {}

function HomeScreen({ navigation }) {

  const [userlocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [value, setValue] = useState(8000)
  const [radius, setRadius] = useState(8000);
  const [isFocus, setIsFocus]= useState(false)

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

  const coordinates = () => {
    if(userlocation){
      addressArray.latitude = userlocation.coords.latitude
      addressArray.longitude= userlocation.coords.longitude
      console.log("LOOK AT OBJECT" + addressArray)
    }
  }
  coordinates(userlocation)

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (userlocation) {
    text = JSON.stringify(userlocation);
  }

  const getYelpRestaurants = async () => {
    console.log(radius)
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

          navigation.navigate('Restaurant');
        }
        )
    } else {
      console.log( 'from homescreen', userlocation.coords)
      console.log('radius: ' + radius)
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

            // addressArray[latitude]=`${userlocation.coords.latitude}`


            navigation.navigate('Restaurant')
            console.log("from homescreen with gps" + restaurantInfoArr)
          }
          )
      }
    }
  };

  const data = [{
    'label': '20 miles',
    'value': '32000',
  },{
    'label': '15 miles',
    'value': '24000',
  },{
    'label': '10 miles',
    'value': '16000',
  }, {
    'label': '5 miles',
    'value': '8000',
  }]


  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/Feed-Your-Hangry.png')} />
        <Text style={styles.text}>Welcome to Iffy Eats!</Text>
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
          placeholder={!isFocus ? 'Search Radius': '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setRadius(item.value)
            setIsFocus(false);
          }}

        />
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
  },
  dropdown: {
    height: 45,
    width:140,
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
});

export default HomeScreen
