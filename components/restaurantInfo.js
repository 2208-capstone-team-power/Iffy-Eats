import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Linking, Image } from 'react-native';
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
  const newYelpRestaurants = async () => {
    if (restaurantInfoArr[6] & restaurantInfoArr[7]) {
      const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=food, restaurants&radius=${radius}&latitude=${restaurantInfoArr[6]}&longitude=${restaurantInfoArr[7]}`
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
          <Text style= {styles.titleText}>Food of the Day</Text>
          <View style={styles.yelpMapBtns}>
          <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => Linking.openURL(renderedRest[5])}>
              <Text style={styles.btnText}>View On Yelp</Text>
            </Pressable>
          </View>
          <View style={styles.restContent}>
            <Text>{renderedRest[0]}</Text>
            <Text>{renderedRest[1]}</Text>
            <Text>{renderedRest[2]}</Text>
            <Text>{renderedRest[3]}</Text>
            <Text>{renderedRest[4]}</Text>
          </View>
          <View style={styles.innercontainer}>
            <PotatoImage />
          </View>
          <View style={styles.newRerollBtn}>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => navigation.navigate('New Location')}>
              <Text style={styles.btnText}>New Address</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={newYelpRestaurants}>
                <Text style={styles.text} >Not Today?</Text>
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
    justifyContent: 'center',
    paddingTop: 10,
  },
  innercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 4,
    paddingBottom: 4,
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
    margin: 10
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
  titleText: {
    fontSize: 30,
  },
  yelpMapBtns:{
    height: 75
  },
  btnText: {
    textAlign: 'center',
    color: '#ECF6FD',
    fontSize: 18,
  },
  restContent:{
    //flex: 1,
    height:60,
    justifyContent:'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  newRerollBtn:{
    flex: 1,
    flexDirection: 'row'
  }
});

export default RestaurantInfo