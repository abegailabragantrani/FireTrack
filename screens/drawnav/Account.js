import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { getStorage } from '../../lib/TokenHandler';

export default function Account(props) {
  const [user, setUser] = React.useState();
 

  React.useEffect(()=>{

     const handleGetUser = async () => {
        try {
            setUser(JSON.parse(await getStorage('user')))
        } catch (error) {
          throw error
        }
    }
    handleGetUser();

  },[])
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 18, bottom: 170 }}>Profile</Text>
      <View style={styles.top} />

      <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 135, }}>
        <Image style={styles.image}
          source={{uri: user?.image}} 
        />
        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 18, bottom: 40 }}>{user?.name}</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={{ width: 200, height: 50, backgroundColor: '#171F1D', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text>
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
    height: 240,
    width: 180,
    bottom: 55
  },
}
);