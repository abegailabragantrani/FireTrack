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
            <View>

                <ScrollView>
                    <View
                        style={{ paddingLeft: 20, marginVertical: 20 }}
                    >
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 10 }}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ marginTop: 5, fontSize: 13, fontWeight: 'bold' }}>Abe</Text>
                                <TextInput
                                    placeholder="type a comment..."
                                    style={{ borderWidth: 1, padding: 10, borderRadius: 15, backgroundColor: '#FEA3C4', color: '#EFECED', fontWeight: 'bold', fontSize: 16 }}
                                />
                                <Button title="Submit" color='plum'/>
                            </View>

                           

    
                        </ScrollView>
                    </View>

                </ScrollView>


            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b91d73'
    },
    cover: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        width: window.width,
        height: window.height / 2.5
    },
    bfp: {
        height: 100,
        width: 120,
        borderRadius: 5,
    },
    top: {
        height: 210,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    input: {
        borderWidth: 3.5,
        padding: 5,
        width: 350,
        flex: 1,
        borderColor: 'white'
    }
})