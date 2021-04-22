import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// screens
import InstagramAuth from './components/screens/InstagramAuth';
import GetTokenScreen from './components/screens/GetTokenScreen';
import InstagramFeed from './components/screens/InstagramFeed';
import NewUser from './components/screens/NewUser';
import ExistUser from './components/screens/ExistUser';

const Stack = createStackNavigator();

function App() {

  const linking = {
    prefixes: ['storemanager://'],
    config:{
      initialRouteName: 'Home',
      screens: {
        Home:{
          path: 'home'
        },
        GetTokenScreen: {
          path: 'feed'
        },
        InstagramFeed: {
          path: 'instagram'
        },
        NewUser: {
          path: 'new-user'
        },
        ExistUser: {
          path: 'exist-user'
        }
      }
    }  
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={InstagramAuth} />
        <Stack.Screen name="GetTokenScreen" component={GetTokenScreen} />
        <Stack.Screen name="InstagramFeed" component={InstagramFeed} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen name="ExistUser" component={ExistUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;