import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import MainScreen from './screens/main';
import ReportScreen from './screens/report';
import IncidentScreen from './screens/incident';
import VerificationScreen from './screens/Verification';
import ForgotPassScreen from './screens/forgotpass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePass from './screens/ChangePass';



const Stack = createStackNavigator();

 const App = () => {
  const [isAuth,setIsAuth] = React.useState(false)
   React.useEffect(()=>{
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value) {
          setIsAuth(true)
          return 0
        }else{
          setIsAuth(false)
        }
        
      } catch (e) {
      console.error(e)
      }
    };
    getData()
   },[])
    return (
      <View style={styles.container}>
        <NavigationContainer>
             <Stack.Navigator
              screenOptions={{
    headerShown: false
  }}
             >
              {!isAuth?
           
            <>
              <Stack.Screen name="Home" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
              <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
              <Stack.Screen name="Verification" component={VerificationScreen} />
              <Stack.Screen name="ChangePass" component={ChangePass} />

            </>
              :
              <>
              <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Report" component={ReportScreen} />
              <Stack.Screen name="Incident" component={IncidentScreen} />
              </>

            }
               </Stack.Navigator>
        </NavigationContainer>


      </View>
    )
  
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})