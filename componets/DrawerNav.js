import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';

const DrawerNav = props => {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('../assets/images/dashboard.jpg')} />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    height: 200,
    width: undefined,
  },
});

export default DrawerNav;