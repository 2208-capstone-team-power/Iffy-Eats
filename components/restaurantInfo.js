import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Linking, Image } from 'react-native';
import { restaurantInfoArr } from './homeScreen'
import { Object, PotatoImage } from './allComponents'
import { YELP_API_KEY, GOOGLE_API_KEY } from '@env'

function RestaurantInfo({ navigation }) {

  const [show, setShow] = useState(false)
  const [renderedRest, setrenderedRest] = useState(restaurantInfoArr)
  const [map, setMap] = useState('')


  useEffect(() => {
    if (renderedRest.length===0){
      return;
    } else {
      setMap({
      lat: renderedRest[6],
      long: renderedRest[7],
    })
    }
    staticMapMaker(map.lat, map.long)
  }, [])

  
  useEffect(() => {
    setTimeout(() => setShow(true), 3000)
  })

    const staticMapMaker = (lat, long) => {
      let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
      console.log(mapImageUrl)
      return(mapImageUrl)
    }

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
          console.log(oneFoodPlace)
          newRestaurantInfoArr = []
          console.log(foodPlace[oneFoodPlace])
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].name)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.address1)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.city)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.state)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].location.zip_code)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].url)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.latitude)
          newRestaurantInfoArr.push(foodPlace[oneFoodPlace].coordinates.longitude)
          console.log('This is the rerendered one' + newRestaurantInfoArr);
          setrenderedRest(newRestaurantInfoArr)
          return renderedRest
        }
        )
    }
  }
  console.log(renderedRest)
  return (


    <View style={styles.container}>
      {show ?
        <View style={styles.innercontainer}>
          <Text>Food Of the Day</Text>
          <View style={styles.innercontainer}>
            <Text>{renderedRest[0]}</Text>
            <Text>{renderedRest[1]}</Text>
            <Text>{renderedRest[2]}</Text>
            <Text>{renderedRest[3]}</Text>
            <Text>{renderedRest[4]}</Text>
          </View>
           <View styles={styles.container}>
           <Image 
              style = {{width:400, height:200}}
              source={{uri: staticMapMaker(map.lat, map.long)
              }} /> 
           </View>
          <View style={styles.innercontainer}>
            <PotatoImage />
          </View>
          <View style={styles.container}>
            <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => Linking.openURL(renderedRest[5])}>
              <Text style={styles.btnText}>Link To Yelp Page</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => navigation.navigate('New Location')}
            >
              <Text style={styles.btnText}>Enter A New Address</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={newYelpRestaurants}
            >
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
    paddingTop: 2,
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
});


export default RestaurantInfo