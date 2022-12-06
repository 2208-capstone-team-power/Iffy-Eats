import React, { useEffect } from 'react';
import { Animated, Easing, View, StyleSheet, Text } from 'react-native';
import Lottie from 'lottie-react-native'; //LottieView
import { StatusBar } from 'expo-status-bar';
import {one} from './homeScreen'

const Object = () => {

    console.log(one)

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Our Pick for You Is...</Text>
            {one ? <Text style={styles.text}>{one}</Text> : null}
            <Lottie
                style={styles.object}
                source={require('../assets/pick-your-food.json')}
                autoPlay
            ></Lottie>
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
            justifyContent: 'center',
        },
        object: {
            width: 300,
            height: 300,
        },
        text: {
            fontSize: 24
        }
    }
)
export default Object