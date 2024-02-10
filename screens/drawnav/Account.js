import * as React from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { getStorage } from '../../lib/TokenHandler';
import apiService from '../../api/config';

export default function Account(props) {
  const [user, setUser] = React.useState();
  const [changePassMode, setChangePassMode] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirm_password, setConfirmPassword] = React.useState('');
  const [current_password, setCurrentPassword] = React.useState('');
  const [error, setError] = React.useState(null);

   const handleChangePassword = async () => { 
        if(password !== confirm_password){
            setPassword('');
            setConfirmPassword('');
            alert('Password does not match')
        }
        const payload = { 
            password, 
            current_password,
            id:user.id, 
        };

        try {
             await apiService.post('/change-pass', payload );
             alert('Password changed successfully');
             setError(null);
        } catch (error) {
            if (error.response.data.msg) {
                setError(error.response.data.msg);
            }
            console.log(error.response);
            
        }
       
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword('');
        
    }
 

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
      <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 18, bottom: 100 }}>Profile</Text>
      <View style={styles.top} />

      <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 135, }}>
        <Image style={styles.image}
          source={{uri: user?.image}} 
        />
        <Text style={{ textAlign: 'center', color: '#000000', fontSize: 18, bottom: 40 }}>{user?.name}</Text>
        {!changePassMode?
        <>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={{ width: 200, height: 50, backgroundColor: '#171F1D', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
        >
          <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setChangePassMode(true)}
          style={{ width: 200, height: 50, backgroundColor: '#171F1D', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
        >
         <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Change password</Text>
            </TouchableOpacity>
          </>
          :
          <View style={{bottom: 50, textAlign: 'center' }}>
            <Image style={styles.image}
              source={require('../drawnav/changepassacc.png')} />
            <TextInput
              placeholder='Current Password'
              style={styles.fields}
              onChangeText={(text) => setCurrentPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              placeholder='New Password'
              style={styles.fields}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
            <TextInput
              placeholder='Confirm New Password'
              style={styles.fields}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry={true}
            />
            {error &&
              <Text style={{ color: 'red', textAlign: 'center', top: -60 }}>
                {error}
              </Text>
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '50%' }}>
              <View style={{ width: '30%' }}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setChangePassMode(false)
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '30%' }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleChangePassword()
                  }}
                >
                  <Text style={styles.buttonText}>Click me</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }

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
    height: 350,
    width: 300,
    bottom: 80,
    left: 10
  },
  fields: {
    height: 45,
    width: 300,
    margin: 6,
    paddingHorizontal: 40,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#d3d3d3d3',
    bottom: 55,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
      color: 'white',
      fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
},
cancelButtonText: {
    color: 'white',
    fontSize: 16,
},
}
);