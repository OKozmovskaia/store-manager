import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import InstagramAuth from './components/screens/InstagramAuth';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={InstagramAuth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;