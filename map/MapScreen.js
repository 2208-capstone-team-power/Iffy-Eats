import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

function getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
};
  
function onRegionChange(region) {
    this.setState({ region });
};

render() {
    return (
        <MapView
            region={this.state.region}
            onRegionChange={this.onRegionChange}
        >
            {this.state.markers.map((marker, index) => (
            <Marker
                key={index}
                coordinate={{ latitude : latitude , longitude : longitude }}
                image={{uri: ''}}
            />
            ))}
        </MapView>
    );
}