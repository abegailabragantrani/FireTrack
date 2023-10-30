import * as React from 'react'
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Account from "./drawnav/Account";
import AboutUs from "./drawnav/AboutUs";
import Logout from './drawnav/Logout';
import Dashboard from './drawnav/Dashboard';


const Drawer = createDrawerNavigator();


export default class MainScreen extends React.Component {
render() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="My Account" component={Account} />
        <Drawer.Screen name="About Us" component={AboutUs} />
        <Drawer.Screen name="Logout" component={Logout} />
        </Drawer.Navigator>
            

      );
}
}
