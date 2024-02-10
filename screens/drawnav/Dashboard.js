import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../../api/config'
import { removeCreds } from '../../lib/TokenHandler'
import { AuthContext } from '../../context/Auth'

const DashboardScreen = (props) => {
  const { state } = React.useContext(AuthContext)
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const request = await apiService.get('/user');
        return request;
      } catch (error) {
        if (error.response.status === 401) {
          await removeCreds()
        }

      }
    }
    getUser();
  }, [])
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={styles.image}
        source={require('../drawnav/dashback.png')} />

      <View style={styles.page}>

        {state?.user?.user_type !== 'admin' &&
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Report')}
            style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
          >
            <Icon name="note" size={20} style={{ position: 'absolute', bottom: 15, left: 10, color: '#ffffff' }} />
            <Text style={{ textAlign: 'center', color: '#ffffff', left: 8, fontWeight: 'bold', fontSize: 16 }}>Report Fire Incident</Text>
          </TouchableOpacity>
        }

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Incident')}
          style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
        >
          <Icon name="layers" size={20} style={{ position: 'absolute', bottom: 15, left: 10, color: '#ffffff' }} />
          <Text style={{ textAlign: 'center', color: '#ffffff', left: 8, fontWeight: 'bold', fontSize: 16 }}>View Incident Status</Text>
        </TouchableOpacity>

      </View>

    </View>
  )

}

export default DashboardScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 910,
    width: 450,
    top: 80
  },
  page: {
    bottom: 280
  }
}
);