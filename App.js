import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import MainScreen from './screens/main';
import ReportScreen from './screens/report';
import IncidentScreen from './screens/incidents';
import DashboardScreen from './screens/drawnav/Dashboard';

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