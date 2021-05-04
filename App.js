import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as TokenProvider } from './src/context/TokenContext';
import { Provider as LanguageProvider } from './src/context/TokenContext';

// screens
import InstagramAuth from './src/screens/InstagramAuth';
import GetTokenScreen from './src/screens/GetTokenScreen';
import InstagramFeed from './src/screens/InstagramFeed';
import NewUser from './src/screens/NewUser';
import ExistUser from './src/screens/ExistUser';

const Stack = createStackNavigator();

const App = () => {

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

export default () => {
  return(
    <LanguageProvider>
      <TokenProvider>
        <App />
      </TokenProvider>
    </LanguageProvider>
    
  )
};