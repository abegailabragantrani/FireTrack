import * as React from 'react'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import apiService from '../api/config';
import axios from 'axios';
import * as Location from 'expo-location';
import DropDownPicker from 'react-native-dropdown-picker';
import DropDown from '../componets/DropDown';




export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
        this.timeoutId = null;
       
        this.state = {

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
            loadingAddress: false,
            location: null,
            open: false,
            value: null,
            items: [{label:'Select Gender',value:0,}, {label:'Male', value:'male'}, {label:'Female', value:'female'}]

        }

        this.setValue = this.setValue.bind(this);

    }
   

  

    async componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            return;
        }
        let { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
            if (locationStatus !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const {latitude, longitude} = location.coords;  

        let addressResponse = await Location.reverseGeocodeAsync({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
        });
        const address = addressResponse[0];

        // console.log('addressResponse', addressResponse[0]);
        // console.log('lat', latitude, 'long', longitude);
        this.setState({ lat: latitude, long: longitude, address: `${address?.street}, ${address?.city}, ${address?.region}, ${address?.country}` });
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
            if(
                !this.state.firstname || 
                !this.state.address || 
                !this.state.phone_no || 
                !this.state.email || 
                !this.state.password || 
                !this.state.password_confirmation ||
                !this.state.gender ||
                this.state.gender == 0
            ){
                console.log(this.state.firstname, this.state.address, this.state.phone_no, this.state.email, this.state.password, this.state.password_confirmation, this.state.gender);
                this.setState({ loading: false, error: ['All fields are required'] })
                return
            }
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
          console.log(error.response);
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

    setOpen(open) {
        this.setState({
        open
        });
    }

    setValue(callback) {
        this.setState(state => ({
        gender: callback(state.value)
        }));
    }

    setItems(callback) {
        this.setState(state => ({
        items: callback(state.items)
        }));
    }

    render() {
        // console.log(this.state.error.length, this.state.errorAddress, this.state.lat, this.state.long);
            const { open, value, items, gender } = this.state;
        return (
            <View style={styles.container}>
                <Image style={styles.image}
                    source={require('./drawnav/1.png')} />

                <Animatable.View
                    ref={this.validateInput}
                >
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
                 
                    <View style={{...styles.fields, zIndex:100}}>
                       <DropDown
                            open={open}
                            value={gender}
                            setOpen={this.setOpen.bind(this)}
                            setValue={this.setValue.bind(this)}
                            setItems={this.setItems.bind(this)}
                            items={items}
                            style={styles.select}
                            autoScroll={true}
                       />
                    </View>
                    

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 135, left: 20, color: '#FB9246', zIndex:1 }} />
                    <TextInput
                        style={this.state.errorAddress? styles.fieldsError : styles.fields}
                        placeholder="address"
                        onChangeText={this.handleAddressChange}
                        value={this.state.address}
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
                        placeholder="phone"
                        onChangeText={(text) => {
                            this.setState({ phone_no: text })
                        }
                        }
                    />

                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 245, left: 20, color: '#FB9246', zIndex:10 }} />
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
        right: 10,
        left: 3,
        height: 250,
        width: 370,
        top: 40,
    },
    select: {
        width: 300,
        // minHeight: 40,
        // borderRadius: 5,
        // backgroundColor: 'rgba(255,255,255)',
        // marginBottom: 10,
        // zIndex:1000,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        alignSelf:'center',
    }

});