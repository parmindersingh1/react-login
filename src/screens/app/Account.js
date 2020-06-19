import React, {memo, useContext } from "react";
import { StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import { Context as AuthContext } from '../../context/AuthContext';
import MyHeader from '../../components/MyHeader';
import Background from '../../components/Background';

const Account = ({ navigation }) => { 

  const { signout } = useContext(AuthContext);
  return (
    <>
      <MyHeader navigation={navigation} title="Account" />
      <Background>
        <View>
          <Button mode="contained" onPress={signout} style={styles.button}>
          Sign Out 
          </Button>
        </View>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Account);
