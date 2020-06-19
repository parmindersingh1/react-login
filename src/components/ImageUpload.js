import React, { memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { theme } from '../core/theme';

const ImageUpload = props => {
  console.log(props.imageUrl);
  return (
    <>
      <TouchableOpacity onPress={props.pickImage}>
        <View style={styles.imageContainer}>
          {props.imageUrl ? (
            <Image source={props.imageUrl} style={styles.image} />
          ) :  <Image source={require("./../assets/logo.png")} style={styles.image} />}
        </View>
      </TouchableOpacity>
      <Text style={{ textAlign: 'center', marginTop: 10, color: theme.colors.secondary, }}>Click Image to upload image</Text>
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 128,
    height: 128,
    borderRadius: 64,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 128,
    height: 128,
    marginBottom: 12,
  },
});

export default memo(ImageUpload);
