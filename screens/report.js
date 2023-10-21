import * as React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props)
        this.validateInput = React.createRef()
    }

    state = {
        username: "",
        password: "",
        errMsg: ""
    }

    onLogin = () => {
        if (this.state.username == 'abe' && this.state.password == 'pretty') {
            this.props.navigation.navigate('Main')
        } else {
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Invalid login details. Try again!' })
        }
    }

    onLogin = () => {
        if (this.state.username == 'abe' && this.state.password == 'pretty') {
            this.props.navigation.navigate('Main')
        } else {
            this.validateInput.current.shake(800)
            this.setState({ errMsg: 'Invalid login details. Try again!' })
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Animatable.View
                    ref={this.validateInput}
                >
                    
                    <Icon name="envelope-o" size={20} color="#ccc" style={{ position: 'absolute', top: 45, left: 20 }} />
                    <TextInput
                        style={styles.fields}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ username: text })
                        }
                        }
                    />
                
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 135, left: 20 }} />
                    <TextInput
                        style={styles.fields}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                
                    <Icon name="question" size={20} color="#ccc" style={{ position: 'absolute', top: 225, left: 20 }} />
                    <TextInput
                        style={styles.fields}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', top: 318, left: 20 }} />
                    <TextInput
                        style={styles.fields}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    
                    <Icon name="birthday-cake" size={20} color="#ccc" style={{ position: 'absolute', top: 405, left: 20 }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="         dd/mm/yyyy"
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{this.state.errMsg}</Text>

                </Animatable.View>



                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}
                        style={{ width: 200, backgroundColor: '#FB9246', padding: 10, bottom: 12, alignItems: 'center', justifyContent: 'center', borderRadius: 15, borderWidth: 1, borderColor: '#000000' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontSize: 16 }}>Register</Text>


                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('login')}
                    >
                        <Text style={{ textAlign: 'center', color: '#FB9246', bottom: 5, fontSize: 16 }}>Already have an account? Log in.</Text>
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
    },
    fields: {
        height: 45,
        width: 300,
        borderColor: '#747474',
        borderWidth: 1,
        padding: 13,
        margin: 13,
    },

});