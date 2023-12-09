import React, { useContext, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/Auth';
import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';
import ReportScreen from '../screens/report';
import IncidentScreen from '../screens/incident';
import ProfileScreen from '../screens/profile';
import SignupScreen from '../screens/signup';
import ForgotPassScreen from '../screens/forgotpass';
import VerificationScreen from '../screens/Verification'
import ChangePass from '../screens/ChangePass';
import { getToken } from '../lib/TokenHandler';
const Stack = createStackNavigator();


const AppRoute = () => {
    const {state} = useContext(AuthContext)   

  return (
        <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}
                >
                {state.token?
              <>
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Report" component={ReportScreen} />
                <Stack.Screen name="Incident" component={IncidentScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
                :
                <>
                <Stack.Screen name="Home" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
                <Stack.Screen name="Verification" component={VerificationScreen} />
                <Stack.Screen name="ChangePass" component={ChangePass} />
                </>

              }
        </Stack.Navigator>
  )
}

export default AppRoute