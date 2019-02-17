import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
var keys = [''];

class ProfileScreen extends Component {

constructor(props) {
   	super(props)
   	this.state = {
   		username: '',
   		password: '',
   	}
   }

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.welcome}>
      	Welcome username! </Text>
      </View>
    );
  }
	
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    lineHeight: 55
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
  	height: 30, 
  	width: 160,
  	borderColor: 'gray', 
  	borderWidth: 1,
  },
});
