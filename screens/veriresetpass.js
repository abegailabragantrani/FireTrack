import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'


export default class VeriResetPassScreen extends React.Component {

    render() {
        return (

            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('./drawnav/1.png')} />
            <Text>A 4 digit code has been sent to your email</Text>

                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp1}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp2}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp3}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp4}
                />



                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -230 }}>
                <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ResetPass')}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Enter OTP</Text>
                        
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        bottom: 100,
    },
    otp1: {
        backgroundColor: "white",
        width: 50,
        textAlign: "center",
        marginRight: 220,
        height: 50,
        top: 10,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    otp2: {
        backgroundColor: "white",
        width: 50,
        marginRight: 85,
        height: 50,
        bottom: 89,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    otp3: {
        backgroundColor: "white",
        marginLeft: 60,
        width: 50,
        height: 50,
        bottom: 189,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    otp4: {
        backgroundColor: "white",
        width: 50,
        marginLeft: 210,
        height: 50,
        bottom: 289,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    image: {
        right: 10,
        left: 3,
        height: 270,
        width: 370,
        top: 110,
    },

}
);