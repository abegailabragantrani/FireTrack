import React from 'react';
import { View, StyleSheet} from 'react-native';
import { DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer';

const DrawerNav = props => {
    return (
        <View style={styles.container}>
              <View style={styles.top} />
              <View style={styles.bottom} />
        
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 110,
    },
    top: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: '95%',
      backgroundColor: '#FB9246',
    },
    bottom: {
      position: 'absolute',
      top: 10,
      left: 0,
      right: 0,
      top: '10%',
      backgroundColor: '#FFFFFF',
    },
   });

export default DrawerNav;