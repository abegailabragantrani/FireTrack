import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'

export default function Account() {
  return (
    <View style={styles.container}>

      <View style={styles.top} />
      <View style={styles.bottom} />
      <Image style={styles.image}
                 source={require('./drawnav/user.png')} />

      <Text style={{textAlign: 'center', bottom: 320, color: 'white', fontWeight: 'bold', fontSize: 18  }}>Profile</Text>
    </View>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  bottom: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '10%',
    backgroundColor: '#FB9246',
  },
  
  fields: {
    height: 50,
    width: 300,
    top: 31,
    margin: 15,
    paddingHorizontal: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#d3d3d3d3',

  },
  image: {
    right: 10,
    left: 25,
    height: 350,
    width: 550,
    bottom: 140,
    
  },
}
);