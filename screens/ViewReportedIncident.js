import React from 'react';
import { View, Image, Text, StyleSheet, SafeAreaView } from 'react-native';
import BackButton from '../componets/BackButton';
import { useNavigation } from '@react-navigation/native';
import DateFormatter from '../lib/DateFormatter';


const ViewReportedIncident = ({route}) => {
    const { item } = route.params;
    const navigation = useNavigation();
      const handleBackButton = () => {
        navigation.goBack();
    }
    return (
        <View style={styles.container}>
            <BackButton
                    handleBackButton={handleBackButton}
                    color={'white'}
                />
            
            <Image
                source={{uri:item.image}}
                style={styles.backgroundImage}
                resizeMode='cover'
            />
             
            <View style={styles.detailsContainer}>
               

                <Text style={styles.title}>{item.type} Fire Incident</Text>
            <Text style={{fontSize:13, color:'white', fontWeight:15, marginBottom:6}}>{DateFormatter(item.created_at)}</Text>
                <Text style={styles.description}>
                    {item.location}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    detailsContainer: {
        flex: 1,
        justifyContent:'flex-end',
        alignItems: 'end',
        textAlign: 'end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        marginBottom: 20,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: 'white',
        textAlign: 'left',
    },
});

export default ViewReportedIncident;
