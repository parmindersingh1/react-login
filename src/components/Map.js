import React, { useContext } from 'react';
import { StyleSheet, Image, ActivityIndicator, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const Map = ({ currentLocation, locations }) => {
  //   const {
  //     state: { currentLocation, locations }
  //   } = useContext(LocationContext);

  if (!currentLocation || !locations) {
    return <ActivityIndicator size="large" style={{ marginTop: 100 }} />;
  }
  // let points = [];
  // for (let i = 0; i < 20; i++) {
  //   if (i % 2 === 0) {
  //     points.push({
  //       latitude: 30.705080 + i * 0.001,
  //       longitude: 76.762020 + i * 0.001
  //     });
  //   } else {
  //     points.push({
  //       latitude: 30.705080 - i * 0.002,
  //       longitude: 76.762020 + i * 0.001
  //     });
  //   }
  // }
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 28.429257299999998,
        longitude: 77.0326284,
        // ...currentLocation.coords,
        latitudeDelta: 0.0922, //zoomlevel
        longitudeDelta: 0.0421, //zoomlevel
      }}
    >
      <MapView.Marker
        coordinate={currentLocation.coords}
        // title={'marker.title'}
        // description={'desss'}
      />
      {locations.map(store => {
        // entry1.geoAddress.geoPoint.y, entry1.geoAddress.geoPoint.x
        return store.geoAddress && store.geoAddress.geoPoint ? (
          <MapView.Marker
            coordinate={{
              latitude: store.geoAddress.geoPoint.y,
              longitude: store.geoAddress.geoPoint.x,
            }}
            title={store.storeName}
            // image={require('../assets/map_marker.png')}
            // style={{  width: 40, height: 40 }}
          >
            <Image
              source={require('../assets/map_marker.png')}
              style={{ width: 40, height: 40 }}
            />
          </MapView.Marker>
        ) : null;
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default Map;
