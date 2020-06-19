import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload };
    case 'add_locations':
      return { ...state, locations: [...action.payload] };
    case 'reset':
      return { ...state, name: '', locations: [] };
    default:
      return state;
  }
};

const addCurrentLocation = dispatch => location => {
  dispatch({ type: 'add_current_location', payload: location });
};

const addLocations = dispatch => locations => {
  dispatch({ type: 'add_locations', payload: locations });
};

const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { addCurrentLocation, addLocations, reset },
  { currentLocation: null, locations: [] }
);
