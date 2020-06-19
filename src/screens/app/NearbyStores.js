import React, { memo, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
// import MapView from 'react-native-maps';
import MyHeader from '../../components/MyHeader';
import { SafeAreaView } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';
import { Context as LocationContext } from '../../context/LocationContext';
import Background from '../../components/Background';

const NearbyStores = ({ navigation }) => {
  const {
    state: { locations },
  } = useContext(LocationContext);
  console.log('locas', locations[0]);
  //   let icon = require('./../../assets/icon.png');
  return (
    <>
      <MyHeader navigation={navigation} title="Nearby Stores" />

      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('pressed');
              }}
            >
              <ListItem
                style={styles.listStyle}
                chevron={true}
                title={item.storeName}
                leftAvatar={{ source: require('./../../assets/icon.png') }}
                titleStyle={styles.titleStyle}
                subtitle={
                  <View style={styles.subtitleContainer}>
                    <View style={styles.subtitleView}>
                      {/* <Image
                      source={require('../images/rating.png')}
                      style={styles.ratingImage}
                    /> */}
                      <FontAwesome
                        name="mobile-phone"
                        size={20}
                        style={{ alignSelf: 'center' }}
                      />
                      <Text style={styles.ratingText}>
                        {item.storeMobileNumber}
                      </Text>
                    </View>
                    <View style={styles.subtitleView}>
                      <FontAwesome
                        name="map-marker"
                        size={20}
                        style={{ alignSelf: 'center' }}
                      />
                      <Text style={styles.ratingText}>
                        {item.address.locality}
                      </Text>
                    </View>
                  </View>
                }
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

NearbyStores.navigationOptions = {
  title: 'Nearby Stores',
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome name="list" size={20} color={tintColor} />
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  listStyle: { borderBottomWidth: 1, borderColor: '#ccc' },
  subtitleContainer: {},
  titleStyle: { fontWeight: 'bold' },
  subtitleView: {
    flexDirection: 'row',
    // paddingLeft: 10,
    paddingTop: 5,
    alignItems: 'flex-end',
    // justifyContent: 'center',
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default NearbyStores;
