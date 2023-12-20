import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import apiService from '../api/config';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import SelectComponent from '../componets/SelectComponent';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../context/Auth';
import { Header } from '@react-navigation/stack';



const AvatarScreen = () => {
    const {state} = React.useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCamera] = useState(null);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const navigation = useNavigation(); 
    const [type, setType] = useState(null); 
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

            if(location){
                    let addressResponse = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });                    
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
            
        }
        


      
        
    }
    

    return (
        <View style={{ flex: 1 }}>
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
                </View>
                <View
                    style={{
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}
                    >
                    <SelectComponent
                        handleSelect={handleSelect}
                    />
                </View>
                
                    <View
                        style={{
                            alignSelf: 'center',
                            alignItems: 'center',
                            backgroundColor: 'transparent',
                            margin:10,
                            marginBottom: 50,
                        }}
                    >
                        <View>
                            <Text style={{ color: 'white' }}>
                                {address ? 
                                    `Address: ${address?.street}, ${address?.city}, ${address?.region}, ${address?.country}`
                                    :
                                    'Fetching address...'
                                }
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                                backgroundColor: address && camera ? 'orange' : 'gray',
                                padding: 10,
                                borderRadius: 10,
                                marginTop: 10,
                            }}
                            disabled={address && camera ? false : true}
                            onPress={alertButton}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Report incident</Text>
                        </TouchableOpacity>
                    </View>
            </Camera>
            
            )}
        </View>
    );
};

export default AvatarScreen;