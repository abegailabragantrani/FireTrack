import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { getToken } from './lib/TokenHandler';
import AppRoute from './routes/AppRoute';
import AuthProvider from './context/Auth';





 const App = () => {

    return (
        <AuthProvider>
          <NavigationContainer>
            <AppRoute/>
          </NavigationContainer>
        </AuthProvider>

    )
  
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
})