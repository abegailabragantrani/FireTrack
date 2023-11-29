import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {TouchableOpacity } from 'react-native-gesture-handler'


export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('../drawnav/1.png')} />

      <View style={styles.top} />
      <View style={styles.bottom} />

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Report')}
        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
      >
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Report Fire Incident</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Incident')}
        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
      >
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>View Incident Status</Text>
      </TouchableOpacity>
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
    top: 300,
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
    bottom: 0,
    
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
    left: 3,
    height: 270,
    width: 370,
    bottom: 40,
  },

}
);