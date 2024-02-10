import * as React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../lib/TokenHandler';



export default class ChangePass extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }
    state = {
        password: "",
        password_confirmation: "",
        error: '',
        loading: false

    }


    handleChangePass = async () => {
        // if (this.state.username == 'Abe' && this.state.password == 'pretty') {
        //     this.props.navigation.navigate('Main')
        // } else {
        //     this.validateInput.current.shake(800)
        //     this.setState({ errMsg: 'Invalid login details. Try again!' })
        // }


        try {
            this.setState({ loading: true })
            const payload = {
                email: this.props.route.params.email,
                code: this.props.route.params.code,
                password: this.state.password,
                password_confirmation: this.state.password_confirmation
            }
            const request = await apiService.post('/reset-submit', payload, {
                'Accept': 'application/json',
            });
            if (request) {
                this.props.navigation.navigate('Home')
            }
            this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
            if (error.response.status === 422) {
                this.setState({ error: 'Password does not match' })
            }
        }

    }

    render() {
        return (

            <View style={styles.container}>
                <ImageBackground style={styles.image1}
                    source={require('../assets/images/bg2.png')} />
        <View style={styles.page}>
                <Image style={styles.image}
                    source={require('../assets/images/changepass.png')} />

                <Animatable.View
                    ref={this.validateInput}
                >
                    <Icon name="envelope" size={20} style={{ position: 'absolute', top: 61, left: 75, color: '#FB9246' }} />
                    <TextInput
                        placeholder="New Password"
                        style={styles.fields}
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }
                        }
                    />
                    <Icon name="lock" size={20} style={{ position: 'absolute', top: 139, left: 75, color: '#FB9246' }} />
                    <TextInput
                        placeholder="Confirm Password"
                        style={styles.fields}
                        secureTextEntry
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password_confirmation: text })
                        }
                        }

                    />

                    <Text style={{ color: 'red', textAlign: 'center', top: 19 }}>{this.state.error}</Text>

                </Animatable.View>

                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 5, top: 30 }}>
                    <TouchableOpacity
                        onPress={() => this.handleChangePass()}
                        disabled={this.state.loading}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Change Password</Text>
                    </TouchableOpacity>


                </View>

             </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fields: {
        height: 50,
        width: 300,
        top: 31,
        left: 50,
        margin: 15,
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#d3d3d3d3',

    },
    image: {
        left: 10,
        height: 270,
        width: 370,
        top: 80,
    },
    image1: {
        height: 900,
        width: undefined,
    },
    page: {
        bottom: 700,
    }

}
);