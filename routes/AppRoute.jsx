import React, { useContext, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/Auth';
import LoginScreen from '../screens/login';
import MainScreen from '../screens/main';
import ReportScreen from '../screens/report';
import ProfileScreen from '../screens/profile';
import SignupScreen from '../screens/signup';
import ForgotPassScreen from '../screens/forgotpass';
import VerificationScreen from '../screens/Verification'
import ChangePass from '../screens/ChangePass';
import { getToken } from '../lib/TokenHandler';
import TestScreen from '../screens/test';
import ReportList from '../screens/ReportList';
import ViewReportedIncident from '../screens/ViewReportedIncident';
import UpdateIncident from '../screens/Admin/UpdateIncident';

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
           
              parseInt(state?.user?.user_type_id) !== 4 ?
              <>
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Incident" component={ReportList} />
                <Stack.Screen name='UpdateIncident' component={UpdateIncident}/>
                <Stack.Screen name="Report" component={ReportScreen} />

                {/* <Stack.Screen name='UpdateIncident' component={}/> */}
              </>
              :
              <>
                <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Report" component={ReportScreen} />
                <Stack.Screen name="Incident" component={ReportList} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="ViewReportedIncident" component={ViewReportedIncident} />
                <Stack.Screen name="ChangePassword" component={ChangePass} />
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