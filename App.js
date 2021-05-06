import 'react-native-gesture-handler';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// libraries and Context
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as TokenProvider } from './src/context/TokenContext';
import { Provider as LanguageProvider } from './src/context/LanguageContext';

// screens
import InstagramAuth from './src/screens/InstagramAuth';
import GetTokenScreen from './src/screens/GetTokenScreen';
import InstagramFeed from './src/screens/InstagramFeed';
import NewUser from './src/screens/NewUser';
import ExistUser from './src/screens/ExistUser';
import LanguageScreen from './src/screens/LanguageScreen';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen({navigation}) {
  return(
    <MainStack.Navigator
    screenOptions= {{
      headerRight: () => (
        <Icon
          name='language'
          size={50}
          onPress={() => navigation.navigate('MyModal')}
        />
      )
    }}
  >
      <MainStack.Screen name="Home" component={InstagramAuth} />
      <MainStack.Screen name="GetTokenScreen" component={GetTokenScreen} />
      <MainStack.Screen name="InstagramFeed" component={InstagramFeed} />
      <MainStack.Screen name="NewUser" component={NewUser} />
      <MainStack.Screen name="ExistUser" component={ExistUser} />
  </MainStack.Navigator>
  ); 
}

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
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="MyModal" component={LanguageScreen} />
      </RootStack.Navigator>
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