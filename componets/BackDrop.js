import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const BackDrop = () => {
    return (
        <View style={styles.container}>
            <View style={styles.backdrop} pointerEvents="box-none">
                <ActivityIndicator size="large" color="orange" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackDrop;
