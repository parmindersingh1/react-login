import React, { memo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dialog, Portal, Text, Button, Provider } from 'react-native-paper';
import { theme } from '../core/theme';

const CustomDialog = ({ children, title, visible, showDialog, hideDialog }) => {
  
  return (
    <View>
       <Portal>
          <Dialog
             visible={visible}
             onDismiss={hideDialog}>
            <Dialog.Title style={{ textAlign: "center" }}>{title}</Dialog.Title>
            <Dialog.Content>
              {children}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export default memo(CustomDialog);

