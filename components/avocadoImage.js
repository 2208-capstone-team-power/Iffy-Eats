import React, { useEffect } from 'react';
import { Animated, Easing, View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native'; //LottieView
import { StatusBar } from 'expo-status-bar';

const AvocadoImage = () => {

    return (
        <View style={styles.container}>
            <LottieView
                style={styles.object}
                source={require('../assets/63272-avocado.json')}
                autoPlay
            ></LottieView>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'space around',
        },
        object: {
            width: 350,
            height: 350,
        },
        text: {
            fontSize: 24
        }
    }
)
export default AvocadoImage