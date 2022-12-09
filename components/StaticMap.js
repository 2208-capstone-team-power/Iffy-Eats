import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Linking } from 'react-native';
import { arr } from './homeScreen';
//import GOOGLE_API_KEY from '@env'


const GOOGLE_API_KEY = 'AIzaSyAfW7sp9KZ4tIOtV28Ws1ku6Sk1rnpgoOs'


function staticMap() {
  console.log(arr[6], arr[7])

  const staticMapMaker = (lat, long) => {
    const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=13&size=400x200&maptype=roadmap&markers=color:green%7Clabel:S%7C${lat},${long}&key=${GOOGLE_API_KEY}`;
    return mapImageUrl;
  }

return (
    <Image source={{uri: staticMapMaker(arr[6], arr[7]) }} />
)

}
    
    
export default staticMap;

