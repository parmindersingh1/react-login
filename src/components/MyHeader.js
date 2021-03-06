import React from 'react';
import { Header } from 'react-native-elements';

import HamburgerMenu from './HamburgerMenu';
import { theme } from '../core/theme';

const MyHeader = props => {
  return (
    <Header
      leftComponent={<HamburgerMenu navigation={props.navigation} />}
      centerComponent={{
        text: props.title,
        style: { color: '#fff', fontWeight: 'bold' },
      }}
      statusBarProps={{ barStyle: 'light-content' }}
      containerStyle={{
        backgroundColor: theme.colors.primary,
        justifyContent: 'space-around',
      }}
    />
  );
};

export default MyHeader;
