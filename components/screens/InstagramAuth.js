import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from '../../config.json';

const getCodeForAccessToken = async() => {
  const [authCode, setAuthCode] = useState('');
  const [token, setToken] = useState('')

  const fetchConfigs = {
    getAuthCode: {
      issuer: 'https://api.instagram.com/oauth/authorize',
      clientId: config.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      redirectUrl: config.REDIRECT_URL,
      scopes: 'user_profile,user_media',
      responseTypes: 'code'
    },
  
    getShortLivedToken: {
      issuer: 'https://api.instagram.com/oauth/access_token',
      additionalParameters: {
        code: `${authCode}`
      },
      client_id: config.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      client_secret: config.APP_SECRET,
      redirect_uri: config.REDIRECT_URL,
      grantTypes: 'authorization_code'
    },
    
    getLongLivedToken: {
      issuer: 'https://graph.instagram.com/access_token',
      client_secret: config.APP_SECRET,
      grantTypes: 'ig_exchange_token',
      additionalParameters: {
        access_token: `${token}`
      }
    }
  }
  await fetch(
    'https://api.instagram.com/oauth/authorize',
    {
      method: 'GET',
      client_id: config.ID_BUSINESS_ACCOUNT_INSTAGRAM,
      redirect_uri: config.REDIRECT_URL,
      scope: 'user_profile,user_media',
      response_type: 'code'
    })
    .then(res => res.text())
    .then(json => console.log(json))
    .catch(er => console.log(er))
}

export default function InstagramAuth() {
  return (
    <View>
      <Icon.Button
        name="instagram"
        onPress={getCodeForAccessToken}
      >
        <Text>
          Get my feed from Instagram
        </Text>
      </Icon.Button>
    </View>
  );
}
