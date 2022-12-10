import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Lottie from 'lottie-react-native';

const Object = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your Surprise Awaits</Text>
            <Lottie
                style={styles.object}
                source={require('../assets/pick-your-food.json')}
                autoPlay>
            </Lottie>
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



