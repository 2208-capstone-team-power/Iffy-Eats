import React from 'react';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import GooglePlacesInput from './Placeview';

function SetLocation({navigation}) {
    const onPressHandler = () => {
      navigation.navigate('Object')
    }
    return (
      <View style={styles.container}>
          <TextInput
        style={styles.input}
        placeholder='Zip Code'
        placeholderTextColor='darkslateblue'
        selectionColor='lavender'
        keyboardType='numeric'
        maxLength={5}
        />
        <Pressable
        style={({pressed})=>[({backgroundColor: pressed ? 'purple':'hotpink'}), styles.wrapperCustom]}
        onPress={onPressHandler}
        >
        <Text>Animate Object</Text>
      </Pressable>
      <GooglePlacesInput/>
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
      padding: 6
    }
  });
  

export default SetLocation