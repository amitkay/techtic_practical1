import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/register';
import getUsers from './screens/user_list';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="getUsers" component={getUsers} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
