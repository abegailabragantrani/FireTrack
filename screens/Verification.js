import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import apiService from '../api/config';


const  SubmitCode = ({ route, navigation }) => {
        
      const { email } = route.params;
        const verifyCreds = () => {
            apiService.post('/')
        }
        const [data,setData] = React.useState({
            a:null,
            b:null,
            c:null,
            d:null,
            loading:false,
            error:''
        })

        const handleValidateCode = async() => {
            try {
                setData({...data,loading:true})

                 const payload = {
                code:data.a+data.b+data.c+data.d,
                email:email
                }
            const response =await apiService.post('/reset-code',payload)
            if(response){
                navigation.navigate('ChangePass',{
                    email: email,
                    code:payload.code
                    })
            }
            setData({...data,loading:true})

            } catch (error) {
             setData({...data,loading:false})

                setData({...data,error:error.response.data.message});
            }
      
        }
        return (

            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('./drawnav/1.png')} />
            <Text>A 4 digit code has been sent to your email {"\n"}{email} for verification</Text>
                           <Text style={{ color: 'red', textAlign: 'center', top: 30 }}>{data.error}</Text>

                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp1}
                    onChangeText={(text)=>setData({...data,a:text})}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp2}
                    onChangeText={(text)=>setData({...data,b:text})}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp3}
                    onChangeText={(text)=>setData({...data,c:text})}
                />
                <TextInput
                    keyboardType={"number-pad"}
                    numberOfLines={1}
                    textAlign="center"
                    maxLength={1}
                    style={styles.otp4}
                    onChangeText={(text)=>setData({...data,d:text})}
                />





                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -230 }}>
                <TouchableOpacity
                        onPress={ handleValidateCode}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                        disabled={data.loading}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>{data.loading?"loading...":"Enter OTP"}</Text>
                        
                    </TouchableOpacity>
                </View>

            </View>
        )
    
}

export default SubmitCode

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