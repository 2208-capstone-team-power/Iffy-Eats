import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, Pressable, TextInput, Linking } from 'react-native';
import * as Location from 'expo-location';
import { AvocadoImage } from "./allComponents"
import { YELP_API_KEY } from '@env'

function NewLocation() {

    const [newAddress, setNewAddress] = useState('')
    const [oneRestaurant, setOneRestaurant] = useState([])

    const radius = '8000'

    const newYelpLocation = async () => {

        if (newAddress) {
            const yelpUrl = `https://api.yelp.com/v3/businesses/search?location=${newAddress}&term=food, restaurants&radius=${radius}`
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
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                keyboardType={'default'}
                placeholder={'Enter Address'}
                value={newAddress}
                onChangeText={(e) => setNewAddress(e)}>
            </TextInput>
            <Pressable
                style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
                onPress={newYelpLocation}
            >
                <Text style={styles.btnText}>Submit</Text>
            </Pressable>
            <View>
                <Text style={styles.text}>{oneRestaurant[0]}</Text>
                <Text style={styles.text}>{oneRestaurant[1]}</Text>
                <Text style={styles.text}>{oneRestaurant[2]}</Text>
                <Text style={styles.text}>{oneRestaurant[3]}</Text>
                <Text style={styles.text}>{oneRestaurant[4]}</Text>
            </View>
            {oneRestaurant.length ? <AvocadoImage /> : null}
            {oneRestaurant.length ?
                <Pressable style={({ pressed }) => [({ backgroundColor: pressed ? 'purple' : 'hotpink' }), styles.wrapperCustom]}
                    onPress={() => Linking.openURL(oneRestaurant[5])}>
                    <Text style={styles.text}>Link To Yelp Page</Text>
                </Pressable> : null}

        </View>
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
    innercontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 2,
    },
    img: {
        height: 300,
        width: 300,
        margin: 10
    },
    input: {
        borderWidth: 3,
        borderColor: "chartreuse",
        fontSize: 30
    },
    text: {
        margin: 10
    },
    button: {
        margin: 10,
        padding: 10
    },
    wrapperCustom: {
        borderRadius: 8,
        padding: 6,
        margin: 10,
        width: 150,
        textAlign: 'center',
        alignSelf: 'center',
    },
});


export default NewLocation