import 'react-native-gesture-handler';
import React, { useEffect, useContext } from 'react';
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

// libraries and Context
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as TokenProvider } from './src/context/TokenContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LocalizationProvider, LocalizationContext } from './src/components/Translations';

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
  const {translations, initializeAppLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    initializeAppLanguage();
  },[]);

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
      <MainStack.Screen name="Home" component={InstagramAuth} options={{ title: translations['home'] }}/>
      <MainStack.Screen name="GetTokenScreen" component={GetTokenScreen} options={{ title: translations['getTokenScreen'] }}/>
      <MainStack.Screen name="InstagramFeed" component={InstagramFeed} options={{ title: translations['instagramFeed'] }}/>
      <MainStack.Screen name="NewUser" component={NewUser} options={{ title: translations['newUser'] }}/>
      <MainStack.Screen name="ExistUser" component={ExistUser} options={{ title: translations['existUser'] }}/>
  </MainStack.Navigator>
  ); 
}

const App = () => {

  const linking = {
    prefixes: ['storemanager://'],
    config:{
      screens: {
        Main: {
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
            },
            NotFound: '*'
          }
        },
        MyModal: {
          screens: {
            LanguageScreen:{
              path: 'change-language'
            }
          }
        }

      }
    }  
  }

  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <SafeAreaProvider>
        <LocalizationProvider>
          <RootStack.Navigator mode="modal" headerMode="none">
            <RootStack.Screen name="Main" component={MainStackScreen} />
            <RootStack.Screen name="MyModal" component={LanguageScreen} />
          </RootStack.Navigator>
        </LocalizationProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

export default () => {
  return(
      <TokenProvider>
        <App />
      </TokenProvider>
  )
};