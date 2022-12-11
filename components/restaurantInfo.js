import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Linking, Image, MapScreen } from 'react-native';
import { restaurantInfoArr } from './homeScreen'
import { Object, PotatoImage } from './allComponents'
import { YELP_API_KEY, GOOGLE_API_KEY } from '@env'

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
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingTop: 4,
    paddingBottom: 4,
    height: 50,
  },
  img: {
    height: 300,
    width: 300,
    margin: 10
  },
  input: {
    borderWidth: 3,
    borderColor: "chartreuse",
    fontSize: 30
  },
  text: {
    fontSize: 20,
    textAlign:'center',
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
  },
  titleText: {
    fontSize: 30,
    height: 50,
    textColor: 'black',
    textAlign:'center',
  },
  yelpMapBtns: {
    // flex: 1,
    flexDirection: 'row',
    height: 100,
  },
  btnText: {
    textAlign: 'center',
    color: '#9072C4',
    fontSize: 18,
  },
  restContent: {
    //flex: 1,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  newRerollBtn: {
    //flex: 1,
    flexDirection: 'row',
    height:75,

  },
  name: {
    fontSize:28,
    textAlign:'center',
  }
});

export default RestaurantInfo