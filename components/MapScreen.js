import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
import { Marker } from 'react-native-maps';
import { StyleSheet, Pressable, Text, View } from 'react-native';
import { restaurantInfoArr, addressArray } from './homeScreen';
import * as Location from 'expo-location';
// import { GOOGLE_API_KEY } from '.env';



const MapScreen = () => {
    const [userLocation, setUserLocation] = useState(null);

    console.log("LOOK HERE" + addressArray)

    const [mapRegion] = useState({
        latitude: restaurantInfoArr[6],
        longitude: restaurantInfoArr[7],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        (async () => {
           let { status } = await Location.requestForegroundPermissionsAsync();
           if (status !== 'granted') {
             setErrorMsg('Permission to access location was denied');
             return;
           }
       
           let location = await Location.getCurrentPositionAsync({});
           setUserLocation(location);
        })();
    }, []);
       
    let text = 'Waiting..';
       
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //    text = JSON.stringify(location);
    // };
       
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={mapRegion}
                showUserLocation={true}
                followUserLocation={true}
            >
                <Marker 
                    coordinate={mapRegion} 
                    title={restaurantInfoArr[0]} 
                />
                <Marker
                    coordinate={addressArray}
                    title={'You'} 
                />


            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
});

export default MapScreen;
