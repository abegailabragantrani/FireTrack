import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async (key, value) =>{
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`error setting ${key}`,error);
    }
}

export const getToken = async() => {
  try {
    const token =  await AsyncStorage.getItem('token');
    return await token;
  } catch (error) {
  }
}

export const getStorage = async (key) => {
   try {
    const token =  await AsyncStorage.getItem(key);
    return await token;
  } catch (error) {
  }
}

export const removeCreds = async() => {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  } catch(e) {
    // remove error
  }

}