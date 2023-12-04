import * as React from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default class ProfileScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 18, bottom: 170 }}>Profile</Text>
        <View style={styles.top} />

        <View style={{ alignItems: 'center', justifyContent: 'center', bottom: 42, }}>
          <Image style={styles.image}
            source={require('./drawnav/user.png')} />
          <Text style={{ textAlign: 'center', color: '#000000', fontSize: 18, bottom: 40 }}>Change Picture</Text>

          <Text style={{ textAlign: 'center', right: 107, color: '#000000', fontSize: 18, bottom: 40 }}>Username</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => {
              this.setState({ errMsg: '' }),
                this.setState({ username: text })
            }
            }
          />

          <Text style={{ textAlign: 'center', right: 120, color: '#000000', fontSize: 18, bottom: 40 }}>Adress</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => {
              this.setState({ errMsg: '' }),
                this.setState({ username: text })
            }
            }
          />

          <Text style={{ textAlign: 'center', right: 87, color: '#000000', fontSize: 18, bottom: 40 }}>Phone Number</Text>
          <TextInput
            style={styles.fields}
            onChangeText={(text) => {
              this.setState({ errMsg: '' }),
                this.setState({ username: text })
            }
            }
          />


          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={{ width: 200, height: 50, backgroundColor: '#171F1D', alignItems: 'center', justifyContent: 'center', borderRadius: 15, marginBottom: 15, borderWidth: 1, borderColor: '#000000' }}
          >
            <Text style={{ textAlign: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: 16 }}>Update</Text>
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
    backgroundColor: '#FB9246'
  },
  top: {
    position: 'absolute',
    top: 200,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },

  image: {
    height: 240,
    width: 180,
    bottom: 55
  },
  fields: {
    height: 45,
    width: 300,
    margin: 6,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: '#d3d3d3d3',
    bottom: 55,
  },
}
);