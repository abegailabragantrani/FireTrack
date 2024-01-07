import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../api/config';
import { ActivityIndicator } from "react-native";



export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }

    state = {

        fullname:'',
        gender:'',
        address:'',
        phone:'',
        email:'',
        password:'',
        password_confirmation:'',
        loading:false,
        error:['']

    }

    onLogin = async() => {
        // if (this.state.username == 'abe' && this.state.password == 'pretty') {
        //     this.props.navigation.navigate('Main')
        // } else {
        //     this.validateInput.current.shake(800)
        //     this.setState({ errMsg: 'Invalid login details. Try again!' })
        // }

        try {
            this.setState({ loading: true })
             const info = {
                gender:this.state.gender,
                address:this.state.address,
                phone:this.state.phone
            }
        const payload = {
           name:this.state.fullname,
           email:this.state.email,
           password:this.state.password,
           password_confirmation:this.state.password_confirmation,
           info:info
         
        }
        
        const response = await apiService.post('/register',payload)
        if(response){
            this.props.navigation.navigate('Home')
        }
        this.setState({ loading: false })
        } catch (error) {
            this.setState({ loading: false })
          console.log(error.response.data.errors);
            if(error.response.data.errors){
                this.setState({ error: Object.values(error.response.data.errors) })
            }

            if(error?.message === 'Network Error'){
                this.setState({error: [error.message]})
            }

            if(error.response.data.message){
                this.setState({error: [error.response.data.message]})
            }
            
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
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', bottom: 415, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="fullname"
                        onChangeText={(text) => {
                            this.setState({ fullname: text })
                        }
                        }
                    />
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 18, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Gender"
                        onChangeText={(text) => {
                            this.setState({ gender: text })
                        }
                        }
                    />

                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 75, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="address"
                        onChangeText={(text) => {
                            this.setState({ address: text })
                        }
                        }
                    />

                    <Icon name="lock" size={20} color="#ccc" style={{ position: 'absolute', top: 133, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Phone"
                        onChangeText={(text) => {
                            this.setState({ phone: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 190, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Email"
                        onChangeText={(text) => {
                            this.setState({ email: text })
                        }
                        }
                    />

                    <Icon name="envelope" size={20} color="#ccc" style={{ position: 'absolute', top: 248, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }
                        }
                    />

                    <Icon name="phone" size={20} color="#ccc" style={{ position: 'absolute', top: 303, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password_confirmation: text })
                        }
                        }
                    />
                    

                </Animatable.View>
                {this.state.error.map((err,key)=>
                { 
                if(err){
                    return(
                         <Text style={{ color: 'red', textAlign: 'center', top: -60 }} key={key}>
                            {err}
                        </Text>
                    )  
                }})}
                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 75, bottom: 40 }}>
                    <TouchableOpacity
                        onPress={() => this.onLogin()}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                        disabled={this.state.loading}
                    >
                        { this.state.loading?
                        <ActivityIndicator color={"#fff"}  />
                        :
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Continue</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Home')}
                    >
                        <Text style={{ textAlign: 'center', color: '#FB9246', fontSize: 16 }}>Already have an account? Log in..</Text>
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
        backgroundColor: 'white',
    },
    fields: {
        height: 45,
        width: 300,
        margin: 6,
        paddingHorizontal: 40,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: '#d3d3d3d3',
        bottom: 55,
    },
    image: {
    right: 10,
    left: 3,
    height: 250,
    width: 370,
    top: 40,
    },

});