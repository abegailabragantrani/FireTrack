import * as React from 'react'
import { Button } from 'react-native';
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "./drawnav/Account";
import AboutUs from "./drawnav/AboutUs";
import Logout from './drawnav/Logout';
import Dashboard from './drawnav/Dashboard';
import DrawerNav from '../componets/DrawerNav';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Drawer = createDrawerNavigator();


export default class MainScreen extends React.Component {
  render() {
    return (

      <Drawer.Navigator drawerContent={props => <DrawerNav{...props} />}
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#FB9246',
          drawerActiveTintColor: '#fff',
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            marginLeft: 25,
            fontSize: 15,
          },
        }}>

        <Drawer.Screen name="Dashboard" component={Dashboard}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="home" size={22} color={color} />
            ),
          }} />

        <Drawer.Screen name="My Account" component={Account}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="user" size={22} color={color} />
            ),
          }}
        />

        <Drawer.Screen name="About Us" component={AboutUs}
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="heart" size={22} color={color} />
            ),
          }} />

        <Drawer.Screen name="Logout" component={Logout} 
          options={{
            drawerIcon: ({ color }) => (
              <Icon name="logout" size={22} color={color} />
            ),
          }} 
          
          />
      </Drawer.Navigator>


    );
  }
}