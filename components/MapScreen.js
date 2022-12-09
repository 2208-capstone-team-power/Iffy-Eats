import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { arr } from './homeScreen';


const MapScreen = () => {
    console.log('hello', arr)

    const [mapRegion, setMapRegion] = useState({
        latitude: arr[6],
        longitude: arr[7],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // useEffect(() => {
    //     setTimeout(() => setMapRegion(arr), 3000);
    // });

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
