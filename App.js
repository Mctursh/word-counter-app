/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useEffect, useState } from 'react';
// import {Node} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Main from './components/Main';
import Slider from './components/Slider';
 



const Stack = createNativeStackNavigator()


const App = () => {

  // const [ showApp, setShowApp ] = useState(false)
  // useEffect(() => {

  // },[showApp])

  

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen options={{ headerShown: false }} name="Welcome" component={Slider} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // if (showApp) {    
  //   } else {
  //     return ;
  //   }
};



export default App;
