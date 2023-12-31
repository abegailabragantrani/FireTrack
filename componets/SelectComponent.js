import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

  const data = [
        { id: 1, name: 'Structural', description: 'Building, Residential, Warehouse and etc.' },
        { id: 2, name: 'Non-Structural', description: 'Open area, forest, agricultural and etc.' },
        { id: 3, name: 'Vehicle', description: 'Car, motor car, ship, aircraft and etc.' },
    ];

const SelectComponent = ({handleSelect}) => {
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(data[0]);

  

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => {setSelectedItem(item), setOpen(false)}}
        >
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );

    useEffect(() => {  
        handleSelect(selectedItem)
     }, [selectedItem])
    
    
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.selectedItemContainer}
                onPress={() => setOpen(!open??true)}
            >
                    <Text style={{fontSize:10}}>
                        Fire type
                    </Text>
                
                    <Text style={styles.selectedItemText}>
                        {selectedItem ? selectedItem.name : 'Select an item'}
                    </Text>
            </TouchableOpacity>
            {open && (
                <FlatList
                    data={data}
                    renderItem={(item)=>renderItem(item)}
                    keyExtractor={(item) => item.id.toString()}
                    style={styles.dropdownList}
                />
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
    selectedItemContainer: {
        width: 160,
        height: 52,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius:10,
    },
    selectedItemText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdownList: {
        width: 200,
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius:10,
        overflow:'hidden',
        zIndex:0,
        position:'absolute',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
});

export default SelectComponent;
