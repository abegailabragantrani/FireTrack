import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import apiService from '../api/config';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BackDrop from '../componets/BackDrop';
import BackButton from '../componets/BackButton';



const ReportList = () => {
    const navigation = useNavigation(); 

    const [data,setData] = useState(
        {
            data: [],
            loading: false,
        }
    );

    const handleBackButton = () => {
        navigation.goBack();
    }

    useEffect(() => {
        const fetchData = async () => {
            setData({...data, loading: true });
            try {
                const response = await apiService.get('/my-incidents');
                console.log(response.data);
                setData({
                    data: response.data,
                    loading: false,
                });
            } catch (error) {
                console.log(error);
                setData({ loading: false, data:[] });
            }
          
        }
        fetchData();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('ViewReportedIncident', { item })}
        >
            <View style={styles.itemContainer}>
                <View>
                <Image source={{uri:item.image}} style={styles.avatar} alt='hello po'/>
                </View>
                <View style={{padding:10}}>
                    <View style={{flex:1, width:'90%'}}>
                        <Text style={styles.location} numberOfLines={10} ellipsizeMode="tail">{item.location}</Text>
                        <View style={{marginBottom:9}}>
                            <Text style={{color:item.status === 'pending'?"orange":"green", fontSize:12}}>
                                {item.status === 'pending' ? 'Status: Pending' : 'Status: Resolved'}
                            </Text>
                        </View>
                    </View>
                        <Text style={styles.fireType}>{item.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    console.log( data.loading , data?.data?.length);
    return (
        <>
            <BackButton
            handleBackButton={handleBackButton}
            color={'black'} />
            <SafeAreaView style={styles.container}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', marginTop: 60 }}>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.title}>
                            My reported fire incidents
                        </Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        {data.loading && data?.data?.length === 0 ?
                            <BackDrop />
                            :
                            <FlatList
                                data={data.data}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.id.toString()} />}

                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width:'90%',
        height:'90%'
    },
     title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            padding: 10,
            backgroundColor: '#f5f5f5',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
    },
    avatar: {
        width: Dimensions.get('window').width * 0.2,
        height: Dimensions.get('window').width * 0.2,
        borderRadius: Dimensions.get('window').width * 0.1,
        marginRight: 10,
    },
    location: {
        fontSize: 10,
        fontWeight: 'bold',
        flex:1,
         alignItems: 'center',
    justifyContent: 'center',
    },
    fireType: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default ReportList;
