import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { restaurantInfoArr } from './homeScreen';
import * as Location from 'expo-location';


const MapScreen = () => {
    // const [userlocation, setUserLocation] = useState(null);
    const [mapRegion, setMapRegion] = useState({
        latitude: restaurantInfoArr[6],
        longitude: restaurantInfoArr[7],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // useEffect(() => {
    //     let loc = Location.getCurrentPositionAsync({});
    //     console.log(loc + 'on map')
    //     setUserLocation(loc);
    // }, []);

    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={mapRegion}
            >
                <Marker coordinate={mapRegion} title='Marker' />
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
