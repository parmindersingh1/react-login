import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import API from './../api';
import { navigate } from './../navigationRef';

import { decode, encode } from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', loginUser: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { loginUser: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'clear_error_message' });
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await API.post('/signup', {
      email,
      password,
    });

    await AsyncStorage.setItem('loginUser', response.data.principal.user);
    dispatch({ type: 'signin', payload: response.data.principal.user });

    navigate('Dashboard');
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const tryLocalSignin = dispatch => async () => {
  // const loginUser = await AsyncStorage.getItem('loginUser');

  // if (loginUser) {
  //   dispatch({ type: 'sigin', payload: loginUser });
  //   navigate('Dashboard');
  // } else {
  //   navigate('Login');
  // }

  try {
    const response = await API.get('/user');

    await AsyncStorage.setItem(
      'loginUser',
      JSON.stringify(response.data.principal.user)
    );
    dispatch({
      type: 'signin',
      payload: response.data.principal.user,
    });

    navigate('Dashboard');
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: 'add_error',
    //   payload: 'Session expired',
    // });
    navigate('Login');
  }
};

const signin = dispatch => async ({ mobile, password }) => {
  try {
    const response = await API.get('/user', {
      headers: {
        authorization: 'Basic ' + btoa(mobile + ':' + password),
      },
    });

    console.log('response', response.data.principal.user);

    await AsyncStorage.setItem(
      'loginUser',
      JSON.stringify(response.data.principal.user)
    );
    dispatch({
      type: 'signin',
      payload: response.data.principal.user,
    });

    navigate('Dashboard');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = dispatch => async () => {
  try {
    await API.post('/logout', {});
    await AsyncStorage.removeItem('loginUser');
    dispatch({ type: 'signout' });

    navigate('Home');
  } catch (err) {
    console.log(err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with logout',
    });
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { loginUser: null, errorMessage: '' }
);
