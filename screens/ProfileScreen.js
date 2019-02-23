import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage} from 'react-native';
// import DefaultScreen from './DefaultScreen'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
var user = {username: "", fname: "", lname: ""};

var RNFS = require('react-native-fs');
var path;
var json_array;

class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: ''
    };
  }

  render() {	
  		return (
  		<View style={styles.container}>
  		<Text style={styles.instructions}>
    	</Text>
    	
    	<Button title="View my Courses"
       		onPress={this.getUser.bind(this)}
       	/>
       	
       	
       	
    	<TextInput style={styles.firstinput} 
    	 onChangeText = {
    		 c1 => this.setState({c1})
    	 }
    	placeholder = "Course 1"
    	/>
    	
    	<TextInput style={styles.input} 
    	onChangeText = {
    		c2 => this.setState({c2})
    	 }
    	placeholder = "Course 2"
    	/>
    	
    	<TextInput style={styles.input} 
    	 onChangeText = {
    	 	c3 => this.setState({c3})
    	 }
    	placeholder = "Course 3"
    	/>
    	
    	<TextInput style={styles.input} 
    	 onChangeText = {
    		c4 => this.setState({c4})
    	 }
    	placeholder = "Course 4"
    	/>
    	
    	<TextInput style={styles.input} 
    	 onChangeText = {
    	 	c5 => this.setState({c5})
    	 }
    	placeholder = "Course 5"
    	/>

    	
		<Button title="Add Courses"
       		 onPress={this.addCourses.bind(this)}
       	/>
       	
       	
    	<TextInput style={styles.firstinput} 
    	 onChangeText = {
    		 password => this.setState({password})
    	 }
    	placeholder = "Password"
    	secureTextEntry={true}
    	/>
    	
    	<TextInput style={styles.input} 
    	 onChangeText = {
    		 password2 => this.setState({password2})
    	 }
    	placeholder = "Repeat Password"
    	secureTextEntry={true}
    	/>
    	
       	<Button title="Change My Password"
       		 onPress={this.changePassword.bind(this)}
       	/>
       	</View>
       	
  		);
  }
  
  async setUser(username) {
  	RNFS.readFile(path, "utf8").then((value) => {
  			json_array = JSON.parse(value);
  			alert(json_array.fname + "'s Classes: \n" + 
  			"\n Course 1: " + json_array.c1 +
  			"\n Course 2: " + json_array.c2 +
  			"\n Course 3: " + json_array.c3 +
  			"\n Course 4: " + json_array.c4 +
  			"\n Course 5: " + json_array.c5
  			);
  		})
  		.catch((error) => {
  			alert("error");
  		});
  }
  
  async getUser() {
  	await AsyncStorage.getItem('user').then((value) => {
  	  		user.username = value;
  	  		path = RNFS.DocumentDirectoryPath + '/' + value + '.json';
  			this.setUser(value);
	    }).done();
	
  }
  
  async changePassword() {
  	await AsyncStorage.getItem('user').then((value) => {
  	  		user.username = value;
	}).done();
    const {password, password2, c1, c2, c3, c4, c5} = this.state;
    if (password == '' || password2 == '') {
    	alert("Must fill out all fields");
    } else if (password == password2) {
  		AsyncStorage.setItem(user.username, password);
  		this.props.navigation.navigate('Default');
  	} else {
  		alert("Passwords must match");
  	}
  }
  
  async addCourseHelper(username) {
  	const {password, password2, c1, c2, c3, c4, c5} = this.state;
  	var courses = ['N/A', 'N/A', 'N/A', 'N/A', 'N/A'];
  	RNFS.readFile(path, "utf8").then((value) => {
  		json_array = JSON.parse(value);
  		
  		})
  		.catch((error) => {
  			alert("error");
  		});
  	    if (json_array.c1 != 'N/A') {
  			courses[0] = json_array.c1;
  		}
  		if (json_array.c2 != 'N/A') {
  			courses[1] = json_array.c2;
  		}
  		if (json_array.c3 != 'N/A') {
  			courses[2] = json_array.c3;
  	  	}
  	  	if (json_array.c4 != 'N/A') {
			courses[3] = json_array.c4;
  	  	}
  	  	if (json_array.c5 != 'N/A') {
			courses[4] = json_array.c5;
  	  	}
  	  if (c1 != '') {
  		courses[0] = c1;
  	  }
  	  if (c2 != '') {
  		courses[1] = c2;
  	  }
  	  if (c3 != '') {
  		courses[2] = c3;
  	  }
  	  if (c4 != '') {
  		courses[3] = c4;
  	  }
  	  if (c5 != '') {
  		courses[4] = c5;
  	  }
  		
  	  var formattedString = '{ ' 
	  	+ '"fname": "' + json_array.fname
	  	+ '", "lname": "' + json_array.lname
	  	+ '", "c1": ' + '"' + courses[0]
	  	+ '", "c2": ' + '"' + courses[1]
	  	+ '", "c3": ' + '"' + courses[2]
	  	+ '", "c4": ' + '"' + courses[3]
	  	+ '", "c5": ' + '"' + courses[4]
	  	+ '" }';
	  	
  		RNFS.writeFile(path, formattedString, 'utf8').then((success) => {
  		}).catch((err) => {
    		alert(err.message);
  		});
  }
  
  async addCourses() {
  	await AsyncStorage.getItem('user').then((value) => {
  	  		user.username = value;
  	  		path = RNFS.DocumentDirectoryPath + '/' + value + '.json';
  			this.addCourseHelper(value);
	    }).done();
  }	
}
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0,
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
  	marginBottom: 3
  },
  firstinput: {
  	height: 30, 
  	width: 160,
  	borderColor: 'gray', 
  	borderWidth: 1,
  	marginTop: 37,
  	marginBottom: 3
  }
});
