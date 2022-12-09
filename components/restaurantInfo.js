import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Linking, Image } from 'react-native';
import { arr } from './homeScreen'
import { Object, PotatoImage } from './allComponents'
//import { staticMap } from './StaticMap'
//import { YELP_API_KEY } from '@env'


function RestaurantInfo({ navigation }) {

  const [show, setShow] = useState(false)
  const [map, setMap] = useState('')



  
  
  useEffect(() => {
    setTimeout(() => setShow(true), 3000)
  })

   const GOOGLE_API_KEY = 'AIzaSyAfW7sp9KZ4tIOtV28Ws1ku6Sk1rnpgoOs'
   console.log(arr[6], arr[7])

   
   const mapImageUrl = ''

    const staticMapMaker = (lat, long) => {
      let mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
      console.log(mapImageUrl)
      return(mapImageUrl)
    }

   
      staticMapMaker(arr[6], arr[7])
      
    
     
    
    console.log(mapImageUrl)
  return (


    <View style={styles.container}>
      {show ?
        <View style={styles.innercontainer}>
          <Text>Food Of the Day</Text>
          <View style={styles.innercontainer}>
            <Text>{arr[0]}</Text>
            <Text>{arr[1]}</Text>
            <Text>{arr[2]}</Text>
            <Text>{arr[3]}</Text>
            <Text>{arr[4]}</Text>
          </View>
           <View styles={styles.container}>
           <Image source={{mapImageUrl}} /> 
           </View>
          <View style={styles.innercontainer}>
            <PotatoImage />
          </View>
          <View style={styles.container}>
            <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => Linking.openURL(arr[5])}>
              <Text style={styles.btnText}>Link To Yelp Page</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
              onPress={() => navigation.navigate('New Location')}
            >
              <Text style={styles.btnText}>Enter A New Address</Text>
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