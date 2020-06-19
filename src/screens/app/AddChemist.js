import React, { memo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import BackButton from '../../components/BackButton';
import { theme } from '../../core/theme';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../../core/utils';
import ImageUpload from '../../components/ImageUpload';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import CustomDialog from '../../components/CustomDialog';
import MyHeader from '../../components/MyHeader';

const AddChemist = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);
  const [visible, setVisible] = useState(false);

  console.log('location', location);

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

      const { status: cameraRollStatus } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      if (cameraRollStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      const { status: cameraStatus } = await Permissions.askAsync(
        Permissions.CAMERA
      );
      if (cameraStatus !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    }
  };

  _setLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };

  _pickImage = async () => {
    console.log('clicked');
    setVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  _clickImage = async () => {
    console.log('clicked');
    setVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({ uri: result.uri });
    }
  };

  _showDialog = () => setVisible(true);
  _hideDialog = () => setVisible(false);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };

  return (
    <>
      <MyHeader navigation={navigation} title="Add Chemist" />
      <Background>
        {/* <BackButton goBack={() => navigation.navigate('Home')} /> */}

        <ImageUpload imageUrl={image} pickImage={_showDialog} />

        <Header>Create Account</Header>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Sign Up
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        <CustomDialog
          title="Select Option"
          visible={visible}
          showDialog={_showDialog}
          hideDialog={_hideDialog}
        >
          <View>
            <Button
              mode="contained"
              style={styles.button}
              onPress={_clickImage}
            >
              Take Photo
            </Button>
            <Button mode="contained" style={styles.button} onPress={_pickImage}>
              Pick From Gallery
            </Button>
          </View>
        </CustomDialog>
      </Background>
    </>
  );
};

AddChemist.navigationOptions = {
  drawerLabel: 'B',
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(AddChemist);
