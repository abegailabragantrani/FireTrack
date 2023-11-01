import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'


export default class DashboardScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    right: 10,
    left: 3,
    height: 270,
    width: 370,
    top: 60,
  },
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FB9246',
  },
  bottom: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,

  },

}
);