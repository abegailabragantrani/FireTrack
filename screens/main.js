import * as React from 'react'
import { StyleSheet, View, Text, Dimensions, Button, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

const window = Dimensions.get('window')

export default class MainScreen extends React.Component {

    render() {
        this.props.navigation.setOptions({
            headerBackTitle: '',
            headerShown: false
        })

        return (
            <View style={{ paddingLeft: 20, marginVertical: 20 }} >
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Report')}>
                        <Text style={{ width: 200, backgroundColor: '#FB9246', padding: 10, bottom: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#000000' }}>Already have an account? Log in.</Text>
                    </TouchableOpacity>
                </View>





            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
})