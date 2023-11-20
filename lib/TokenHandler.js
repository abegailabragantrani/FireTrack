import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token) =>{
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
       console.log('error set token',error)
    }
}

export const getToken = async() => {
  try {
    const token =  await AsyncStorage.getItem('token');
    return await token;
  } catch (error) {
    console.log('error get token',error)
  }
}

export const removeCreds = async() => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('signIn')
  } catch(e) {
    // remove error
  }

}