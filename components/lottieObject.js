import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Lottie from 'lottie-react-native';

const Object = () => {

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Text style={styles.text}>Your Surprise Awaits</Text>
            </View>
            <Lottie
                style={styles.object}
                source={require('../assets/pick-your-food.json')}
                autoPlay>
            </Lottie>
        </View>
    )
}

const styles = StyleSheet.create({
        container: {
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:-250,
        },
        innerContainer:{
            height:100
        },
        object: {
            width: 500,
            height: 500,
        },
        text: {
            fontSize: 24,
            paddingBottom: 20,
        }}
)
export default Object
