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

class RegisterScreen extends Component {

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
      	Register:</Text>
      	
    	<Text style={styles.instructions}>
    	Username</Text>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		username => this.setState({username})
    	}
    	/>
    	
    	<Text style={styles.instructions}>
    	Password</Text>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		password => this.setState({password})
    	}
    	secureTextEntry={true} />
    	
    	<Button 
    	onPress={this.SubmitPressed.bind(this)}
    	title="Submit"/>
    	
    	<Button 
    	onPress={this.clearUsers.bind(this)}
    	title="Clear"/>
      </View>
    );
  }
  
  async SubmitPressed() {
	  const {username, password} = this.state;
	  keys[0] = username.trim();
	  if (await AsyncStorage.getItem(keys[0])) {
	  	alert("Username already exists!");
	  } else {
	  	AsyncStorage.setItem(keys[0], password);
	  	this.props.navigation.navigate('Profile');
	  }
	}

	async clearUsers() {
		AsyncStorage.clear();
	}
	
}
export default RegisterScreen;

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
