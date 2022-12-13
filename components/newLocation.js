import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Linking } from 'react-native';
import AvocadoImage from "./avocadoImage.js"
import { YELP_API_KEY } from '@env'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function NewLocation() {

    const [newAddress, setNewAddress] = useState('')
    const [oneRestaurant, setOneRestaurant] = useState([])

    const radius = '8000'

    const newYelpLocation = async () => {
        try {
            if (newAddress) {
                const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${newAddress}&term=food, restaurants&radius=${radius}&limit=50`
                const apiOptions = {
                    headers: {
                        Authorization: `Bearer ${YELP_API_KEY}`,
                    },
                }
                const allResturantData = await fetch(yelpUrl, apiOptions)
                const json = await allResturantData.json()
                const foodPlace = (json.businesses)
                let oneFoodPlace = Math.floor(Math.random(foodPlace) * foodPlace.length)
                let arr2 = []
                arr2.push(foodPlace[oneFoodPlace].name)
                arr2.push(foodPlace[oneFoodPlace].location.address1)
                arr2.push(foodPlace[oneFoodPlace].location.city)
                arr2.push(foodPlace[oneFoodPlace].location.state)
                arr2.push(foodPlace[oneFoodPlace].location.zip_code)
                arr2.push(foodPlace[oneFoodPlace].url)
                setOneRestaurant(arr2)
                return oneRestaurant
            }
        } catch {
            alert('Please Enter A Valid Address')
        }
    }
    const [fontsLoaded] = useFonts({
        'BalsamiqSans-Bold': require('../assets/fonts/BalsamiqSans-Bold.ttf'),
        'BalsamiqSans-BoldItalic': require('../assets/fonts/BalsamiqSans-BoldItalic.ttf'),
        'BalsamiqSans-Italic': require('../assets/fonts/BalsamiqSans-Italic.ttf'),
        'CaveatBrush-Regular': require('../assets/fonts/CaveatBrush-Regular.ttf'),
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
        'TitanOne-Regular': require('../assets/fonts/TitanOne-Regular.ttf'),
        'Mansalva-Regular': require('../assets/fonts/Mansalva-Regular.ttf')
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
        <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', backgroundColor: '#fffff9', }}>
        <View style={styles.container}>
            <Text style={styles.title}>Where Next?</Text>
            <TextInput
                style={styles.input}
                keyboardType={'default'}
                placeholder={'Enter Address'}
                value={newAddress}
                onChangeText={(e) => setNewAddress(e)}>
            </TextInput>
            <Pressable
                style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#2395E7' }), styles.wrapperCustom]}
                onPress={newYelpLocation}>
                <Text style={styles.btnText}>Next Eatery</Text>
            </Pressable>
            {oneRestaurant.length ? <View style={styles.restContent}>
                <Text style={styles.name}>{oneRestaurant[0]}</Text>
                <Text style={styles.text}>{oneRestaurant[1]}</Text>
                <Text style={styles.text}>{oneRestaurant[2]}, {oneRestaurant[3]}</Text>
                <Text style={styles.text}>{oneRestaurant[4]}</Text>
            </View>: null}
            {oneRestaurant.length ? <AvocadoImage /> : null}
            {oneRestaurant.length ?
                <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : '#2395E7' }), styles.wrapperCustom]}
                    onPress={() => Linking.openURL(oneRestaurant[5])}>
                    <Text style={styles.btnText}>View On Yelp</Text>
                </Pressable> : null}
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    title: {
        fontSize: 50,
        textColor: 'black',
        textAlign: 'center',
        height: 125,
        paddingTop: 30,
        alignContent: 'center',
        fontFamily: 'CaveatBrush-Regular',
        color: '#7824A8',
    },
    innercontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2,
    },
    img: {
        height: 275,
        width: 300,
    },
    input: {
        borderWidth: 3,
        borderColor: '#B6F7EB',
        borderRadius: 10,
        height: 40,
        width: 275,
        fontSize: 18,
        backgroundColor: '#DAEDFB'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Pacifico-Regular',
        color: '#FFC2C7'
    },
    wrapperCustom: {
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 25,
        width: 150,
        alignSelf: 'center',
        height: 30,
        justifyContent: 'center'
    },
    name: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'TitanOne-Regular',
        color: '#FF858F'
    },
    btnText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
    },
    restContent: {
        height: 190,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        borderWidth: 5,
        borderStyle: 'dashed',
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
});

export default NewLocation