import * as React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../api/config';
import axios from 'axios';



export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
        this.timeoutId = null;
    }

    state = {

        firstname:'',
        lastname:'',
        gender:'',
        address:'',
        phone_no:'',
        email:'',
        password:'',
        password_confirmation:'',
        loading:false,
        error:[],
        lat:null,
        long:null,
        errorAddress: false,
        loadingAddress: false

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
                phone_no:this.state.phone_no,
                lat:this.state.lat,
                long:this.state.long
            }
        const payload = {
           firstname:this.state.firstname,
           lastname:this.state.lastname,
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

    handleAddressChange = (text) => {
        if (this.timeoutId !== null) {
        clearTimeout(this.timeoutId);
        }
        this.setState({ loadingAddress: true });
        this.timeoutId = setTimeout(() => {
        if (text !== this.state.address) {
            console.log('requesting location');
            this.setState({ address: text });
            this.handleGetLocation();
        }
        }, 3000);
    }

    handleGetLocation = async () => {
        try {
            const YOUR_API_KEY = 'YOUR_API_KEY'
            const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key={YOUR_API_KEY}`;
            const response = await axios.get(geocodeUrl)
            console.log(response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng);
            this.setState({ 
                lat: response.data.results[0].geometry.location.lat, 
                long: response.data.results[0].geometry.location.lng,
                loadingAddress: false,
                errorAddress: false
            });
        } catch (error) {
            this.setState({ 
                loadingAddress: false,
                errorAddress: true
            });
        }
    }

   

    render() {
        // console.log(this.state.error.length, this.state.errorAddress, this.state.lat, this.state.long);
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image}
                    source={require('../assets/images/regis.png')} />
                <View style={styles.page}>
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: -35, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="First Name"
                        onChangeText={(text) => {
                            this.setState({ firstname: text })
                        }
                        }
                    />
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 20, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Last Name"
                        onChangeText={(text) => {
                            this.setState({ lastname: text })
                        }
                        }
                    />
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 75, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Gender"
                        onChangeText={(text) => {
                            this.setState({ gender: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 135, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={this.state.errorAddress? styles.fieldsError : styles.fields}
                        placeholder="address"
                        onChangeText={this.handleAddressChange}
                    />
                    {
                        this.state.errorAddress &&
                        <Text style={{ color: 'red', textAlign: 'center', top: -60, fontSize: 12 }}>
                            Unable to get location. Please check your address and try again.
                        </Text>
                    }
                    {
                        this.state.loadingAddress &&
                        <ActivityIndicator size="small" style={{ color: 'gray', textAlign: 'center', top: -60 }}/>
                    }

                    <Icon name="phone" size={20} color="#ccc" style={{ position: 'absolute', top: 190, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Phone"
                        onChangeText={(text) => {
                            this.setState({ phone_no: text })
                        }
                        }
                    />

                    <Icon name="envelope" size={20} color="#ccc" style={{ position: 'absolute', top: 245, left: 20, color: '#FB9246', zIndex:10 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Email"
                        onChangeText={(text) => {
                            this.setState({ email: text })
                        }
                        }
                    />

                    <Icon name="lock" size={20} color="#ccc" style={{ position: 'absolute', top: 305, left: 20, color: '#FB9246',  zIndex:10  }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password: text })
                        }
                        }
                    />

                    <Icon name="lock" size={20} color="#ccc" style={{ position: 'absolute', top: 360, left: 20, color: '#FB9246',  zIndex:10  }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Confirm Password"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ password_confirmation: text })
                        }
                        }
                    />
                </View>
                
                {this.state.error.map((err,key)=>
                { 
                if(err){
                    return(
                         <Text style={{ color: 'red', textAlign: 'center', top: -60 }} key={key}>
                            {err}
                        </Text>
                    )  
                }})}
                <View style={{ alignItems: 'center', justifyContent: 'center', left: 10, marginBottom: 75, bottom: 640 }}>
                    <TouchableOpacity
                        onPress={() => this.onLogin()}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                        disabled={this.state.loading || this.state.errorAddress || this.state.lat === null || this.state.long === null }
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
                        <Text style={{ textAlign: 'center', color: '#FB9246', fontSize: 16 }}>Already have an account? Log in.</Text>
                    </TouchableOpacity>
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
    fieldsError: {
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
        borderColor: 'red',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    image: {
        height: 900,
        width: undefined,
    },
    page: {
        bottom: 600,
        left: 60
    }

});