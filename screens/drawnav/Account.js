import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'

export default function Account() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('../drawnav/user.png')} />
        <Text>Profile</Text>

      <View style={styles.top} />
    </View>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB9246'
  },
  top: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  
  image: {
    right: 10,
    left: 25,
    height: 100,
    width: 550,
    bottom: 100
  },
}
);