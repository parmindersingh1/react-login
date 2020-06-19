import API from './../api';

export default {
  getNearbyLocations: async coords => {
    try {
      return await API.get(
        '/data/customers/nearByStoresEveryOne?x=' +
          coords.longitude +
          '&y=' +
          coords.latitude
      );
    } catch (err) {
      console.log(err);
    }
  },
};
