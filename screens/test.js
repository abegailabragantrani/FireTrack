import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

const TestScreen = () => {
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);

    const takePicture = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Camera permission not granted');
            return;
        }

        const result = await ImagePicker.launchCameraAsync();
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Location permission not granted');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Report Incident</Text>
            <Button title="Take Picture" onPress={takePicture} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Get Current Location" onPress={getCurrentLocation} />
            {location && (
                <Text style={styles.location}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: '70%',
        height: '70%',
        marginVertical: 20,
    },
    location: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default TestScreen;