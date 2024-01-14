import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import apiService from '../api/config';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import SelectComponent from '../componets/SelectComponent';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../context/Auth';
import { Header } from '@react-navigation/stack';
import { FireStations } from '../lib/FireStations';
import { getDistance, isPointWithinRadius } from 'geolib';


const AvatarScreen = () => {
    const {state} = React.useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const navigation = useNavigation(); 
    const [type, setType] = useState(null); 
    const [nearbyFireStation, setNearbyFireStation] = useState(null);
    useEffect(() => {

        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');

            let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            if (locationStatus !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
            setLocation(location);
            const stations = await FireStations()
            if(location&&stations){
                    let addressResponse = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });
                const {latitude, longitude} = location.coords;     
                const stationsDistance = stations.map((fireStation) => {
                   let distance = getDistance(
                        {latitude, longitude},
                        {latitude: fireStation.latitude, longitude: fireStation.longitude}
                    )
                    return {
                        ...fireStation,
                        distance: distance,
                    }
                });
                const nearby = stationsDistance.sort((a,b) => a.distance - b.distance)[0];
                setNearbyFireStation(nearby);
                setAddress(addressResponse[0]);
            }
            
        })();
    }, []);

        const alertButton = () =>
            Alert.alert('Report this incident', 'Confirm incident', [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {text: 'Confirm', onPress:()=> saveToDatabase()},
    ]);

    const handleSelect = (item) => {
        setType(item.name)
    }

    const saveToDatabase = async () => {
        const photoData = await camera.takePictureAsync({base64: true,});
        const image =  `data:image/jpg;base64,${photoData.base64}`;
        const payload = {
            type,
            image,
            user_id: state.user.id,
            station: nearbyFireStation.address,
            location: `${address?.street}, ${address?.city}, ${address?.region}, ${address?.country}`
        }
        try {
            const res = await apiService.post('/report-incident', payload, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });
            navigation.navigate('Incident');
        } catch (error) {
            console.log(error.response.data);
            if(error.response.data.msg){
                Alert.alert(error.response.data.msg);
            }
        }
        


      
        
    }
    
    return (
        <View style={{ flex: 1, backgroundColor:'black' }}>
            {hasPermission === null ? (
                <Text>Requesting camera permission...</Text>
            ) : hasPermission === false ? (
                <Text>No access to camera</Text>
            ) : (
            <Camera
                style={{ flex: 1 }}
                type={Camera.Constants.Type.back}
                ref={(ref) => setCamera(ref)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop:50,
                        marginLeft:20,

                    }}
                >
                    <TouchableOpacity
                        style={{
                            alignSelf: 'flex-start',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                        }}
                        onPress={() => navigation.goBack()}
                    >   
                        <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Close </Text>
                    </TouchableOpacity>
                    <View style={{width:'46%', margin:10}}>
                        <Text style={{ color: 'white', fontWeight:'700' }}>
                            {address ? 
                                `Address: ${address?.street}, ${address?.city}, ${address?.region}, ${address?.country}`
                                :
                                'Fetching address...'
                            }
                        </Text>
                    </View>
                </View>
             
                    <View style={{backgroundColor:'white', height:'15%', justifyContent:'space-between', borderRadius:20}}>
                        <View style={{zIndex:10, flexDirection:'row', height:'100%', justifyContent:'space-between', marginLeft:20, marginRight:20, alignItems:'center'}}>
                             <View style={{width:'50%', paddingTop:20, }}>
                                {/* <SelectComponent
                                    handleSelect={handleSelect}
                                /> */}

                                  <TouchableOpacity
                                    style={{
                                        backgroundColor: address && camera ? 'orange' : 'gray',
                                        borderRadius: 10,
                                        width:"100%",
                                        alignItems:'center',
                                        paddingTop:10,
                                        paddingBottom:10,
                                    }}
                                    disabled={address && camera ? false : true}
                                    onPress={alertButton}
                                >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Report incident</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'46%',  paddingTop:20}}>
                                {nearbyFireStation&&
                                // the number of firestation is nearbyFireStation.number Plese change the onPress function to call the firestation;

                                    <TouchableOpacity  style={{backgroundColor:'#0583D2', padding:10, borderRadius:10,}} onPress={()=>Linking.openURL(`tel:123`)}> 
                                        <Text style={{ color: 'white', fontWeight:'600', textDecorationLine: 'underline', fontSize:12 , textAlign:'center' }}>
                                            Call Nearest fire station: {nearbyFireStation?.address}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            
                            </View>
                        </View>
                    
                        {/* <View style={{height:"40%", width:'100%', alignItems:'center', marginBottom:10}}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: address && camera ? 'orange' : 'gray',
                                        borderRadius: 10,
                                        width:"50%",
                                        alignItems:'center',
                                        paddingTop:10,
                                        paddingBottom:10,
                                    }}
                                    disabled={address && camera ? false : true}
                                    onPress={alertButton}
                                >
                                    <Text style={{ color: 'white', fontSize: 16 }}>Report incident</Text>
                                </TouchableOpacity>
                        </View> */}
                    </View>
            </Camera>
            
            )}
        </View>
    );
};

export default AvatarScreen;