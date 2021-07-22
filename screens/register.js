import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  AsyncStorage,
  View,
} from 'react-native';
import { Input, ThemeConsumer } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            email:'',
            password:'',
            ConfirmPassword:"",
            passErr:"",
            err:""
        }
    }
    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
          this.setState({err:"Email is not in correct format"})
          return false;
        }
        else {
          this.setState({ email: text })
          this.setState({err:""});
        }
      }
   confirmPass=(confirmPassword)=>
    {
        if(this.state.password === confirmPassword && this.state.password.length > 0)
        {
                this.setState({confirmPassword:confirmPassword});
                this.setState({passErr:""});
        }
        else
        {
            this.setState({passErr:"Password not same"});
        }
    }

    registerUser=async()=>
    {
        if(this.state.err.length == 0 && this.state.password.length>0&&this.state.passErr.length == 0)
        {
            console.log(this.state.email+" "+this.state.password)
        await fetch('https://reqres.in/api/register',
        {
            method: 'POST',
            headers: 
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                
        email:this.state.email,
        password:this.state.password
            })

        }).then((response) => response.json()).then((responseJson) =>
        {
            if(responseJson.error)
            {
                alert(responseJson.error);
            }
           else
           {
          AsyncStorage.setItem("Token",responseJson.token);
          AsyncStorage.setItem("Id",responseJson.id);
          this.props.navigation.navigate("getUsers")
            
           }
        }).catch((error) =>
        {
            alert("An error occured please try again.")
        });

    }
else
{
    alert("Enter the email and password");
}
    }

    login_page=()=>{
        this.props.navigation.navigate("Login")
    }
render()
    {
        
        return(
            <View style={{flex:1}}>
                <Text style={{textAlign: 'center', // <-- the magic
   fontWeight: 'bold',
    fontSize: 24,
    marginBottom:20}}>Register</Text>
            <Input
            placeholder="Email"
            onChangeText={value => this.validate(value)}
            errorMessage={this.state.err}
           />
          
           <Input
           placeholder="Password"
           secureTextEntry={true}
           onChangeText={value => this.setState({ password: value })}
          />
           <Input
           placeholder="Confirm Password"
           secureTextEntry={true}
           onChangeText={value => this.confirmPass(value)}
           errorMessage={this.state.passErr}
          />
          <Button
  onPress={this.registerUser}
  title="Register"
  color="#7CB9E8"
  accessibilityLabel=""
/>
<TouchableOpacity onPress={this.login_page}>
            <Text style={{textAlign:'center',marginTop:15}}>Already a user?Click here to Login.</Text>
</TouchableOpacity>

          </View>
          
         
  );
    }
}