import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import MainScreen from './screens/main';
import ReportScreen from './screens/report';
import IncidentScreen from './screens/incidents';
import VerificationScreen from './screens/Verification';
import DashboardScreen from './screens/drawnav/Dashboard';
import ForgotPassScreen from './screens/forgotpass';
import VeriResetPassScreen from './screens/veriresetpass';
import ResetPassScreen from './screens/resetpass';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
            <Stack.Screen name="VeriResetPass" component={VeriResetPassScreen} />
            <Stack.Screen name="ResetPass" component={ResetPassScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Report" component={ReportScreen} />
            <Stack.Screen name="Incident" component={IncidentScreen} />
          </Stack.Navigator>
        </NavigationContainer>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})