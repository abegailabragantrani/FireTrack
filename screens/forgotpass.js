import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../api/config';
import { ActivityIndicator } from "react-native";



export default class ForgotPassScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }
    state = {
        username: "",
        password: "",
        errMsg: "",
        loading:false,
    }

    handleForgotPass = async() => {
        const payload = {
            email:this.state.username
        }
        try {
            this.setState({ loading: true })
            const request = await apiService.post('/reset-pass',payload)
            if( await request){
                this.props.navigation.navigate('Verification',
                    {
                    email: this.state.username,
                    }
                )
            }
             this.setState({ loading: false })
        } catch (error) {
             this.setState({ errMsg: error.response.data.message});
             this.setState({ loading: false })
        }
    
    }



    render() {
        return (
            
            <View style={styles.container}>

                <Image style={styles.image}
                 source={require('./drawnav/1.png')} />

                <Animatable.View
                    ref={this.validateInput}
                >
                    <Icon name="envelope" size={20} style={{ position: 'absolute', top: 25, left: 20, color: '#FB9246' }} />
                    <TextInput
                        placeholder="Email"
                        style={styles.fields}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' })
                            this.setState({ username: text })
                        }
                        }
                    />
                 
                    <Text style={{ color: 'red', textAlign: 'center', top:-10 }}>{this.state.errMsg}</Text>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                    </TouchableOpacity>
                </Animatable.View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 60 }}>
                    <TouchableOpacity
                        onPress={()=>this.handleForgotPass()}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#000000' }}
                        disabled={this.state.loading}
                    >
                        { this.state.loading?
                        <ActivityIndicator color={"#fff"}  />
                        :
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>forgot password</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Signup')}
                    >
                        <Text style={{ textAlign: 'center', color: '#FB9246', fontSize: 16 }}>Don't have an account? Sign up.</Text>
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
        bottom: 40,
    },
    fields: {
        height: 50,
        width: 300,
        margin: 12,
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#d3d3d3d3',

    },
    image: {
    right: 10,
    left: 3,
    height: 270,
    width: 370,
    top: 60,
},

}    
);