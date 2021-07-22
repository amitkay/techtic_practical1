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
            
    getEmail=async()=>
    {
        if(this.state.email.length >0 && this.state.password.length>0)
        {

        await fetch('https://reqres.in/api/login',
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
               console.log(responseJson);
               AsyncStorage.setItem("Token",responseJson.token);
                this.props.navigation.navigate("getUsers");
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

    reg_page=()=>{
        this.props.navigation.navigate("Register")
    }
render()
    {
        
        return(
            <View style={{flex:1}}>
                <Text style={{textAlign: 'center', // <-- the magic
   fontWeight: 'bold',
    fontSize: 24,
    marginBottom:20}}>Login</Text>
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
          <Button
  onPress={this.getEmail}
  title="Login"
  color="#7CB9E8"
  accessibilityLabel=""
/>
<TouchableOpacity onPress={this.reg_page}>
            <Text style={{textAlign:'center',marginTop:15}}>Not register yet? click here.</Text>
</TouchableOpacity>

          </View>
          
         
  );
    }
}