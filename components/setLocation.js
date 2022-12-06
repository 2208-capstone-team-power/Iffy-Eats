import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { arr } from './homeScreen'
import {Object} from './allComponents'

function SetLocation({navigation}) {
    // const onPressHandler = () => {
    //   navigation.navigate('Iffy Eats')
    // }
    const [show, setShow] = useState(false)
    useEffect(() => {
      setTimeout(() => setShow(true), 3000)
    })
    return (
      <View style={styles.container}>
      {show ?<Text>{ arr[0]} { arr[1] } { arr[2] } { arr[3] } { arr[4] } { arr[5] }</Text> : <Object /> }
    </View>
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
  

export default SetLocation