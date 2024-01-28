import * as React from 'react'
import { View, Text, TextInput, StyleSheet, Image, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import * as ImagePicker from 'expo-image-picker';
import { getStorage } from '../lib/TokenHandler';
import apiService from '../api/config';
import { setStorage } from '../lib/TokenHandler';



const ProfileScreen = (props) => {
     const [image, setImage] = React.useState(null);
     const [user, setUser] = React.useState();
     const [blobimg, setBlobImage] = React.useState();
   
 

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64:true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
    if (!result.canceled) {
      setUser({...user,
        image:'data:image/png;base64,'+result?.assets[0].base64});

    }
  };

  const handleUpdate = async () => {
    try {
      console.log(user);
       const res =  await apiService.post('/update-user',user, {
      'Accept': 'application/json',
    });
     await setStorage('user', JSON.stringify(res.data));
     console.log(res.data.image);
      // 
      props.navigation.reset({
              index: 0,
              routes: [{name: 'My Account'}],
            });
            props.navigation.navigate('My Account')
    } catch (error) {
    }
   
  }
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 18, bottom: 170 }}>Profile</Text>
        <View style={styles.top} />

          <Image style={styles.image}
            source={{uri: user?.image?.includes('http://')? user?.image + '?' + new Date().getTime(): user?.image}} 
            
          />
          <Button
            title="Change profile picture"
            color="black"
            onPress={pickImage}
          
          />
          <View style={{width:'80%', rowGap:4}}>
            <View>
              <Text style={styles.text}>First name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setUser({...user,firstname:text})
                }}
                defaultValue={user?.firstname}
              />
              <Text style={styles.text}>Last name</Text>
               <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setUser({...user,lastname:text})
                }}
                defaultValue={user?.lastname}
              />
            </View>
            <View>
              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setUser({...user, info:{...user.info, address:text}})
                }}
               defaultValue={user?.info?.address}
              />
            </View>
            <View>
              <Text style={styles.text}>Phone Number</Text>
              <TextInput
              style={styles.input}
                onChangeText={(text) => {
                  setUser({...user, info:{...user.info, phone_no:text}})
                }}
                defaultValue={user?.info?.phone_no}
              />
            </View>
            <View style={{alignItems:'center',marginTop:12}}>
              <TouchableOpacity
                onPress={handleUpdate}
                style={{ width: 200, height: 50, backgroundColor: '#171F1D', alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#000000' }}
              >
              <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

    )
  
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FB9246',
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
   
  },
  text: {
    marginBottom: 8, 
    fontSize: 18
  },
  input: {
    borderColor: 'gray',
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
  }
  
}
);