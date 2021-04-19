import React, { useState } from 'react';
import { View, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { authorize } from 'react-native-app-auth';
// import { WebView } from 'react-native-webview';
// import { LoginButton, AccessToken } from 'react-native-fbsdk-next';

import config from '../../config.json';

export default function InstagramAuth() {
  const [authCode, setAuthCode] = useState('');
  const [token, setToken] = useState(null);

  const enteredURL = `https://www.instagram.com/oauth/authorize?client_id=${config.ID_BUSINESS_ACCOUNT_INSTAGRAM}&redirect_uri=${config.REDIRECT_URL}&scope=user_profile,user_media&response_type=code`;

  const instagramEnteredLink = async() => {
    const enter = await Linking.openURL(enteredURL);
  }
  
  return (
    <View>
      <Icon.Button
        name="instagram"
        onPress={instagramEnteredLink}
      >
        <Text>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    </View>
  );
}
