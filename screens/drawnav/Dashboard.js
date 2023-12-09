import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native'
import apiService from '../../api/config'
import { removeCreds } from '../../lib/TokenHandler'

 const  DashboardScreen = (props) => {
    React.useEffect(()=>{
      const getUser = async () => {
        try {
          const request = await apiService.get('/user');
          return request;
        } catch (error) {
          if (error.response.status===401) {
           await removeCreds()
          }
           
        }
      }
      getUser();
    },[])
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.top} />
        <View style={styles.bottom} />

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Report')}
          style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Report Fire Incident</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate('Incident')}
          style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>View Incident Status</Text>
        </TouchableOpacity>
        
        
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