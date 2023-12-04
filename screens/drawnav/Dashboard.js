import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation();
  return (
    
    <View style={styles.container}>
      <Image style={styles.image}
        source={require('../drawnav/1.png')} />

      <View style={styles.top} />

      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Report')}
        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
      >
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Report Fire Incident</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Incident')}
        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
      >
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>View Incident Status</Text>
      </TouchableOpacity>
      </View>
    </View>


  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB9246',
  },
  top: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
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
    height: 270,
    width: 400,
    bottom: 100, 
  },
}
);