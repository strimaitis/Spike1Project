import React, { Component } from "react";
import {Platform, StyleSheet, Text, View, TextInput, Button, Alert, AsyncStorage} from 'react-native';

var keys = [''];

class DefaultScreen extends Component {

    static navigationOptions = {
        header: null
    }
    
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
    					
            	<Button title="Submit"
                    onPress={this.SubmitPressed.bind(this)} />
                <Button title="Register an account!"
                    onPress={() => this.props.navigation.navigate('Register')} />
            </View>
        );
    }
    
      async SubmitPressed() {
  	  	const {username, password} = this.state;
	  	keys[0] = username.trim();
	  	await AsyncStorage.getItem(keys[0]).then((value) => {
	    	if (value.trim().localeCompare(password.trim()) == 0) {
	  			AsyncStorage.setItem('user', keys[0]);
	  			this.props.navigation.navigate('Profile');
	        } else {
	        	alert("Incorrect password");
	        }
	    })
	    .catch((error) => alert("Error: Invalid input")).done();
	  }
	  
}
export default DefaultScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
  		height: 30, 
  		width: 160,
  		borderColor: 'gray', 
  		borderWidth: 1,
  	},
  	instructions: {
    	textAlign: 'center',
    	color: '#333333',
    	marginBottom: 5,
  	},
});