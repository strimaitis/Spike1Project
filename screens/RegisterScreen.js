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
var RNFS = require('react-native-fs');
// /Users/matthewstrimaitis/Library/Developer/CoreSimulator/Devices/67160878-5EF6-4315-A455-C5EB1DD8FE8C/data/Containers/Data/Application/E0089483-FD4F-4FB9-B3D1-7D59E7F1FD60/Documents
var path;

class RegisterScreen extends Component {

constructor(props) {
   	super(props)
   	this.state = {
   		username: '',
   		password: '',
   		fname: '',
   		lname: ''
   	}
   }

  render() {
    return (
      <View style={styles.container}>
      	<Text style={styles.welcome}>
      	My Information:</Text>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		fname => this.setState({fname})
    	}
    	placeholder = "First Name"
    	/>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		lname => this.setState({lname})
    	}
    	placeholder = "Last Name"
    	/>
      	
      	<Text style={styles.altwelcome}>
      	Register:</Text>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		username => this.setState({username})
    	}
    	placeholder = "Username"
    	/>
    	

    	<TextInput style={styles.input} 
    	onChangeText = {
    		password => this.setState({password})
    	}
    	placeholder = "Password"
    	secureTextEntry={true} />
    	
    	<Button 
    	onPress={this.SubmitPressed.bind(this)}
    	title="Submit"/>
    	
    	
      </View>
    );
  }
  
  async SubmitPressed() {
	  const {username, password, fname, lname} = this.state;
	  keys[0] = username.trim();
	  if (await AsyncStorage.getItem(keys[0])) {
	  	alert("Username already exists!");
	  } else if (password.trim() == '' || keys[0] == '' || fname.trim() == '' || lname.trim() == '') {
	  	alert("Must fill out all fields");
	  } else {
	  	path = RNFS.DocumentDirectoryPath + '/' + keys[0] + '.json';
	  	var formattedString = '{ ' 
	  	+ '"fname": "' + fname
	  	+ '", "lname": "' + lname
	  	+ '", "c1": ' + '"N/A'  
	  	+ '", "c2": ' + '"N/A'  
	  	+ '", "c3": ' + '"N/A' 
	  	+ '", "c4": ' + '"N/A'  
	  	+ '", "c5": ' + '"N/A'   
	  	+ '" }';
	  	RNFS.writeFile(path, formattedString, 'utf8').then((success) => {
    		// alert(path);
  		})
  		.catch((err) => {
    		alert(err.message);
  		});
  
	  	AsyncStorage.setItem(keys[0], password);
	  	this.props.navigation.navigate('Default');
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
    margin: 8,
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
  	marginBottom: 3
  },
  altwelcome: {
  	fontSize: 20,
    textAlign: 'center',
    lineHeight: 55,
  	marginTop: 15
  }
});
