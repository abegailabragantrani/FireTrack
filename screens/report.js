import * as React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/SimpleLineIcons';


export default class ReportScreen extends React.Component {

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
                <Image style={styles.image}
                    source={require('./drawnav/1.png')} />

                <Animatable.View
                    ref={this.validateInput}
                >
                    <Icon name="user" size={20} color="#ccc" style={{ position: 'absolute', bottom: 560, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Complete Address"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ username: text })
                        }
                        }
                    />
                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 18, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Purok/Sitio"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ username: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 75, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Barangay"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ username: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 133, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Municipality"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 190, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Province"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />

                    <Icon name="location-pin" size={20} color="#ccc" style={{ position: 'absolute', top: 248, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Zipcode"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />

                    <Icon name="phone" size={20} color="#ccc" style={{ position: 'absolute', top: 303, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Clock"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    <Icon name="calendar" size={20} color="#ccc" style={{ position: 'absolute', top: 362, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Date"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    <Icon name="picture" size={20} color="#ccc" style={{ position: 'absolute', top: 420, left: 20, color: '#FB9246' }} />
                    <TextInput
                        style={styles.fields}
                        placeholder="Attach Image"
                        onChangeText={(text) => {
                            this.setState({ errMsg: '' }),
                                this.setState({ password: text })
                        }
                        }
                    />
                    <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>{this.state.errMsg}</Text>

                </Animatable.View>


                <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 75, bottom: 70 }}>
                    <TouchableOpacity
                        onPress={() => this.onLogin()}
                        style={{ width: 200, height: 50, backgroundColor: '#FB9246', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 1, borderWidth: 1, borderColor: '#000000' }}
                    >
                        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Report</Text>
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
        top: 40,
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