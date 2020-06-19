import React, { memo, useContext, useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
// import MapView from 'react-native-maps';
import MyHeader from '../../components/MyHeader';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Map from '../../components/Map';
import $http from '../../service';
import { Context as LocationContext } from '../../context/LocationContext';
import { FontAwesome } from '@expo/vector-icons';

const Dashboard = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const { addCurrentLocation, addLocations } = useContext(LocationContext);

  getPermissionAsync = async () => {
    // if (Constants.platform.ios) {
    if (Constants.isDevice) {
      let { status: locationStatus } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (locationStatus !== 'granted') {
        alert('Permission to access location was denied');
      }
      _setLocation();
    }
  };

  _setLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    addCurrentLocation(location); //save to context
    getNearbyLocations(location);
  };

  getNearbyLocations = async location => {
    let response = await $http.getNearbyLocations(location.coords);
    setNearbyLocations(response.data);
    addLocations(response.data);
  };

  useEffect(() => {
    getPermissionAsync();
  }, []);

  return (
    <>
      <MyHeader navigation={navigation} title="Home" />
      <View style={styles.container}>
        <Map currentLocation={location} locations={nearbyLocations} />
      </View>
    </>
  );
};

Dashboard.navigationOptions = {
  title: 'Map',
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="map-o" size={20} color={tintColor} />
  ),
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 60,
  },
});

export default Dashboard;
