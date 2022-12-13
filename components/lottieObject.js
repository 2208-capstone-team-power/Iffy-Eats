import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Lottie from 'lottie-react-native';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

const Object = () => {

    const [fontsLoaded] = useFonts({
        'BalsamiqSans-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
        'BalsamiqSans-BoldItalic': require('../assets/fonts/BalsamiqSans-BoldItalic.ttf'),
        'BalsamiqSans-Italic': require('../assets/fonts/BalsamiqSans-Italic.ttf'),
        'CaveatBrush-Regular': require('../assets/fonts/CaveatBrush-Regular.ttf'),
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
        'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf')
    })

    useEffect(() => {
        const prepare = async () => {
            await SplashScreen.preventAutoHideAsync();
        }
        prepare();
    }, [])

    if (!fontsLoaded) {
        return undefined
    } else {
        SplashScreen.hideAsync();
    }
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
        marginTop: -300,
    },
    innerContainer: {
        height: 100
    },
    object: {
        width: 500,
        height: 500,
    },
    text: {
        fontSize: 48,
        paddingBottom: 20,
        fontFamily:'CaveatBrush-Regular',
        color:'#7824A8',
    }
}
)
export default Object
