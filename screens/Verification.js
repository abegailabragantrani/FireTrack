import * as React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import apiService from '../api/config';


const SubmitCode = ({ route, navigation }) => {

    const { email } = route.params;
    const verifyCreds = () => {
        apiService.post('/')
    }
    const [data, setData] = React.useState({
        a: null,
        b: null,
        c: null,
        d: null,
        loading: false,
        error: ''
    })

    const handleValidateCode = async () => {
        try {
            setData({ ...data, loading: true })

            const payload = {
                code: data.a + data.b + data.c + data.d,
                email: email
            }
            const response = await apiService.post('/reset-code', payload)
            if (response) {
                navigation.navigate('ChangePass', {
                    email: email,
                    code: payload.code
                })
            }
            setData({ ...data, loading: true })

        } catch (error) {
            setData({ ...data, loading: false })

            setData({ ...data, error: error.response.data.message });
        }

    }
    return (

        <View style={styles.container}>
            <ImageBackground style={styles.image1}
                source={require('../assets/images/bg2.png')} />
        <View style={styles.page}>
            <Image style={styles.image}
                source={require('../assets/images/emailotp.png')} />
            <Text>A 4 digit code has been sent to your email {"\n"}{email} for verification</Text>
            <Text style={{ color: 'red', textAlign: 'center', top: 30 }}>{data.error}</Text>

            <TextInput
                keyboardType={"alphabet-pad"}
                numberOfLines={1}
                textAlign="center"
                maxLength={1}
                style={styles.otp1}
                onChangeText={(text) => setData({ ...data, a: text })}
            />
            <TextInput
                keyboardType={"alphabet-pad"}
                numberOfLines={1}
                textAlign="center"
                maxLength={1}
                style={styles.otp2}
                onChangeText={(text) => setData({ ...data, b: text })}
            />
            <TextInput
                keyboardType={"alphabet-pad"}
                numberOfLines={1}
                textAlign="center"
                maxLength={1}
                style={styles.otp3}
                onChangeText={(text) => setData({ ...data, c: text })}
            />
            <TextInput
                keyboardType={"alphabet-pad"}
                numberOfLines={1}
                textAlign="center"
                maxLength={1}
                style={styles.otp4}
                onChangeText={(text) => setData({ ...data, d: text })}
            />


            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -230 }}>
                <TouchableOpacity
                    onPress={handleValidateCode}
                    style={{ width: 200, height: 50, right:60, bottom: 30, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                    disabled={data.loading}
                >
                    <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>{data.loading ? "loading..." : "Enter OTP"}</Text>

                </TouchableOpacity>
            </View>

            </View>

        </View>
    )

}

export default SubmitCode

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    otp1: {
        backgroundColor: "white",
        width: 50,
        textAlign: "center",
        marginRight: 220,
        height: 50,
        bottom: 0,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    otp2: {
        backgroundColor: "white",
        marginLeft: 60,
        width: 50,
        height: 50,
        bottom: 100,
        left: 10,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    otp3: {
        backgroundColor: "white",
        width: 50,
        marginRight: 85,
        height: 50,
        bottom: 200,
        left: 140, 
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
        bottom: 300,
        marginTop: 50,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 25,
        paddingLeft: 5,
    },
    image1: {
        height: 900,
        width: undefined,
    },
    image: {
        height: 160,
        width: 250,
    },
    page: {
        bottom: 600,
        left: 70
    }

}
);