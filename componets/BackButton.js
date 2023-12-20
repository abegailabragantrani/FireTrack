import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const BackButton = ({handleBackButton,color}) => {
  return (
     <TouchableOpacity onPress={handleBackButton} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
     backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100,
    },
})