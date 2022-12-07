import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Linking } from 'react-native';
import { arr } from './homeScreen'
import { Object, PickedImage } from './allComponents'

function RestaurantInfo() {
  
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => setShow(true), 3000)
  })

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
          <View style={styles.innercontainer}>
          <PickedImage />
          </View>
          <View style={styles.container}>
          <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
          onPress={()=>Linking.openURL(arr[5])}>
          <Text style={styles.btnText}>Link To Yelp Page</Text> 
          </Pressable>
        </View>
      </View>
      : <Object /> }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:10,
  },
  innercontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:2,
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