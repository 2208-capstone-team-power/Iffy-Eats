import react, { Component } from "react";
import { GOOGLE_API_KEY } from "@env";
import {
  FlatList,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { ListItem, Text } from "react-native-elements";
import { Container, Content } from "native-base";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  console.log("autocomplete", GOOGLE_API_KEY);

/**
  handleRestaurantSearch = () => {
    const url  = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = '&radius=500';
    const type = '&keyword=restaurant';
    const key = '&key=GOOGLE_API_KEY';
    const restaurantSearchUrl = url + location + radius + type + key;
    fetch(restaurantSearchUrl)
      .then(response => response.json())
      .then(result => this.setState({restaurantList: result}))
      .catch( e => console.log(e))
  }  */

  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        styles={{
          container: {
            flex:0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        placeholder="Address: 488 NE 18th St"
        onPress={(data, details = null) => {
          //details is provided when fetch Details = true
          console.log(data, details);
        }}
        //currentLocation={true}
        //currentLocationLabel="Your location!" // add a simple label
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
        }}
        requestUrl={{
          useOnPlatform: 'web', // or "all"
          url:
          '/https://maps.googleapis.com/maps/api/place/autocomplete/output?parameters',
        }}
      />
    </SafeAreaView>
  );
};

export default GooglePlacesInput;

/**
   * 
   * 
   * 
   * 
   *   const PlaceList = () => {
    return (
      <FlatList 
      data= {data}
      horizontal
      renderItem={({restaurant}) => {
        <TouchableOpacity>
          
        </TouchableOpacity> 
      }  }
      />
    )
  }

  
  export default PlaceList;
   * class PlaceList extends Component {
    render() {
      const { places } = this.props;
      const baseImage =
        "https://images.unsplash.com/photo-1552334405-4929565998d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
      return (
        <Container style={styles.container2}>
          <Content>
            {places.length <= 0 && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
              </View>
            )}
            {places.length > 0 && (
              <FlatList
                data={places}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <ListItem
                      key={item.id}
                      title={
                        <View style={styles.rowDirection}>
                          <Text>{item.name}</Text>
                          <Text>1.4km</Text>
                        </View>
                      }
                      subtitle={
                        item.rating && (
                          <View>
                            <View style={styles.startReviewsContainer}>
                              <RenderStarReview stars={item.rating} />
                              <Text>{item.rating.toFixed(1)}</Text>
                            </View>
                            <View>
                              <Text>{item.vicinity}</Text>
                            </View>
                          </View>
                        )
                      }
                      leftAvatar={{
                        rounded: false,
                        size: "large",
                        source: item.photos && {
                          uri:
                            item.photos.length > 0
                              ? `https://maps.googleapis.com/maps/api/place/photo?photoreference=${item.photos[0].photo_reference}&sensor=false&maxheight=${item.photos[0].height}&maxwidth=${item.photos[0].width}&key=${GOOGLE_API_KEY}`
                              : baseImage
                        }
                      }}
                      bottomDivider
                      chevron={{ color: "#e90000", size: 30 }}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}
              />
            )}
          </Content>
        </Container>
      );
    }
  }
   */
