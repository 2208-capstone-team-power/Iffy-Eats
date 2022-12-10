import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const PotatoImage = () => {

    return (
        <View style={styles.container}>
            <LottieView
                style={styles.object}
                source={require('../assets/122031-potato.json')}
                autoPlay>
            </LottieView>
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

export default PotatoImage